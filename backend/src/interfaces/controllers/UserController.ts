import { UserUsecases } from "../../application/usecase/user";
import { User } from "../../domain/entities/users";
import { APIGatewayRequest, parseBody, parseParams } from "../request";

import { ApiResponse, errorResponse, successResponse } from "../responses";

class UserController {
  constructor(private usecases: UserUsecases) {}

  get = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { id } = parseParams(req, (params) => ({
        id: params.id as string,
      }));
      const result = await this.usecases.get.execute(id);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      return errorResponse(error);
    }
  };

  getAll = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const result = await this.usecases.getAll.execute();
      return successResponse(result);
    } catch (error) {
      console.log(error);
      return errorResponse(error);
    }
  };

  post = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const item = parseBody<User>(req);
      const result = await this.usecases.post.execute(item);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      throw errorResponse(error);
    }
  };

  put = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { id } = parseParams(req, (params) => ({
        id: params.id as string,
      }));
      const item = parseBody<User>(req);
      const result = await this.usecases.put.execute(id, item);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      throw errorResponse(error);
    }
  };

  delete = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { id } = parseParams(req, (params) => ({
        id: params.id as string,
      }));
      const result = await this.usecases.delete.execute(id);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      throw errorResponse(error);
    }
  };
}

export default UserController;
