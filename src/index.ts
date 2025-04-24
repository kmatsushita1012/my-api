import express from "express";
import serverless from "@vendia/serverless-express";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBUserRepository } from "./infrastructure/repositories/DynamoDB";
import { IUserRepository } from "./domain/interfaces/repositories";
import { createUsecases } from "./application/usecase/user";
import { UserController } from "./interfaces/controllers";
import createRouter from "./interfaces/router";
//依存関係の注入(DI)
const userTableName = "my-api-users";
const dynamoDBClient = new DynamoDBClient({ region: "ap-northeast-1" });
const client = DynamoDBDocumentClient.from(dynamoDBClient);
const userRepository: IUserRepository = new DynamoDBUserRepository(
  client,
  userTableName
);
const usecases = createUsecases(userRepository);
const controllers = new UserController(usecases);
const router = createRouter(controllers);
// 初期化
const app = express();
app.use(express.json());
app.use(router);
app.get("/", (req, res) => {
  res.send("Hello");
});
export const handler = serverless({ app });
