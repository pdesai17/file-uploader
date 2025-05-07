const fs = require("fs");
const FormData = require("form-data");
const path = require("path");
const axios = require("axios");
const { LLAMA_CLOUD_API_KEY } = require("../environments/env.config");

const {
  pollParsingStatus,
  getParsedData,
} = require("../services/llamaService");

exports.handleFileUpload = async (req, res) => {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(req.file.path));

  //   Example for Llama API integration
  const response = await axios.post(
    "https://api.cloud.llamaindex.ai/api/parsing/upload",
    formData,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${LLAMA_CLOUD_API_KEY}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  const documentId = response.data?.id;
  const finalStatus = await pollParsingStatus(documentId);
  let parsedData;
  if (finalStatus.status == "SUCCESS") {
    parsedData = await getParsedData(documentId);
  }

  setTimeout(() => {
    res.json({
      filePath: req.file.originalname,
      status: finalStatus.status,
      parsedData: parsedData,
    });
  }, 3000);
};
