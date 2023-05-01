
import { Router } from "express";
import TeamController from "../controllers/TeamController";

const routes = Router();

routes.get('/team');
routes.get('/team/:id');
routes.post('/team',TeamController.createTeam);
routes.put('/team');
routes.delete('/team');

export default routes