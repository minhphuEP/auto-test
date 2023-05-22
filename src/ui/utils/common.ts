import * as xlsx from "xlsx";
import * as path from 'path';

export function readFileExcel(pathToFile: string, sheetName: string) { 
    const excelFile = path.resolve(__dirname, pathToFile);
    const workbook = xlsx.readFile(excelFile);
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    const obj: any = {
        data: data,
    };
    return obj;
}