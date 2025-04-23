import UserUsecase from "../../application/usecase";
import IRepository from "../../domain/interfaces/repositories";
import { User } from "../../domain/models/users";
import {
  APIGatewayRequest,
  parseBody,
  parseParams,
  parseQuery,
  parseUserSub,
} from "../request";

import { ApiResponse, errorResponse, successResponse } from "../responses";

export default class DistrictController {
  constructor(private repository: IRepository) {}

  get = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { id } = parseParams(req, (params) => ({
        id: params.id!,
      }));
      const usecase = new UserUsecase.get(this.repository.user);
      const result = await usecase.execute(id);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      return errorResponse(error);
    }
  };

  getAll = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const usecase = new UserUsecase.getAll(this.repository.user);
      const result = await usecase.execute();
      return successResponse(result);
    } catch (error) {
      console.log(error);
      return errorResponse(error);
    }
  };

  post = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const data = parseBody<User>(req);
      const usecase = new UserUsecase.post(this.repository.user);
      const result = await usecase.execute(data);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      throw errorResponse(error);
    }
  };

  put = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { id } = parseParams(req, (params) => ({
        id: params.id!,
      }));
      const item = parseBody<User>(req);
      const usecase = new UserUsecase.put(this.repository.user);
      const result = await usecase.execute(id, item);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      throw errorResponse(error);
    }
  };

  delete = async (req: APIGatewayRequest): Promise<ApiResponse> => {
    try {
      const { id } = parseParams(req, (params) => ({
        id: params.id!,
      }));
      const usecase = new UserUsecase.delete(this.repository.user);
      const result = await usecase.execute(id);
      return successResponse(result);
    } catch (error) {
      console.log(error);
      throw errorResponse(error);
    }
  };
}
