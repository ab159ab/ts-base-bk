import { Request, Response } from "express";

export const testCtr = (req: Request, res: Response) => {
  res.json("test");
};

export const test2Ctr = (req: Request, res: Response) => {
  res.json("test2");
};
