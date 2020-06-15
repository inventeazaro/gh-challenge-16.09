const fs = require('fs');

function readAudioFile(fileName) {
    // Reads a local audio file and converts it to base64
    // If needed, the function may be modified to read a file from the web or something
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');

    return audioBytes;
}

const config = {
    // The request config that the Google Client takes in. Can be also changed by app config
    requestConfig: {
        encoding: 'MP3',
        sampleRateHertz: 16000,
        languageCode: 'ro-RO',
        enableAutomaticPunctuation: false, // [!!!!] This does not seem to work with ro-RO
        enableWordConfidence: true, // If the confidence is < confidenceAlertTreshold, it will display "???"
    },
    // The audio config that the Google Client takes in
    audio: {
        content: readAudioFile('./resources/input.mp3')
    },
    // The config for the app, can modify the request config
    app: {
        useBeta: true, // If === true, it will use the beta version. [!!!!] Required for showAllWords word-level confidence!
        longRunning: false, // If the request is long running or not
        showAllWords: false, // If this is enabled, a list of all words, optionally with their timestamps and speaker tags will be printed after the full transcript.
        confidenceAlertTreshold: 0.9, // If the confidence is < than this number, it will display "???" before the word if showAllWords === true, or if its === false, before each section of the transcript. Only works if enableWordConfidence === true.
        confidenceMarker: '???', // What to use instead of "???" when it's not sure of a word/section
        differentSpeakers: {
            enable: false, // [!!!!] This does not work with ro-RO. Only has effect if showAllWords === true. [CHANGES REQUEST]
            speakers: 2 // Number of speakers to be identified. Only does something if enable === true.
        },
        timestamps: true, // Determines if timestamps are shown. If timestamps for each word are needed, enable showAllWords, otherwise timestamps will be printed once in a while. [CHANGES REQUEST]
        showImportantConfigOnStartup: true, // If === true, it shows some of the config on startup.
        outputFile: 'output.txt', // The file it is going to output to. 
    }
}

module.exports = config;