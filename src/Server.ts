import {Constants} from './Constants';
import * as fs from 'fs';
import {Server} from 'ws';
import * as websocketStream from 'websocket-stream';

const path = '/home/masterwok/Downloads/small.mp4';

const wss = new Server({port: Constants.port});

wss.on('connection', function connect(ws) {
    console.log('connection!');
    var stream = websocketStream(ws);
    var rs = fs.createReadStream(path);
    rs.pipe(stream);
});

