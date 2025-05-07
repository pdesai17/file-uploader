const axios = require("axios");
const { LLAMA_CLOUD_API_KEY } = require("../environments/env.config");

async function pollParsingStatus(
  documentId,
  maxAttempts = 10,
  interval = 5000
) {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const statusResponse = await axios.get(
        `https://api.cloud.llamaindex.ai/api/parsing/job/${documentId}`,
        { headers: { Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}` } }
      );

      const status = statusResponse.data.status;

      if (status === "SUCCESS") {
        return statusResponse.data;
      } else if (status === "FAILED") {
        throw new Error("Parsing failed.");
      }

      await new Promise((resolve) => setTimeout(resolve, interval));
      attempts++;
    } catch (error) {
      throw new Error("Error polling parsing status: " + error.message);
    }
  }
}

async function getParsedData(documentId) {
  const response = await axios.get(
    `https://api.cloud.llamaindex.ai/api/parsing/job/${documentId}/result/markdown`,
    { headers: { Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}` } }
  );
  return response.data;
}

module.exports = { pollParsingStatus, getParsedData };
