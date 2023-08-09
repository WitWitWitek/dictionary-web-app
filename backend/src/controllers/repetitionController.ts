import { RequestHandler } from "express";
import { Repetition } from "../entity/Repetition";
import { CustomError } from "../utils/customError";

export const getAllRepetitions: RequestHandler = async (req, res) => {
  try {
    const repetitions = await Repetition.find({
      order: {
        createdAt: "DESC",
      },
    });

    return res.status(201).json(repetitions);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addNewRepetition: RequestHandler = async (req, res) => {
  const { content } = req.body;
  if (!content || typeof content !== "string") {
    throw new CustomError("Content field is required!", 400);
  }
  try {
    const newRepetition = new Repetition();
    newRepetition.content = content;
    await newRepetition.save();
    return res.status(201).json({ message: `Repetition with id: ${newRepetition.id} created.` });
  } catch (err) {
    throw new Error(err.message);
  }
};
