import { Student } from './student.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ConventionDocument = Convention & Document;
@Schema()
export class Convention {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student' })
  student: Student;

  @Prop()
  fileName: string;
}

export const ConventionSchema = SchemaFactory.createForClass(Convention);
