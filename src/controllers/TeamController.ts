import { Request,Response } from "express";
import database from "../config/database";
import Teams from "../entity/Teams";

class TeamController{
    public async createTeam (req:Request,res:Response){
        try{
            const {name} = req.body;
            const team = new Teams();
            team.name = name
            await database.getRepository(Teams).save(team);
            return res.json(team);
        }catch(error){
            res.status(500).json({"error": "O nome já existe"});
        }
    }


}

export default new TeamController();