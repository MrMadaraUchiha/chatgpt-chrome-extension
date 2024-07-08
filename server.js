import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Configuration, OpenAIApi } from 'openai';
import dotenv from "dotenv-safe";
dotenv.config();

// OpenAI API init
const configuration = new Configuration({
  organization: process.env.OPEN_AI_ORG,
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express().use(cors()).use(bodyParser.json());
const model = "gpt-3.5-turbo";
const port = 3000;

app.post("/", async (req, res) => {
  const response = await openai.createChatCompletion({
    model: model,
    messages: [
      {role: "user", content: req.body.prompt}
    ],
    max_tokens: 1000,
  });

  const reply = response.data.choices[0].message.content;

  console.log(reply);

  res.json({"reply": reply.trimStart()});
});

app.listen(port, () => {
  console.log(`ChromeGPT API listening on port ${port}`)
})
