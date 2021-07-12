import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne,
} from "typeorm";
import { Video } from './video';


@Entity("TextAanalysis")
export class TextAanalysis {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: 'json',
        nullable: true,
    })
    text: string;

    @Column({
        nullable: true,
        type: "decimal",
    })
    sentimentsNegative: number;

    @Column({
        nullable: true,
        type: "decimal",
    })
    sentimentPositive: number;

    @Column({
        nullable: true,
        type: "decimal",
    })
    sentimentNeutral: number;

    @Column({
        nullable: true,
        type: "decimal",
    })
    sentimentMixed: number;

    @Column({
        nullable: true,
    })
    sentiment: string;

    @Column({
        nullable: true,
    })
    entities: string;

    @Column({
        nullable: true,
    })
    pii: string;

    @OneToOne(() => Video)
    @JoinColumn()
    video: Video;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}
