import * as browserStream from 'browser-stream';
import * as io from 'socket.io-client';
import * as render from 'render-media';
import {Constants} from './Constants';


const socket = io(`http://${Constants.host}:${Constants.port}`);
const bs = browserStream(socket);

// function buf2hex(buffer) {
//     return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
// }

const file = {
    name: 'spaceCat.mp4',
    createReadStream: (opts) => bs.createReadStream(
        Constants.namespace,
        opts
    )
};

render.append(file, 'body', (err) => {
    if (err) {
        return console.error(err.message);
    }
});




