import fs from 'fs';
import path from 'path';

import UploadConfig from '@config/upload';
import IUploadProvider from '../model/IUploadProvider';

class DiskStorageProvider implements IUploadProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(UploadConfig.tmpFolder, file),
      path.resolve(UploadConfig.uploads, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await fs.promises.unlink(path.resolve(UploadConfig.uploads, file));
  }
}

export default DiskStorageProvider;
