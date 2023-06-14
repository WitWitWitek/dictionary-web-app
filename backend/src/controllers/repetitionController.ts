import { RequestHandler } from "express";
import { AppDataSource } from "../data-source";
import { Repetition } from "../entity/Repetition";

export const addNewRepetition: RequestHandler = async (req, res, next) => {
  const { content } = req.body;
  if (!content || typeof content !== "string") {
    return res.status(400).json({ message: "Content field is required!" });
  }
  try {
    const newRepetition = new Repetition();
    newRepetition.content = content;
    await AppDataSource.manager.save(newRepetition);
    return res
      .status(201)
      .json({ message: `Repetition with id: ${newRepetition.id} created.` });
  } catch (err) {
    console.log(err);
  }
};
