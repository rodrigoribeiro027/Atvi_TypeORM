
import { Router } from "express";
import TeamController from "../controllers/TeamController";

const routes = Router();

routes.get('/team',TeamController.findTeams);
routes.get('/team/:termo',TeamController.findTeamByTermo);
routes.post('/team',TeamController.createTeam);
routes.put('/team',TeamController.updateTeam);
routes.delete('/team',TeamController.deleteTeam);

export default routes