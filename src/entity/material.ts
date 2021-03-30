import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn
} from "typeorm";
import { User } from "../entity/user";
import { Video } from "../entity/video";

@Entity("Materials")
export class Material {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @ManyToOne(() => User, user => user.materials)
    user: User;

    @OneToOne(() => Video)
    @JoinColumn()
    video: Video;

}

