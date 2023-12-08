import { container } from 'tsyringe';
import { IStorageProvider } from '../providers/IStorageProvider';
import { S3StorageProvider } from '../providers/aws/storage/S3StorageProvider';
import { IMailProvider } from '../providers/IMailProvider';
import { mailProvider } from '../providers/aws/mail/mailProvider';
import { IUserRepository } from '../repositories/IUserRepository';
import { IUserTokenRepository } from '../repositories/IUserTokenRepository';
import { UserRepository } from '../repositories/prisma/UserRepository';
import { UserTokenRepository } from '../repositories/prisma/UserTokenRepository';


container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
);

container.registerSingleton<IUserTokenRepository>(
    "UserTokenRepository",
    UserTokenRepository 
);

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    S3StorageProvider
);

container.registerInstance<IMailProvider>(
    "MailProvider",
    new mailProvider()
);


