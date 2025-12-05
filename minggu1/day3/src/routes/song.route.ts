import { Router } from "express";
import { create, getAll, getById, remove, search, update } from "../controller/song.controller";
import { createSongValidation, getSongByIdValidation, validate } from  "../middleware/song.validasion"

const router = Router()

router.get('/', getAll)

// router 2



// router 3


// tugas 4
router.get('/search', search)

router.get('/:id', validate(getSongByIdValidation), getById)

// tugas 5
router.post('/', validate(createSongValidation), create );


//soal 6
router.put('/:id', update);



// tugas nomer 7
router.delete('/:id', remove  );




export default router