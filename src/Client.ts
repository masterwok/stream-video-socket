import * as browserStream from 'browser-stream';
import * as io from 'socket.io-client';
import * as render from 'render-media';

const bs = browserStream(io('http://localhost:3000'));


const file = {
    name: 'cat.mp4',
    createReadStream: () => {
        return bs.createReadStream('some-namespace');
    }
};

render.append(file, 'body', (err, elem) => {
    if (err) {
        return console.error(err.message);
    }

    console.log(elem); // this is the newly created element with the media in it
});

