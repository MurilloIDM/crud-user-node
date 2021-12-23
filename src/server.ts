import "reflect-metadata";
import express from "express";
import "express-async-errors";

import "@shared/container";
import router from "@infra/http/routes";
import { httpExceptionFunction } from "@infra/error/HttpExceptionFunction";

const app = express();

app.use(express.json());
app.use(router);

app.use(httpExceptionFunction);

app.listen(3000, () => console.log("Server is running!"));
