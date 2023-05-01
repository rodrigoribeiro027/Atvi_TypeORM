import { Request,Response } from "express";



class MatchesController{
    public async createMatche (req:Request,res:Response){
        try{
            
        }catch(error){
            res.status(500).json(error);
        }
    }

}