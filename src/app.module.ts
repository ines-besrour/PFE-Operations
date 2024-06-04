import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PfeModule } from './formPfe/pfe.module';
import { FileModule } from './form2/file/file.module';
import { env } from 'process'; 
@Module({
  imports: [
    MongooseModule.forRoot(env.MONGODB_URI),
    PfeModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
