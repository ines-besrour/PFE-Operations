import { IsString, IsDate, IsMongoId } from 'class-validator';
import mongoose from 'mongoose';

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
  student: mongoose.Types.ObjectId;

  @IsMongoId()
  entreprise: mongoose.Types.ObjectId;
}
