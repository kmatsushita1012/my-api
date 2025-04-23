import express from "express";
import serverless from "@vendia/serverless-express";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import DynamoDBRepository from "./infrastructure/repositories/DynamoDB";
import IRepository from "./domain/interfaces/repositories";
import Controller from "./interfaces/controllers";
import createRouter from "./infrastructure/router";

const userTableName = "my-api-users";
//DI
const dynamoDBClient = new DynamoDBClient({ region: "ap-northeast-1" });
const client = DynamoDBDocumentClient.from(dynamoDBClient);
const repository: IRepository = new DynamoDBRepository(client, userTableName);
export const controllers = new Controller(repository);

const app = express();
app.use(express.json());
app.use(createRouter(controllers));
app.get("/", (req, res) => {
  res.send("Hello");
});
export const handler = serverless({ app });
