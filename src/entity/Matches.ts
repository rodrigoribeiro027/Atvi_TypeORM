import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Teams from "./Teams";


@Entity({name:'matches'})
class Matches{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type:'date', default:() => "CURRENT_TIMESTAMP"})
    date: Date

    @ManyToOne(type => Teams, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({
        name:'idhost',
        referencedColumnName:'id',
        foreignKeyConstraintName:'fk_host_id'
    })
    host: Teams

    @ManyToOne(type => Teams, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({
        name:'idvisitor',
        referencedColumnName:'id',
        foreignKeyConstraintName:'fk_visitor_id'
    })
    visitor: Teams
}

export default Matches;