import express from "express";
import { UserController } from "./controllers";
import { ApiResponse } from "./responses";
import { APIGatewayRequest } from "./request";

const createRouter = (controller: UserController) => {
  const router = express.Router();

  const asyncHandler = (
    action: (req: APIGatewayRequest) => Promise<ApiResponse>
  ) => {
    return async (req: express.Request, res: express.Response) => {
      const result = await action(req);
      res.status(result.statusCode).json(result.body);
    };
  };

  router.get("/users/:id", asyncHandler(controller.get));
  router.get("/users", asyncHandler(controller.getAll));
  router.post("/users", asyncHandler(controller.post));
  router.put("/users/:id", asyncHandler(controller.put));
  router.delete("/users/:id", asyncHandler(controller.delete));

  return router;
};

export default createRouter;
