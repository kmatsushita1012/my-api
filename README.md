# My API

This project is a sample API built using AWS services (API Gateway, Lambda, DynamoDB, CodePipeline) and technologies like TypeScript, Node.js, and Express. The API demonstrates basic database operations with DynamoDB.

## Features

- **API Gateway**: Handles HTTP requests and routes them to Lambda functions.
- **AWS Lambda**: Executes serverless functions for API logic.
- **DynamoDB**: NoSQL database for storing and retrieving data.
- **CodePipeline**: Automates the CI/CD process.
- **TypeScript**: Ensures type safety in the codebase.
- **Express**: Simplifies API routing and middleware handling.

## Prerequisites

- AWS account
- Node.js installed
- AWS CLI configured
- Serverless Framework (optional, for deployment)



## API Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/items`     | Fetch all items   |
| GET    | `/items/:id` | Fetch item by ID  |
| POST   | `/items`     | Create a new item |
| PUT    | `/items/:id` | Update an item    |
| DELETE | `/items/:id` | Delete an item    |

## DynamoDB Table Schema

- **Table Name**: `Items`
- **Primary Key**: `id` (String)

## CI/CD with CodePipeline

1. Push changes to the repository.
2. CodePipeline automatically builds and deploys the API.

## License

This project is licensed under the MIT License.

## Acknowledgments

- AWS documentation
- Express.js documentation
- TypeScript community
- Serverless Framework
- Node.js ecosystem
- DynamoDB best practices

## memo

### add

npm i @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
