import {Request, Response, NextFunction} from 'express';
import {Author} from '../../types/LocalTypes';
import {
  getAllAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../models/authorModel';
import CustomError from '../../classes/CustomError';

const authorsGet = (req: Request, res: Response<Author[]>) => {
  const authors = getAllAuthors();
  res.json(authors);
};

const authorGet = (req: Request<{id: string}>, res: Response<Author>) => {
  try {
    const author = getAuthor(Number(req.params.id));
    res.json(author);
  } catch (error) {
    throw new CustomError((error as Error).message, 404);
  }
};

const authorPost = (
  req: Request<unknown, unknown, Omit<Author, 'id'>>,
  res: Response<Author>,
  next: NextFunction,
) => {
  try {
    const author = createAuthor(req.body);
    res.status(201).json(author);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const authorPut = (
  req: Request<{id: string}, unknown, Author>,
  res: Response<Author>,
  next: NextFunction,
) => {
  try {
    const author = updateAuthor(
      Number(req.params.id),
      req.body.name,
      req.body.email,
    );
    res.json(author);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const authorDelete = (
  req: Request<{id: string}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    deleteAuthor(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {authorsGet, authorGet, authorPost, authorPut, authorDelete};
