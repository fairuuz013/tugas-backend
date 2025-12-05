import type { Request, Response } from "express"
import { createSong, deleteSong, getAllSongs, getSongById, searchSong, updateSong } from "../services/song.services"
import { errorResponse, successResponse } from "../utils/response"


// route 1
export const getAll = (_req: Request, res: Response) => {
    const { songs, total } = getAllSongs()
    successResponse(
        res,
        "anjay ada lagu nya",
        {
            jumlah: total,
            data: songs
        }
    )
}


// route 2 
export const getById = (req: Request, res: Response) => {
    if (!req.params.id) {
        return errorResponse(
            res,
            "No parameter sir"
        )
    }
    const song = getSongById(req.params.id)

    successResponse(
        res, "Music found men",
        song
    )
}


// route 3 
export const search =  (req: Request, res: Response) => {
    const { nama, sig } = req.query

    const result = searchSong(nama?.toString(),
    sig?.toString())

    successResponse(
        res,
        'Songs found',
        result
    )

}


// route 4
export const create = (req: Request, res: Response) => {
    const { nama, singer, release } = req.body;

    const songs = createSong(nama,
        singer, release
    )

    
    successResponse(
        res,
        "Lagu berasil di tambah",
        songs,
        null,
        201
    )
}


//  route  5
export const update = (req: Request, res: Response) => {
   
    const song = updateSong(req.params.id!, req.body,)
    
    
  successResponse(
    res, 
    "update song",
    song
  )
}


// route 6
export const remove = (req: Request, res: Response) => {
    
    const deleted = deleteSong(req.params.id!)
    
    successResponse(
        res,
        "songs delete",
        deleted
    )
}




