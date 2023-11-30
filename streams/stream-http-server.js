import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        console.log(transformed);
        callback(null, Buffer.from(String(transformed)));
    }
}

const server = http.createServer(async (req, res) => {
    const buffers = [];

    for await (const chunk of req) { //Isso é muito bom para utilizar quando precisamos de uma informação por completada para ai então trabalhar com esses dados
        buffers.push(chunk);
    }

    const fullStreamContent = Buffer.concat(buffers).toString();
    console.log(fullStreamContent);

    return res.end(fullStreamContent);
});

server.listen(3334);