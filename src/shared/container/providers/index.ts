import { container } from 'tsyringe';

import IUploadProvider from './UploadProvider/model/IUploadProvider';
import DiskStorageProvider from './UploadProvider/implementations/DiskStorageProvider';

container.registerSingleton<IUploadProvider>('Upload', DiskStorageProvider);
