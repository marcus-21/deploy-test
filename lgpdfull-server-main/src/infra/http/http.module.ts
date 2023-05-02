import { Module } from '@nestjs/common';
import { DocService } from 'src/app/use-cases/doc.service';
import { DpoService } from 'src/app/use-cases/dpo.service';
import { MappingService } from 'src/app/use-cases/mapping.service';
import { QuizService } from 'src/app/use-cases/quiz.service';
import { SectorService } from 'src/app/use-cases/sector.service';
import { UserService } from 'src/app/use-cases/user.service';
import { AdaptersModule } from '../adapters/adapters.module';
import { BcryptService } from '../adapters/bcrypt.service';
import { GeneratePasswordService } from '../adapters/generate-password.service';
import { NodeMailerService } from '../adapters/nodemailer.service';
import { DatabaseModule } from '../database/database.module';
import { AppController } from './controllers/app.controller';
import { AuthModule } from './controllers/auth/auth.module';
import { DocController } from './controllers/docs.controller';
import { DpoController } from './controllers/dpo.controller';
import { MappingController } from './controllers/mapping.controller';
import { QuizController } from './controllers/quiz.controller';
import { SectorController } from './controllers/sector.controller';
import { UserController } from './controllers/user.controller';

@Module({
    imports:[DatabaseModule, AuthModule, AdaptersModule],
    controllers:[
        AppController,
        DpoController,
        MappingController,
        QuizController,
        SectorController,
        DocController,
        UserController
    ],
    providers: [
        DpoService,
        MappingService,
        DocService,
        QuizService,
        SectorService,
        UserService,
        NodeMailerService
    ]
})
export class HttpModule {}
