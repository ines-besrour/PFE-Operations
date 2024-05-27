import { Student } from 'src/Domains/student.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FicheDePropositionDocument = FicheDeProposition & Document;

// export type ficheDePropositionDocument = HydratedDocument<ficheDeProposition>;
@Schema()
export class FicheDeProposition {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student' })
  student: Student;

  @Prop()
  fileName: string;
}

export const FicheDePropositionSchema =
  SchemaFactory.createForClass(FicheDeProposition);
