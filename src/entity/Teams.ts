import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({name:"teams"})
class Teams{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:false, length: 40, unique:true})
    name: string
}

export default Teams;