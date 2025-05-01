import { Request, Response } from "express";

export const newUser = (req: Request, res: Response) => {
  res.json({ message: "new user" });
};
