import { Request,Response } from "express";
import database from "../config/database";
import Teams from "../entity/Teams";
import { Like } from "typeorm";

class TeamController{
    public async createTeam (req:Request,res:Response){
        try{
            const {name} = req.body;
            const team = await database.getRepository(Teams).save({name:name});
            return res.json(team);
        }catch(error){
            res.status(500).json({"error": "O nome já existe"});
        }
    }
    public async findTeams (req:Request,res:Response){
        try{
            const team = await database.getRepository(Teams).find({
                order:{
                    name:'ASC'
                }
            })
            return res.json(team)

        }catch(error){
            res.status(500).json(error);
        }
    }
    public async findTeamByTermo (req:Request,res:Response){
        try{
            const termo = req.params.termo
            const team = await database.getRepository(Teams).find({
                where:{
                    name: Like(`%${termo}%`)
                }
            })
            return res.json(team);
        }catch(error){
            res.status(500).json(error);
        }
    }
    public async updateTeam (req:Request,res:Response) {
        try{
            const {id,name} = req.body
            const team = await database.getRepository(Teams).findOneBy({id:id})
            team.name = name
            await database.getRepository(Teams).save(team);
            return res.json(team)
        }catch(error){
            res.status(500).json(error);
        }
    }
    public async deleteTeam (req:Request,res:Response) {
        try{
            const {id} = req.body
            const team = await database.createQueryBuilder().delete().from(Teams).where("id=:id",{id}).execute()
            return res.json(team)
        }catch(error){
            res.status(500).json(error);
        }
    }
    
}

export default new TeamController();