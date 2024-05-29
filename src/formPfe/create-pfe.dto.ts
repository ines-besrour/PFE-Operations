import { IsString, IsDate, IsMongoId } from 'class-validator';
import mongoose from 'mongoose';
import { Entreprise } from 'src/Domains/entreprise.schema';
import { Student } from 'src/Domains/student.schema';

export class CreatePfeDto {
  @IsString()
  sujet: string;

  @IsDate()
  dateDebut: Date;

  @IsDate()
  dateFin: Date;

  @IsString()
  sessionDeSoutenance: string;

  @IsMongoId()
  student:  mongoose.Types.ObjectId ;

  @IsMongoId()
  entreprise:  mongoose.Types.ObjectId ;
}

