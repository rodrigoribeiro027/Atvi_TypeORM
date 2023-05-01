import { Router } from "express";

const routes = Router();

routes.get('/match');
routes.get('/match/:id');
routes.post('/match');
routes.put('/match');
routes.delete('/match');

export default routes