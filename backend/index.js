const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const { OpenAI } = require("openai");
// const { Client } = require("@gradio/client");
const { Blob } = require("buffer"); // Needed in Node.js
// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import path from "path";
// import axios from "axios";
// import fs from "fs";
// import FormData from "form-data";
// import { LLAMA_CLOUD_API_KEY } from "./environments/env.config.js";

// const { VectorStoreIndex } = require("llamaindex");
// import { VectorStoreIndex } from "llamaindex";

const config = require("./environments/env.config"); // Load the configuration

require("dotenv").config();

const PORT = 8000;
const apiKey = config.LLAMA_CLOUD_API_KEY;
const openAiKey = config.OPENAI_API_KEY;

// const openai = new OpenAI({
//   apiKey: openAiKey,
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/getUploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/hello", (req, res) => {
  console.log("api hello called");
  return res.json({ name: "pd hello" });
});

app.post(
  "/upload",
  upload.single("uploadedPdf"),
  async function (req, res, next) {
    // Prepare FormData to send the file to the LlamaIndex API
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    // Call LlamaIndex API
    // const response = await axios.post(
    //   "https://api.cloud.llamaindex.ai/api/parsing/upload",
    //   formData,
    //   {
    //     headers: {
    //       accept: "application/json",
    //       Authorization: `Bearer ${apiKey}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );

    // console.log("documents...", response.data);

    // const documentId = response.data?.id;

    // // Poll the parsing status
    // const finalStatus = await pollParsingStatus(documentId);
    // let parsedData;
    // if (finalStatus.status == "SUCCESS") {
    //   //call api to fetch structured result
    //   parsedData = await getParsedData(documentId);
    // }
    setTimeout(() => {
      return res.json({
        filePath: req.file.originalname,
        // status: finalStatus.status,
        // parsedData: parsedData,
      });
    }, 3000);
  }
);

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
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const status = statusResponse.data.status;
      console.log(`Attempt ${attempts + 1}: Status = ${status}`);

      if (status === "SUCCESS") {
        console.log("poll resp", statusResponse.data);
        return statusResponse.data;
      } else if (status === "FAILED") {
        throw new Error("Parsing failed.");
      }

      // Wait before next attempt
      await new Promise((resolve) => setTimeout(resolve, interval));
      attempts++;
    } catch (error) {
      throw new Error("Error polling parsing status: " + error.message);
    }
  }
}

async function getParsedData(documentId) {
  const parsedDataResponse = await axios.get(
    `https://api.cloud.llamaindex.ai/api/parsing/job/${documentId}/result/markdown`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  console.log("parsed data", parsedDataResponse.data);
  return parsedDataResponse.data;
}

app.post("/ask", (req, res) => {
  const query = req.body.query;
  let answer;
  if (query == "What tools is the candidate familiar with?") {
    answer = `
          The candidate is familiar with a variety of tools. For web development, they use React, Angular, Node.js, and Nest.js. They have experience with RESTful APIs, database optimization, and deploying web applications. They are also proficient with cloud platforms such as AWS and Azure.
    In terms of DevOps, they have a strong background in SDLC, version control using GitHub, and Azure DevOps. They also have hands-on experience with Docker, Kubernetes, and performance monitoring tools like Datadog.
    `;
  }

  if (query == "Is Candidate having 2 years of experience?") {
    answer =
      "Yes! Candidate is having 2+ years of experience as Angular and React native developer.";
  }
  console.log("querrr", query);
  console.log("ansss", answer);

  setTimeout(() => {
    return res.json({
      answer: answer,
    });
  }, 3000);
});

app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));
