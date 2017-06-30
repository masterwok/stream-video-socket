import {Constants} from './Constants';
import * as fs from 'fs';
import * as ws from 'ws';
import * as websocketStream from 'websocket-stream';



new ws.Server({
    port: Constants.port
}).on('connection', (ws) => fs
    .createReadStream(Constants.filePath)
    .pipe(websocketStream(ws))
);

