import express from "express";
import serverless from "@vendia/serverless-express";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello");
});
export const handler = serverless({ app });
