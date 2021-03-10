import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { errors } from "celebrate";

import AppError from "./errors/AppError";
import Routers from "./routes";

import "./typeorm";
import "./container";

const app = express();
app.use(cors());
app.use(express.json());
app.use(Routers);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).send({
        status: "error",
        message: error.message,
      });
    }

    console.log(error.message); /* eslint-disable-line */

    return response.status(500).send({
      status: "error",
      message: "Internal server error",
    });
  }
);

const port = 3333 || process.env.PORT;

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
