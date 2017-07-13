import {Constants} from './Constants';
import * as websocketStream from 'websocket-stream';
import {Duplex} from 'stream';
import * as render from 'render-media';
import * as rangeStream from 'range-stream';
import * as MultiStream from 'multistream';

const stream: Duplex = websocketStream(Constants.connectionString);

const file = {
    name: Constants.filePath,
    createReadStream: function (opts: { start?: number, end?: number }) {
        opts = opts || {};

        let start = opts.start || 0;
        let previousReqEnd = 0;

        return new MultiStream(cb => {

            const reqStart = start;


            let end = opts.end ? (opts.end + 1) : Constants.fileSize;
            let reqEnd = start + Constants.requestSize;

            if (end >= 0 && reqEnd > end) {
                reqEnd = end;
            }

            if (reqStart >= reqEnd) {
                console.log('ending stream');
                return cb(null, null);
            }

            console.log(`reqStart: ${reqStart}, reqEnd: ${reqEnd}, previousReqEnd: ${previousReqEnd}`);

            if (reqStart < previousReqEnd) {
                console.log(`Stream needs to rewind to ${reqStart}`)
            }

            const rs = rangeStream(reqStart, reqEnd - 1);
            const ns = stream.pipe(rs);

            start = reqEnd;
            previousReqEnd = reqEnd;

            cb(null, ns);
        });
    }
};


render.append(file, 'body', (err: { message: string }) => {
    if (err) {
        return console.error(err.message);
    }
});
