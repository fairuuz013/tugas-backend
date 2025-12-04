// DATA DAN PROPERTI SONGS
export interface Songs {
    id: number,
    nama: string,
    singer: string,
    release: number
}

export let songs: Songs[]  =  [
    { id: 1, nama: "odoriko", singer: "vaundy", release: 2023 },
    { id: 2, nama: "supernatural", singer: "newjeans", release: 2024 },
    { id: 3, nama: "birds of a feather", singer: "billieeilish", release: 2024 }
]
