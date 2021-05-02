import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { User } from "./user";
import { Video } from "./video";
import { Document } from "./document";


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

    @OneToMany(() => Document, document => document.material)
    document: Document[];
}

