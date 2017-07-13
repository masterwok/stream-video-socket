
import {PassThrough, Transform} from 'stream';

export class RewindReadStream extends Transform{
    private accumulator: Array;
    
    constructor() {
        super();
        this.accumulator = [];
    }

    _transform(buf, enc, cb) {
        this.accumulator.push(buf);
        cb()
    }

    rewind() {
        let stream = new PassThrough();
        this.accumulator.forEach((chunk) => stream.write(chunk))
        return stream;
    }
}