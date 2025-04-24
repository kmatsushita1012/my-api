import { APIError } from "../utils/Errors";

const successResponse = (body: any, status: number = 200): ApiResponse => {
  return {
    statusCode: status,
    body: body,
  };
};

const errorResponse = (error: any): ApiResponse => {
  if (error instanceof APIError) {
    return {
      statusCode: error.statusCode,
      body: { error: error.message },
    };
  } else {
    return {
      statusCode: 500,
      body: { error: String(error) },
    };
  }
};

interface ApiResponse {
  statusCode: number;
  body: any;
}

export { ApiResponse, successResponse, errorResponse };
