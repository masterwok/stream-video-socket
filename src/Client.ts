import {Constants} from './Constants';
import * as websocketStream from 'websocket-stream';
import {Duplex} from 'stream';
import * as render from 'render-media';
import * as rangeStream from 'range-stream';
import * as MultiStream from 'multistream';


const file = {
    name: Constants.filePath,
    createReadStream: function (opts: any) {
        opts = opts || {};

        let start = opts.start || 0;

        return new MultiStream(cb => {
            const stream: Duplex = websocketStream(Constants.connectionString);
            const reqStart = start;

            let end = opts.end ? (opts.end + 1) : -1;
            let reqEnd = start + Constants.requestSize;

            if (end >= 0 && reqEnd > end) {
                reqEnd = end;
            }

            if (reqStart >= reqEnd) {
                return cb(null, null);
            }

            const ns = stream.pipe(rangeStream(reqStart,  reqEnd - 1));

            start = reqEnd;

            cb(null,  ns);
        });
    }
};


render.append(file, 'body', (err) => {
    if (err) {
        return console.error(err.message);
    }
});
