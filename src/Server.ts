import * as io from 'socket.io';
import * as fs from 'fs';
import * as bs from 'browser-stream';
import {read} from 'fs';

const path = '/home/masterwok/Downloads/Batman and Robin (1997) [1080p]/Batman.and.Robin.1997.1080p.BluRay.x264.YIFY.mp4';
const socket = io();


socket.on('connection', (socket) => {

    const browserStream = bs(socket);
    const readStream = fs.createReadStream(path);

    browserStream.on('connection', (stream, opts) => {
        if (stream.name == 'some-namespace') {
            console.log('Received correct namespace');
            readStream.pipe(stream);
        }

        stream.on('error', function (err) {
            console.error(err);
        });
    });


    console.log('client connected!');
});

socket.listen(3000);
