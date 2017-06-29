import {Constants} from './Constants';
import * as render from 'render-media';

import * as websocketStream from 'websocket-stream';
import {Duplex} from 'stream';

const stream: Duplex = websocketStream(`ws://localhost:${Constants.port}`);

stream.on('data', data => {
    console.log(buf2hex(data));
});

function buf2hex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

// const file = {
//     name: 'cat.mp4',
//     createReadStream: function (opts) {
//         return stream;
//     }
// };
//
// render.append(file, 'body', function (err, elem) {
//     if (err) return console.error(err.message);
// });
