let config = require('./config');

function zeroZeroFormat(n){
    return n > 9 ? "" + n : "0" + n;
}

if (config.app.showImportantConfigOnStartup) {
    console.log('[STARTUP] [CONFIG] Showing config on startup');
}

if (config.app.differentSpeakers.enable === true) {
    config.app.differentSpeakers.model = config.app.differentSpeakers.model ? config.app.differentSpeakers.model : 'phone_call'
    config.requestConfig = {
        ...config.requestConfig,
        enableSpeakerDiarization: true,
        diarizationSpeakerCount: config.app.differentSpeakers.speakers,
        model: config.app.differentSpeakers.model,
    }

    if (config.app.showImportantConfigOnStartup) {
        console.log(`[STARTUP] [CONFIG] Using different speakers: \n    count: ${config.requestConfig.diarizationSpeakerCount} \n    model: ${config.requestConfig.model} \n\n`);
    }    
}

if (config.app.timestamps) {
    config.requestConfig = {
        ...config.requestConfig,
        enableWordTimeOffsets: true
    };
    if (config.app.showImportantConfigOnStartup) {
        console.log(`[STARTUP] [CONFIG] Using timestamps`);
    }
}

if (config.app.showImportantConfigOnStartup) {
    console.log(`[STARTUP] [CONFIG] Basic config: \n    longRunning: ${config.app.longRunning}`);
    Object.keys(config.requestConfig).forEach((i) => {
        console.log(`    ${i}: ${config.requestConfig[i]}`);
    });
    console.log('\n');
}

module.exports = { zeroZeroFormat, config };