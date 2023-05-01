import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import matchesRoutes from './routes/matchesRoutes';
import teamsRoutes from './routes/teamsRoutes';
import database from "./config/database";

dotenv.config();
const PORT = process.env.PORT || 3004;
const app = express();

app.use(express.json());
app.use(cors());

database.initialize().then(async(connection)=> {
    console.log("Banco de Dados conectado.");
}). catch ((error)=>{
    console.error('Banco de dados não conectado, erro:', error);
})

app.use(matchesRoutes);
app.use(teamsRoutes);

app.listen(PORT, ()=>console.log(`Servidor rodando na porta ${PORT}`));
