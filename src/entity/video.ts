import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne

} from "typeorm";

@Entity("Videos")
export class Video {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    filename: string;

    @Column()
    duration: string;

    @Column()
    streamingUrl: string;

    @Column()
    jobCompleted: boolean;

    @Column()
    views: number;

    @Column('json')
    transcription: any;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

