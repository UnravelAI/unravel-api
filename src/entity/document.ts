import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import { Material } from "./material";

@Entity("Documents")
export class Document {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    fileName: string;

    @Column({
        nullable: true,
    })
    fileUrl: string;

    @Column({
        default: false,
    })
    fileUploaded: boolean;

    @ManyToOne(() => Material, material => material.document)
    material: Material;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

