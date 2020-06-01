import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploads: path.resolve(tmpFolder, 'uploads'),
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const randomName = crypto.randomBytes(10).toString('HEX');
      const filename = `${randomName}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
