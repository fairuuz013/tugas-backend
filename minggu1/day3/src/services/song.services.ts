import { songs, type Songs } from "../models/song.model"


export const getAllSongs = () => {
    return { songs, total: songs.length }
}


export const getSongById = (id: string) => {
    const numId = parseInt(id)
    const song = songs.find(s => s.id === numId);

    if (!song) {
        throw new Error("Not found song")
    }

}

export const searchSong = (nama?: string,
    sig?: string) => {
    let result = songs;

    if (nama) {
        result = result.filter(s =>
            s.nama.toLowerCase().includes((nama as string).toLowerCase())
        )
    }
    if (sig) {
        result = result.filter(s =>
            s.singer.toLowerCase().trim() === String(sig).toLowerCase().trim()
        );

    }
    return result
}


export const createSong = (nama: string,
    singer: string, release: number ) => {

        const newSong: Songs = {
            id: songs.length + 1,
            nama,
            singer,
            release
        };
        songs.push(newSong);

       return songs 
    }

