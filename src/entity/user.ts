import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { Material } from "../entity/material";
import { Course } from "./course";

export enum userGender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other",
}

@Entity("Users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column({
        default: "false",
    })
    emailVerified: boolean;

    @Column({
        default: "false",
    })
    isTeacher: boolean;

    @Column({
        nullable: true,
    })
    educationEntityName: string;

    @Column({
        nullable: true,
    })
    concentration: string;

    @Column({
        type: "enum",
        enum: userGender,
    })
    gender: userGender;

    @Column({
        nullable: true,
    })
    dob: string;

    @Column()
    passwordHash: string;

    @Column()
    passwordSalt: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @OneToMany(() => Material, material => material.user)
    materials: Material[];

    @OneToMany(() => Course, course => course.user)
    courses: Course[];

    @ManyToMany(() => Course)
    @JoinTable()
    enrolled: Course[];

}
