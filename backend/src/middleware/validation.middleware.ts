import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateContactInquiry = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("company")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Company name cannot exceed 100 characters"),

  body("projectType")
    .trim()
    .notEmpty()
    .withMessage("Project type is required")
    .isIn([
      "Website",
      "Web Application",
      "SaaS",
      "AI/ML",
      "Custom Software",
      "Automation",
      "Other",
    ])
    .withMessage("Invalid project type selected"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 3000 })
    .withMessage("Message must be between 10 and 3000 characters"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        error: errors.array()[0].msg,
        details: errors.array(),
      });
      return;
    }
    next();
  },
];