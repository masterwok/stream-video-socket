import {Constants} from './Constants';
import * as websocketStream from 'websocket-stream';
import {Duplex} from 'stream';
import {HexHelper} from './Helpers/HexHelper';
import * as render from 'render-media';

const stream: Duplex = websocketStream(Constants.connectionString);

stream.on('data', (data: ArrayBuffer) => {
    const hex = HexHelper(data);
    console.log(data.byteLength);
});

stream.on('finish', (data: ArrayBuffer) => {
    console.log('Stream finished.');
});

// const file = {
//     name: Constants.filePath,
//     createReadStream: function (opts: any) {
//     }
// };
//
// render.append(file, 'body', (err) => {
//     if (err) {
//         return console.error(err.message);
//     }
// });



