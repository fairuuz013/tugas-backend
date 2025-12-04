import { Router } from "express";
import { create, getAll, getById, search } from "../controller/song.controller";



const router = Router()

router.get('/', getAll)

// router 2
router.get('/api/songs', getAll)


// router 3
router.get('/api/songs/:id', validate(getProductByIdValidation), getById)


// tugas 4
router.get('/api/search', search)


// tugas 5
router.post('/api/songs', validate(createProductValidation), create );


//soal 6
router.put('/api/songs/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id!)
    const index = songs.findIndex(s => s.id === id);

    if (index === -1) {
        throw new Error, "Gagal update"
    }

    songs[index] = { ...songs[index], ...req.body };


  successResponse(
    res, 
    "update song",
    songs
  )
});



// tugas nomer 7
router.delete('/api/songs/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    const index = songs.findIndex(s => s.id === id);


    if (index === -1) {
        return res.status(404).json({ success: false, message: "lagu tidak ada " });
    }
    const deleted = songs.splice(index, 1)
    successResponse(
        res,
        "songs delete",
        deleted
    )
});

