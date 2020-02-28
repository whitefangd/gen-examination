import { Logging } from "@google-cloud/logging";

const LOGGING = new Logging();
const METADATA = {
    resource: {
        type: 'cloud_function',
        labels: {
            function_name: ""
        }
    },
};

const LOGGER = {
    info: function (function_name: string, message: string, detail?: any) {
        METADATA.resource.labels.function_name = function_name;
        const log = LOGGING.log("info");
        const entry = log.entry(METADATA, { message: message, detail: detail });
        log.write(entry);
        console.info(JSON.stringify([METADATA, { message: message, detail: detail }], null, 4));
    },

    error: function (function_name: string, message: string, detail?: any) {
        METADATA.resource.labels.function_name = function_name;
        METADATA.resource.labels.function_name = function_name;
        const log = LOGGING.log("error");
        const entry = log.entry(METADATA, { message: message, detail: detail });
        log.write(entry);
        console.error(JSON.stringify([METADATA, { message: message, detail: detail }], null, 4));
    }
}

export default LOGGER