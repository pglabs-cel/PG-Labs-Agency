import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import { requireAdminAuth } from "../middleware/admin.middleware";

const router: Router = Router();

// Public routes
router.get("/projects", ProjectController.getProjects);
router.get("/projects/:slug", ProjectController.getProjectBySlug);

// Admin-protected routes
router.post("/admin/projects", requireAdminAuth, ProjectController.createProject);
router.put("/admin/projects/:id", requireAdminAuth, ProjectController.updateProject);
router.delete("/admin/projects/:id", requireAdminAuth, ProjectController.deleteProject);

export default router;
