import {Constants} from './Constants';
import * as fs from 'fs';
import {Server} from 'ws';
import * as websocketStream from 'websocket-stream';


new Server({
    port: Constants.port
}).on('connection', (ws) => fs
    .createReadStream(Constants.filePath)
    .pipe(websocketStream(ws))
);

