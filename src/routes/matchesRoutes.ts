import { Router } from "express";
import MatchesController from "../controllers/MatchesController";
const routes = Router();

routes.get('/match',MatchesController.getMatches);
routes.get('/match/:id',MatchesController.getMatchesByTeamId);
routes.post('/match',MatchesController.createMatch);
routes.put('/match');
routes.delete('/match');

export default routes