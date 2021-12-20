import "reflect-metadata";
import express from "express";

import "./shared/container";

const app = express();

app.use(express.json());

app.listen(3000, () => console.log("Server is running!"));
