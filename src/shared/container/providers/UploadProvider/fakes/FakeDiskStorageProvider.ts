import IUploadProvider from '../model/IUploadProvider';

class FakeDiskStorageProvider implements IUploadProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const index = this.storage.findIndex(
      (fileStoraged) => fileStoraged === file,
    );

    this.storage.splice(index, 1);
  }
}

export default FakeDiskStorageProvider;
