import Express from "express";
import { Request, Response } from "express";
import { getConnection, Repository } from "typeorm";
import { Video } from "../../entity/video";
const router = Express.Router();
import { transcribe } from "../../helpers/transcribeAWS";

/*

    Generate URL endpoint

*/
router.put("/generateStreamingURL", async (req: Request, res: Response) => {
    try {
        const videoRepository: Repository<Video> = await getConnection().getRepository(Video);
        const videoFileName: string = req.body.fileName;
        const guid: string = req.body.guid;
        const fileNameWExtension = videoFileName.substring(0, videoFileName.lastIndexOf('.'));
        const streamableURL: string = "https://d10n7efzl01lxo.cloudfront.net/" + guid + "/AppleHLS1/" + fileNameWExtension + ".m3u8";
        const audioURL: string = "s3://unravel-foundation-destination920a3c57-lzvld8jwflhj/" + guid + "/FileGroup1/" + fileNameWExtension + "audio.mp3";
        console.log(streamableURL);
        console.log(audioURL);
        const updateResult = await videoRepository.update(
            { fileName: videoFileName },
            {
                streamingUrl: streamableURL,
                audioUrl: audioURL,
            },
        );
        if (!updateResult.affected) {
            return res.status(404).json({
                message: "Video not found"
            })
        }
        return res.status(200).json({
            message: "video streamableURL updated successfully",
            streamableURL,
            audioURL,
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

/*

    set video job status and start transcribing

*/
router.put("/jobStatus", async (req: Request, res: Response) => {
    try {
        const fileName: string = req.body.fileName;
        const videoRepository: Repository<Video> = await getConnection().getRepository(Video);
        // retrieve video
        const video = await videoRepository.findOne({ fileName });
        console.log(video);
        if (!video || !video.audioUrl) {
            return res.status(404).json({
                message: "Error: video/audio not found",
            });
        }
        // start transcribing video
        const audioURL = video.audioUrl;
        const transcribeJobName = fileName.substring(0, fileName.lastIndexOf('.')); // fileName without extension
        await transcribe(audioURL, transcribeJobName);
        // update jobStatus for the specified file
        const updateResult = await videoRepository.update({ fileName }, { jobCompleted: true });
        if (!updateResult.affected) {
            return res.status(404).json({
                message: "Error: video not found",
            });
        }
        return res.status(200).json({
            message: `jobStatus updated successfully for video: ${fileName}`,
        });

    } catch (error) {
        if (error.type === "STT_ERROR") {
            return res.status(500).json({
                message: error,
            });
        }
        if (error.response.status === 404) {
            return res.status(404).json({
                message: "invalid audio url",
            });
        }
        return res.status(500).json({
            message: error.message,
        });
    }
});

/*

    set video job status and start transcribing

*/
router.put("/jobStatus/transcribe", async (req: Request, res: Response) => {
    try {
        const transcribeJobName: string = req.body.transcribeJobName;
        const videoRepository: Repository<Video> = await getConnection().getRepository(Video);
        const fileNameWithoutEx = transcribeJobName.substring(0, transcribeJobName.lastIndexOf('.')); // fileName without extension
        const transcriptionUrl: string = "https://d10n7efzl01lxo.cloudfront.net/" + transcribeJobName;
        // update transcribing status jobStatus for the specified file
        const updateResult = await videoRepository.update({ fileName: `${fileNameWithoutEx}.mp4` }, {
            transcriptionCompleted: true,
            transcriptionUrl,
        });
        if (!updateResult.affected) {
            return res.status(404).json({
                message: "Error: video not found",
            });
        }
        return res.status(200).json({
            message: `Transcribe job status updated successfully for video: ${fileNameWithoutEx}`,
        });

    } catch (error) {
        if (error.type === "STT_ERROR") {
            return res.status(500).json({
                message: error,
            });
        }
        if (error.response.status === 404) {
            return res.status(404).json({
                message: "invalid audio url",
            });
        }
        return res.status(500).json({
            message: error.message,
        });
    }
});

export default router;
