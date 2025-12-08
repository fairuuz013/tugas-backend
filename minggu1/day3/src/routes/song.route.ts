import { Router } from "express";
import { create, getAll, getById, remove, search, update } from "../controller/song.controller";
import { createSongValidation, getSongByIdValidation, validate } from  "../middleware/song.validasion"

const router = Router()

// router 2
router.get('/', getAll)


// router 3
router.get('/search', search)


// tugas 4
router.get('/:id', validate(getSongByIdValidation), getById)

// tugas 5
router.post('/', validate(createSongValidation), create );


//soal 6
router.put('/:id', update);



// tugas nomer 7
router.delete('/:id', remove  );




export default router