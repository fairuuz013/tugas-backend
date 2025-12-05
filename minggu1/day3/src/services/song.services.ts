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
    return song

}

export const searchSong = (name?: string,
    sig?: string) => {
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
    return result
}


export const createSong = (nama: string,
    singer: string, release: number) => {

    const newSong: Songs = {
        id: songs.length + 1,
        nama,
        singer,
        release
    };
    songs.push(newSong);

    return songs
}


export const updateSong = (id: string, data: any) => {
    const numId = parseInt(id)
    const index = songs.findIndex(s => s.id === numId)

    if (index === -1) {
        throw new Error("lagu tidak di temukan")
    }
    songs[index] = { ...songs[index], ...data }
    return songs[index]
}



export const deleteSong = (id: string) => {
    const numId = parseInt(id);
    const index = songs.findIndex(s => s.id === numId);


    if (index === -1) {
        throw new Error, "Musik success delete"
    }
    const deleted = songs.splice(index, 1)

    return deleted
}