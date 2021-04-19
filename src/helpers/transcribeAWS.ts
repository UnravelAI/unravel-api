// Import the required AWS SDK clients and commands for Node.js
import {
    TranscribeClient,
    StartTranscriptionJobCommand,
} from "@aws-sdk/client-transcribe";

// Set the AWS Region
const REGION = "us-east-1"; // For example, "us-east-1"

const transcribe = async (audioURL: string, fileName: string) => {
    try {
        // Set the parameters
        const params = {
            TranscriptionJobName: fileName,
            LanguageCode: "en-US",
            MediaSampleRateHertz: 22050,
            MediaFormat: "mp3",
            Media: {
                MediaFileUri: audioURL
            },
            OutputBucketName: "unravel-foundation-destination920a3c57-lzvld8jwflhj"
        }
        console.log(params);

        console.log("transcribing...");
        // Create an Amazon Transcribe service client object
        const client = new TranscribeClient({ region: REGION });
        const data = await client.send(new StartTranscriptionJobCommand(params));
        console.log("Transcibtion Success - put", data);
    }
    catch (error) {
        console.log("Error", error);
        throw {
            type: "STT_ERROR",
            error,
        };
    }
}



export {
    transcribe,
};