import { appendFileSync } from "fs";


export class CSV {
    
    code: string;
    name: string;
    
    constructor(code = "", name ="") {
        this.code = code;
        this.name = name;
    }

    saveAsCSV() {
        const csv = `${this.name},${this.code}\n`;
        try {
            return appendFileSync("./code.csv", csv);
        } catch (err) {
            return console.error(err);
        }
    }
}