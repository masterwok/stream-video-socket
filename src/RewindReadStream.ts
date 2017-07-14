import {Duplex, PassThrough, Transform} from 'stream';
import {Constants} from './Constants';
import {HexHelper} from './Helpers/HexHelper';

export class RewindReadStream extends Transform {
    private chunkBuf: Array<ArrayBuffer>;
    private hitLimit: boolean;
    private chunkSize: number;
    private maxSize: number;
    private offset: number;

    constructor(chunkSize: number,
                maxSize: number) {
        super();

        this.chunkSize = chunkSize;
        this.maxSize = maxSize;
        this.chunkBuf = [];
        this.offset = 0;
    }

    _transform(buf, enc, cb) {
        this.offset += buf ? buf.length : 0;
        this.chunkBuf.push(buf);

        this.push(buf);
        this.reduceChunkBuffer();

        cb();
    }

    // TODO: Fix once rewind works.
    private reduceChunkBuffer() {

        if (this.hitLimit) {
            this.chunkBuf.shift();
            return;
        }

        this.hitLimit = this.chunkBuf.length
            * this.chunkSize
            > this.maxSize - 1;

        // Below limit
        if (!this.hitLimit) {
            return;
        }

        // Remove oldest chunk
        this.chunkBuf.shift();
    }

    rewind(index: number): PassThrough {
        let stream = new PassThrough();

        const chunkIndex = Math.floor(index / this.chunkSize);

        let splitChunk = this.chunkBuf[chunkIndex]
            .slice(index, this.chunkSize - 1);

        console.log(`position: ${index}, index: ${chunkIndex}, size: ${splitChunk.byteLength}`);

        stream.write(splitChunk);

        for (let i = chunkIndex; i < this.chunkBuf.length; i++) {
            stream.write(this.chunkBuf[i]);
        }

        return stream;
    }
}