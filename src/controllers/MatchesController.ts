import { Request, Response } from "express";
import database from "../config/database";
import Teams from "../entity/Teams";
import Matches from "../entity/Matches";

class MatchesController {
    public async createMatch(req: Request, res: Response) {
        try {
            const { idhost, idvisitor } = req.body;
            const host = await database.getRepository(Teams).findOneBy({ id: idhost });
            const visitor = await database.getRepository(Teams).findOneBy({ id: idvisitor });
            const match = new Matches();
            match.host = host;
            match.visitor = visitor;
            match.date = new Date();
            await database.getRepository(Matches).save(match);
            return res.json(match);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    public async getMatches(req: Request, res: Response) {
        try {
            const { limit, offset } = req.body;
            const matches = await database.getRepository(Matches)
                .createQueryBuilder("match")
                .leftJoinAndSelect("match.host", "host")
                .leftJoinAndSelect("match.visitor", "visitor")
                .orderBy("match.date", "DESC")
                .skip(offset)
                .take(limit)
                .getMany();
            return res.json(matches);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getMatchesByTeamId(req: Request, res: Response) {
        try {
            const teamId = parseInt(req.params.id);
            const matches = await database
                .getRepository(Matches)
                .createQueryBuilder("matches")
                .leftJoinAndSelect("matches.host", "host")
                .leftJoinAndSelect("matches.visitor", "visitor")
                .where("host.id = :teamId OR visitor.id = :teamId", { teamId })
                .orderBy("matches.date", "DESC")
                .getMany();
            return res.json(matches);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    public async deleteMatch(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const data = await database.createQueryBuilder().delete().from(Matches).where("id=:id", { id }).execute();
            return res.json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    public async updateMatch(req: Request, res: Response) {
        try {
            const { id, idhost, idvisitor, date } = req.body;

            const host = await database.getRepository(Teams).findOne({ where: { id: idhost } });
            if (!host) {
                return res.status(400).json({ error: "Mandante desconhecido" });
            }
            const visitor = await database.getRepository(Teams).findOne({ where: { id: idvisitor } });
            if (!visitor) {
                return res.status(400).json({ error: "Visitante desconhecido" });
            }
            const match = await database.getRepository(Matches).findOne({ where: { id } });
            if (!match) {
                return res.status(400).json({ error: "Jogo não encontrado" });
            }
            match.date = date;
            match.host = host;
            match.visitor = visitor;
            await database.getRepository(Matches).save(match);
            return res.json(match);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar jogo" });
        }
    }
}

export default new MatchesController();
