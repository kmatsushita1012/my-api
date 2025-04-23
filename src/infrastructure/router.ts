// infrastructure/router.ts
import express from "express";
import type Controller from "../interfaces/controllers";

const createRouter = (controllers: Controller) => {
  const router = express.Router();

  router.get("/users/:id", async (req, res) => {
    const result = await controllers.user.get(req);
    res.status(result.statusCode).json(result.body);
  });

  router.get("/users", async (req, res) => {
    const result = await controllers.user.getAll(req);
    res.status(result.statusCode).json(result.body);
  });

  router.post("/users", async (req, res) => {
    const result = await controllers.user.post(req);
    res.status(result.statusCode).json(result.body);
  });

  router.put("/users/:id", async (req, res) => {
    const result = await controllers.user.put(req);
    res.status(result.statusCode).json(result.body);
  });

  router.delete("/users/:id", async (req, res) => {
    const result = await controllers.user.delete(req); // 修正: put → delete
    res.status(result.statusCode).json(result.body);
  });

  return router;
};

export default createRouter;
