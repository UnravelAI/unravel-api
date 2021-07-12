import Express from "express";
import { Request, Response } from "express";
import { getConnection, Repository } from "typeorm";
import { Video } from "../../entity/video";
const router = Express.Router();
import { TextAanalysis } from "../../entity/textAnalysis";
import {
    ComprehendClient,
    DetectSentimentCommand,
    DetectPiiEntitiesCommand,
    DetectEntitiesCommand,
} from "@aws-sdk/client-comprehend";

// Set the AWS Region
const REGION = "us-east-1"; // For example, "us-east-1"


/*

    genrate pii

*/
router.post("/pii", async (req: Request, res: Response) => {
    try {
        const videoRepository: Repository<Video> = await getConnection().getRepository(Video);
        const videoFileName: string = req.body.fileName;
        const fileNameWExtension = videoFileName.substring(
            0,
            videoFileName.lastIndexOf(".")
        );
        console.log("fileName without extention: ", fileNameWExtension);

        const video = await videoRepository.findOne({ fileName: fileNameWExtension + ".mp4" });
        if (!video) {
            return res.status(404).json({
                message: `Video: ${fileNameWExtension + ".mp4"} not found`,
            });
        }

        // create AWS comprehend client
        const client = new ComprehendClient({ region: REGION });
        const input = {
            Text: req.body.text,
            LanguageCode: "en",
        }
        console.log("Text:", input.Text);

        // get pii analysis from AWS
        const detectPii = new DetectPiiEntitiesCommand(input);
        const piiResponse = await client.send(detectPii);
        console.log("AWS Response: ", piiResponse)

        // create textAnalysis object
        const analysis = new TextAanalysis();
        analysis.text = req.body.text;
        analysis.video = video;
        analysis.pii = JSON.stringify(piiResponse.Entities);

        // add textAnalysis object to database
        const textAnalysisRepository: Repository<TextAanalysis> = await getConnection().getRepository(TextAanalysis);
        const savedAnalysis: TextAanalysis = await textAnalysisRepository.save(analysis);
        return res.status(200).json({
            message: "video pii generated successfully",
            pii: savedAnalysis.pii,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});



/*

    generate text analysis

*/
router.put("/", async (req: Request, res: Response) => {
    try {
        const video = new Video();
        const analysis = new TextAanalysis();
        video.id = req.body.videoID;

        // create AWS comprehend client
        const client = new ComprehendClient({ region: REGION });
        const input = {
            Text: req.body.text,
            LanguageCode: "en",
        }
        // get sentiments analysis from AWS
        const detectSentiment = new DetectSentimentCommand(input);
        const sentimentsRes = await client.send(detectSentiment);
        // get pii analysis from AWS
        const detectPii = new DetectPiiEntitiesCommand(input);
        const piiResponse = await client.send(detectPii);
        // get entities analysis from AWS
        const detectEntities = new DetectEntitiesCommand(input);
        const entitesResponse = await client.send(detectEntities);

        // add grabbed data to database
        const textAnalysisRepository: Repository<TextAanalysis> = await getConnection().getRepository(TextAanalysis);
        const updateAnalysis = await textAnalysisRepository.update({ video },
            {
                sentiment: sentimentsRes.Sentiment,
                sentimentMixed: sentimentsRes.SentimentScore.Mixed,
                sentimentNeutral: sentimentsRes.SentimentScore.Neutral,
                sentimentPositive: sentimentsRes.SentimentScore.Positive,
                sentimentsNegative: sentimentsRes.SentimentScore.Negative,
                pii: JSON.stringify(piiResponse.Entities),
                entities: JSON.stringify(entitesResponse.Entities),
            });
        if (!updateAnalysis.affected) {
            return res.status(404).json({
                message: "Error: text analysis not found",
            });
        }
        return res.status(200).json({
            message: "Text analysis is updated successfully",
            Entities: analysis,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});


export default router;
