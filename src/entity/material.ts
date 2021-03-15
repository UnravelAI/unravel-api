import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne

} from "typeorm";
import {User} from "../entity/user";

@Entity("Materials")
export class Material {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => User, user => user.materials)
    user: User;

}

