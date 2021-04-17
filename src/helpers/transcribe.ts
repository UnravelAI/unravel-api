import speech from '@google-cloud/speech'
const client = new speech.SpeechClient();

const transcribe = async (audio: any, config: any) => {
    try {
        console.log("transcribing...");
        const request = {
            audio,
            config,
        };
        // Detects speech in the audio file. This creates a recognition job that you
        // can wait for now, or get its result later.
        const [operation] = await client.longRunningRecognize(request);

        // Get a Promise representation of the final result of the job
        const [response] = await operation.promise();
        response.results.forEach(result => {
            console.log(`Transcription: ${result.alternatives[0].transcript}`);
            result.alternatives[0].words.forEach(wordInfo => {
                // NOTE: If you have a time offset exceeding 2^32 seconds, use the
                // wordInfo.{x}Time.seconds.high to calculate seconds.
                const startSecs =
                    `${wordInfo.startTime.seconds}` +
                    '.' +
                    wordInfo.startTime.nanos / 100000000;
                const endSecs =
                    `${wordInfo.endTime.seconds}` +
                    '.' +
                    wordInfo.endTime.nanos / 100000000;
                console.log(`Word: ${wordInfo.word}`);
                console.log(`\t ${startSecs} secs - ${endSecs} secs`);
            });
        });
    }
    catch (error) {
        throw {
            type: "STT_ERROR",
            error,
        };
    }
}


export default transcribe;