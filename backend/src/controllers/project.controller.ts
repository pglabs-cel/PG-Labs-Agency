import { Request, Response, NextFunction } from "express";
import { ProjectService } from "../services/project.service";

export class ProjectController {
  public static async getProjects(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const featuredOnly = req.query.featured === "true";
      const projects = await ProjectService.getAllProjects(featuredOnly);

      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async getProjectBySlug(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
      const project = await ProjectService.getProjectBySlug(slug);

      if (!project) {
        res.status(404).json({
          success: false,
          error: "Project not found.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async createProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        title,
        slug,
        category,
        shortDescription,
        description,
        technologies,
        features,
        challenge,
        solution,
        outcome,
        year,
        featured,
        order,
        thumbnail,
        images,
        videoUrl,
      } = req.body;

      if (!title || !category || !shortDescription || !description || !challenge || !solution) {
        res.status(400).json({
          success: false,
          error: "Missing required fields (title, category, shortDescription, description, challenge, solution).",
        });
        return;
      }

      const project = await ProjectService.createProject({
        title,
        slug,
        category,
        shortDescription,
        description,
        technologies: Array.isArray(technologies) ? technologies : [],
        features: Array.isArray(features) ? features : [],
        challenge,
        solution,
        outcome,
        year: year || new Date().getFullYear().toString(),
        featured: featured !== undefined ? Boolean(featured) : true,
        order: Number(order) || 0,
        thumbnail: typeof thumbnail === "string" ? thumbnail : "",
        images: Array.isArray(images) ? images : [],
        videoUrl: typeof videoUrl === "string" ? videoUrl : "",
      });

      res.status(201).json({
        success: true,
        message: "Project created successfully.",
        data: project,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async updateProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = await ProjectService.updateProject(id, req.body);

      if (!updated) {
        res.status(404).json({
          success: false,
          error: "Project not found.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Project updated successfully.",
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async deleteProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await ProjectService.deleteProject(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: "Project not found.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Project deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}
