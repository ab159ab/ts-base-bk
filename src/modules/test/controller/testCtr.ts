import { Request, Response } from "express";
import queries from "../../../base/database/dbqueries/queries";

export const testCtr = (req: Request, res: Response) => {
res.json(queries.getAll());
};

export const test2Ctr = (req: Request, res: Response) => {
  res.json("test2");
};
