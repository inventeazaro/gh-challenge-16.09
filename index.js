const { app } = require('./config');

async function main() {
    const { zeroZeroFormat, config } = require('./util');
    const fs = require('fs');

    let speech;
    if (config.app.useBeta) {
        console.log('[MAIN] Using beta');
        speech = require('@google-cloud/speech').v1p1beta1;
    } else {
        console.log('[MAIN] Using stable version');
        speech = require('@google-cloud/speech');
    }
  
    const client = new speech.SpeechClient();
    console.log('[MAIN] Client created');

    const request = {
        audio: config.audio,
        config: config.requestConfig,
    };

    let response;
    if (config.app.longRunning) {
        console.log('[MAIN] Application is longRunning');
        console.log('[MAIN] Working... \n');
        const [operation] = await client.longRunningRecognize(request);
        [response] = await operation.promise();
    } else {
        console.log('[MAIN] Application is not longRunning');
        console.log('[MAIN] Working... \n');
        [response] = await client.recognize(request);
    }

    console.log('[MAIN] Got results');
    console.log('[MAIN] Processing results \n');

    let result = '';
    let wordsData = '';
    response.results.forEach((e) => {
        result += '     ';
        if (config.app.timestamps) {
            let seconds = e.alternatives[0].words[0].startTime.seconds % 60;
            let minutes = e.alternatives[0].words[0].startTime.seconds / 60;
            minutes = Math.trunc(minutes);
            seconds = Math.trunc(seconds);
    
            minutes = zeroZeroFormat(minutes);
            seconds = zeroZeroFormat(seconds);
            
            result += `${minutes}:${seconds}:`;
        }
        if (config.requestConfig.enableWordConfidence) {
            if (e.alternatives[0].confidence < config.app.confidenceAlertTreshold) {
                result += `${config.app.confidenceMarker}:`;
            }
        }
        result += `${e.alternatives[0].transcript}\n`;
        if (config.app.showAllWords) {
            e.alternatives[0].words.forEach((w) => {
                let wordInfo = '';
                if (config.app.timestamps) {
                    let seconds = w.startTime.seconds % 60;
                    let minutes = w.startTime.seconds / 60;
                    minutes = Math.trunc(minutes);
                    seconds = Math.trunc(seconds);
            
                    minutes = zeroZeroFormat(minutes);
                    seconds = zeroZeroFormat(seconds);
                    
                    wordInfo += `    ${minutes}:${seconds}:`;
                }
                if (config.app.differentSpeakers.enable) {
                    wordInfo += `${w.speakerTag}:`;
                }
                if (config.requestConfig.enableWordConfidence) {
                    if (w.confidence < config.app.confidenceAlertTreshold) {
                        wordInfo += `${config.app.confidenceMarker}:`;
                    }
                }
                wordInfo += `${w.word}\n`;
                wordsData += wordInfo;
                wordInfo = '';
            });
        }
    });

    let fileOutput = '';

    console.log(`[MAIN] Results: \n\n\n`);
    console.log(result);
    fileOutput += `${result}\n\n`;

    if (config.app.showAllWords) {
        console.log(`[MAIN] Words: \n\n\n`);
        console.log(wordsData);
        fileOutput += `${wordsData}\n`;
    }

    if (config.app.outputFile) {
        fs.writeFileSync(config.app.outputFile, fileOutput);
        console.log('[MAIN] [EXIT] Wrote to file');
    }
}
main().catch(console.error);