import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Material } from "./material";
import { User } from "./user";

@Entity("Courses")
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    name: string;

    @OneToMany(() => Material, material => material.course)
    materials: Material[];

    @ManyToOne(() => User, user => user.materials)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

