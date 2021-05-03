import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

export enum videoStatus {
    PROCESSING = "processing",
    EDITABLE = "editable",
    EDITING = "editing",
    PUBLISHED = "published",
}

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
        nullable: true,
    })
    transcriptionUrl: string;

    @Column({
        type: "enum",
        enum: videoStatus,
        default: "processing",
    })
    status: videoStatus;

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

