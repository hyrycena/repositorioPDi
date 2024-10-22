import express from "express";
import { Model } from "objection";
import Knex from "knex";
import knexfile from "./db/knexfile";
import Tarefas from "./src/domains/tarefas/routes";
import cors from 'cors';




const app = express();
app.use(express.json());
app.use(cors()); 
app.use("/tarefas", Tarefas);

Model.knex(Knex(knexfile));
export default app;
