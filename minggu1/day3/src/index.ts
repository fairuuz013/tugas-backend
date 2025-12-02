import express, { type Application, type Request, type Response } from "express";
import dotenv from 'dotenv'


dotenv.config()

const app: Application = express()
const HOST = process.env.HOST
const PORT = process.env.PORT

app.use(express.json())

// let products = [
//     { id: 1, nama: "Laptop Gaming", deskripsi: "Intel i7, RTX 3060", harga: 15000000 },
//     { id: 2, nama: "Keyboard Mekanikal", deskripsi: "Blue Switch, RGB", harga: 800000 },
//     { id: 3, nama: "Mouse Wireless", deskripsi: "Ergonomic, Silent Click", harga: 300000 }
// ];
// // route 1 
// app.get('/', (_req: Request, res: Response) => {
//     res.json({
//         message: "Selamat datang di API E-Commerce!",
//         hari: 3,
//         status: "Server hidup!"
//     })
// })



// // route 2 
// app.get('/api/products', (_req: Request, res: Response) => {
//     res.json({
//         status: true,
//         jumlah: products.length,
//         data: products
//     })

// })

// // route 3
// app.get('/api/products/:id', (req: Request, res: Response) => {
//     if (!req.params.id) {
//         res.json({
//             status: false,
//             message: "Parameter ngga ada wok"
//         });
//         return;
//     }

//     const id = parseInt(req.params.id!);
//     const product = products.find(p => p.id === id);

//     if (!product) {
//         res.json({
//             status: false,
//             message: "Product tidak ditemukan"
//         });

//     }

//     res.json({
//         status: true,
//         data: product
//     });
// });

// // route ke 4
// app.get('/api/search', (req: Request, res: Response) => {
//     const { name, max_price, min_price } = req.query;

//     let result = products;

//     if (name) {
//         result = result.filter(p =>
//             p.nama.toLowerCase().includes((name as string).toLowerCase())
//         );
//     }

//     if (max_price) {
//         result = result.filter(p => p.harga <= Number(max_price));
//     }

//     if (min_price) {
//         result = result.filter(p => p.harga >= Number(min_price))
//     }

//     res.json({
//         success: true,
//         filtered_result: result
//     });
// });


// // route ke 5 men 
// app.post('/api/produts', (req: Request, res: Response) => {
//     const { nama, deskripsi, harga } = req.body


//     const newProduct = {
//         id: products.length + 1,
//         nama,
//         deskripsi,
//         harga
//     }

//     products.push(newProduct);

//     res.status(201).json({
//         success: true,
//         message: "Produk berhasil ditambahkan",
//         data: newProduct
//     });
// });



// // route ke 6

// app.put('/api/products/:id', (req: Request, res: Response) => {
//     const id = parseInt(req.params.id!);
//     const index = products.findIndex(p => p.id === id);

//     if (index === -1) {
//         return res.status(404).json({ success: false, message: "Produk tidak ada" });
//     }
//     products[index] = { ...products[index], ...req.body };

//     res.json({
//         success: true,
//         message: "Produk berhasil diupdate",
//         data: products[index]
//     });
// });



// // 7. ROUTE DELETE – Hapus produk
// app.delete('/api/products/:id', (req: Request, res: Response) => {
//     const id = parseInt(req.params.id!);
//     const index = products.findIndex(p => p.id === id);

//     if (index === -1) {
//         return res.status(404).json({ success: false, message: "Produk tidak ada" });
//     }

//     const deleted = products.splice(index, 1);

//     res.json({
//         success: true,
//         message: "Produk berhasil dihapus",
//         data: deleted[0]
//     });
// });



// tugas day 3
let songs = [
    { id: 1, nama: "odoriko", singer: "vaundy", release: 2023 },
    { id: 2, nama: "supernatural", singer: "newjeans", release: 2024 },
    { id: 3, nama: "birds of a feather", singer: "billieeilish", release: 2024 }
]


// route 1 tugas day 3
app.get('/api/songs', (_req: Request, res: Response) => {
    res.json({

        status: true,
        jumlah: songs.length,
        data: songs
    })
})


// route 2 
app.get('/api/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    const song = songs.find(s => s.id === id);

    if (!song) {
        return res.status(404).json({
            success: false,
            message: "Songs is not found"
        });
    }

    res.json({
        success: true,
        data: song
    })
})


// tugas 3
app.get('/api/search', (req: Request, res: Response) => {
    const { name, sig } = req.query

    let result = songs;

    if (name) {
        result = result.filter(s =>
            s.nama.toLowerCase().includes((name as string).toLowerCase())
        )
    }
    if (sig) {
        result = result.filter(s =>
            s.singer.toLowerCase().trim() === String(sig).toLowerCase().trim()
        );

    }

    res.json({
        success: true,
        filtered_result: result
    });
})

// tugas 4
app.post('/api/songs', (req: Request, res: Response) => {
    const { nama, singer, release } = req.body;

    const newSong = {
        id: songs.length + 1,
        nama,
        singer,
        release: Number(release)
    };
    songs.push(newSong);

    res.status(201).json({
        success: true,
        messge: "lagu baru telah di tambah",
        data: newSong
    });
});


//soal 5

app.put('/api/songs/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id!)
    const index = songs.findIndex(s => s.id === id );

    if ( index === -1 ) {
        return res.status(404).json({success: false, message: "lagu tidak ada bro"})
    }

     songs [index] = { ...songs[index], ...req.body };


     res.json({ 
        success: true,
        message: "berasil update lagu",
        data: songs[index]
     });
});



// tugas nomer 6

app.delete('/api/songs/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    const index = songs.findIndex(s => s.id === id);

    
    if (index === -1) {
        return res.status(404).json({ success: false, message: "lagu tidak ada " });
    }
    const deleted = songs.splice(index, 1)
    res.json({
    success: true,
    message: "lagu berhasil dihapus",
    data: deleted[0]
      });
});





app.listen(PORT, () => {
    console.log(`Server running at ${HOST}: ${PORT}`);
})