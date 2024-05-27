import { Section } from '../enum/section.enum';
import { Student } from './student.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProfessorDocument = HydratedDocument<Professor>;

@Schema()
export class Professor {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop([Section])
  sections: Section[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] })
  students: Student[];
}

export const ProfessorSchema = SchemaFactory.createForClass(Professor);
