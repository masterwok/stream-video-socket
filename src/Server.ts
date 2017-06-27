import * as io from 'socket.io';
import * as fs from 'fs';
import * as bs from 'browser-stream';
import {Constants} from './Constants';

// const path = '/mnt/global/Pictures/Desktop Backgrounds/spaceCat.jpg';
const path = '/mnt/global/Movies/Hackers (1995)/Hackers.1995.720p.BrRip.x264.YIFY.mp4';
const socket = io();


socket.on('connection', (socket) => {

    const browserStream = bs(socket);

    console.log('Client connected.');

    browserStream.on('connection', (stream, opts) => {
        if (stream.name == Constants.namespace) {
            fs.createReadStream(path, opts)
                .pipe(stream);
        }

        stream.on('error', function (err) {
            console.error(err);
        });
    });
});

socket.listen(Constants.port);
