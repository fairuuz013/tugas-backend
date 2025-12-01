import http from 'http'
import { hello } from './hello.js';
import moment from 'moment';

// const server = http
// .createServer((req, res) =>  {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.write('Hidup jokowi!');
//     res.end()
// }).listen(3000)

const server = http.createServer((req, res) =>  {
    const url = req.url;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    if (url === '/makanan') {
        res.end(JSON.stringify({
            name: "Nasi padang",
            alasan: "Karna Enak banget jir"
        }));
    } else if (url === '/fairuuz') {
        res.end(JSON.stringify({
            name: "Fairuuz Zahran",
            role: "programmer. Terbaik yang pernah ada",
        }));
    } else if (url === '/anime') {
        res.end(JSON.stringify({
            name: "Naruto",
        }));
    } else if (url === '/Waifu') {
        res.end(JSON.stringify({
            name: "Mommy Yor",
            anime: "Spy x family",
        }));
    } else if (url === '/The movie') {
        res.end(JSON.stringify({
            name: "Sherlock Holmes and the hobbit",
            rate: "8,5",
        }));
    } else if (url === '/hobby') {
        res.end(JSON.stringify({
            name: "Coding ngga boong ini mah",
        }));
    } else if (url === '/Game') {
        res.end(JSON.stringify({
            name: "GTA V",
        }));
    } else if (url === '/music') {
        res.end(JSON.stringify({
            nameSong: "BIRDS OF A FEATHER",
            artis:"billie eilsh"
        }));
    } else if (url === '/RumahIT') {
        res.end(JSON.stringify({
            name: "mininamal bagusin dulu tempat jangan nambah mulu santri nya bertanya dengan nada rendah",
           
        }));
    } else if (url === '/series') {
        res.end(JSON.stringify({
            name: "money heist",
        }));


    } else {
        res.end(JSON.stringify({
            error: "page not found"
        }));
    }
});

const hostname = '127.0.0.1'
const port = 3000
server.listen(port, hostname, () => {
    console.log(`server running at ${hostname}:${port} `);
})
