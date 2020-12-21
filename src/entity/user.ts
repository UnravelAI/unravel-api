import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn

} from "typeorm";

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
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column({
        default: "false",
    })
    email_verified: boolean;

    @Column({
        default: "false",
    })
    is_teacher: boolean;

    @Column({
        nullable: true,
    })
    education_entity_name: string;

    @Column({
        nullable: true,
    })
    concentration: string;

    @Column({
        type: "enum",
        enum: userGender,
    })
    gender: userGender;

    @Column()
    dob: string;

    @Column()
    password_hash: string;

    @Column()
    password_salt: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}
