import {Constants} from './Constants';
import * as websocketStream from 'websocket-stream';
import * as render from 'render-media';
import * as rangeStream from 'range-stream';
import * as MultiStream from 'multistream';
import {RewindReadStream} from './RewindReadStream';
import {HexHelper} from './Helpers/HexHelper';

const stream = websocketStream(Constants.connectionString)
    .pipe(new RewindReadStream(
        Constants.requestSize,
        Constants.requestSize * 4
    ));

const file = {
    name: Constants.filePath,
    createReadStream: function (opts: { start?: number, end?: number }) {
        opts = opts || {};

        let start = opts.start || 0;
        let previousReqEnd = Constants.requestSize;

        return new MultiStream(cb => {

            const reqStart = start;
            const rs = rangeStream(0, Constants.requestSize);

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

            if (reqStart != 0 && reqStart < previousReqEnd) {
                const tmp = stream.rewind(reqStart).pipe(rs);

                tmp.on('data', data => {
                    console.log(HexHelper(data));
                });

                return cb(null, tmp);
                // return cb(null, stream.rewind(reqStart).pipe(rs));
            }

            start = reqEnd;
            previousReqEnd = reqEnd;

            cb(null, stream.pipe(rs));
        });
    }
};


render.append(file, 'body', (err: { message: string }) => {
    if (err) {
        return console.error(err.message);
    }
});
