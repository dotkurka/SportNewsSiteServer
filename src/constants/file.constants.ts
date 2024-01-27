import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATH = '/uploads/';

const LOG_FILE = '/logs.txt';

const fileFormats = {
    jpeg: 'image/jpeg',
    png: 'image/png',
    jpg: 'image/jpg',
    csv: 'text/csv',
    octetStream: 'application/octet-stream',
    xls: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    msExel: 'application/vnd.ms-excel',
};

const filesExtentions = {
    csv: 'csv',
    xlsx: 'xlsx',
};

const fileMetadata = {
    path: PATH,
    uploadingPath: path.join(__dirname, `../${PATH}`),
    loggerPath: path.join(__dirname, `../../../${LOG_FILE}`),
    maxFileCount: 10,
    maxFileSize: 5000,
    small: { width: 80, heigth: 80, name: 'small' },
    medium: { width: 320, heigth: 320, name: 'medium' },
};

export { filesExtentions, fileMetadata, fileFormats };
