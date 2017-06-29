import {Constants} from './Constants';
import * as render from 'render-media';
import * as websocketStream from 'websocket-stream';
import {Duplex} from 'stream';
import {HexHelper} from './Helpers/HexHelper';
import * as Multistream from 'multistream';


const file = {
    name: Constants.filePath,
    createReadStream: function (opts) {
        const stream: Duplex = websocketStream(Constants.connectionString);

        // stream.on('data', (data: Buffer) => {
        //     const hex = HexHelper(data);
        //     console.log(data.length);
        // });

        return stream;
    }
};

render.append(file, 'body', (err) => {
    if (err) {
        return console.error(err.message);
    }
});



