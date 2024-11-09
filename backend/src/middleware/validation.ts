import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {

        return res.status(400).json({ errors: validationErrors.array() })
    }

    next()

};

// Array of validators middlewares
export const validateUserRequest = [
  // Check the body of the request and validate the 'name' field if it is a string and not empty
  body('name').isString().notEmpty().withMessage('Name must be a string 🤨'),
  body('addressLine')
    .isString()
    .notEmpty()
    .withMessage('AdderssLine must be a string 🤨'),
  body('city').isString().notEmpty().withMessage('City must be a string 🤨'),
  body('country')
    .isString()
    .notEmpty()
    .withMessage('Country must be a string 🤨'),
    handleValidationErrors,
];
