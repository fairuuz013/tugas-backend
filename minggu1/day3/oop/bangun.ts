abstract class Shape {
    abstract hitungLuas(): number
    abstract hitungKeliling(): number

    deskripsi() {
        return `Luas: ${this.hitungLuas()}, keliling: ${this.hitungKeliling()}`
    }
}

export class Parsegi extends Shape {
    constructor(private sisi: number) {
        super()
    }

    hitungLuas(): number {
        return (this.sisi * this.sisi)
    }


    hitungKeliling(): number {
        return this.sisi * 4
    }
    
}

export class Lingkaran extends Shape {
    constructor(private radius: number) {
        super()
    }

    hitungLuas(): number {
        return Math.PI * this.radius ** 2;
    }

    hitungKeliling(): number {
        return 2 * Math.PI * Math.PI * this.radius
    }
}


const persegi = new Parsegi(5)
console.log(persegi.deskripsi);
console.log(persegi.hitungKeliling);
console.log(persegi.hitungLuas);
