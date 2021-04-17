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

    @Column({
        nullable: true,
    })
    fileName: string;

    @Column({
        nullable: true,
    })
    duration: string;

    @Column({
        nullable: true,
    })
    streamingUrl: string;

    @Column({
        nullable: true,
    })
    audioUrl: string;

    @Column({
        default: false,
    })
    jobCompleted: boolean;

    @Column({
        default: 0,
    })
    views: number;

    @Column({
        type: 'json',
        nullable: true,
    })
    transcription: any;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

