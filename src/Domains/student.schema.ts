import { Professor } from './professor.schema';
import { Section } from './section.enum';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;
@Schema()
export class Student {

  @Prop({ unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  firstName: string;

  @Prop({ length: 8 })
  cin: string;

  @Prop({ length: 8 })
  phone: string;

  @Prop({ type: 'date' })
  dateOfBirth: Date;

  @Prop({ length: 7 })
  inscriptionNumber: string;

  @Prop({ type: 'enum', enum: Section }) // Add section column
  section: Section; // Each student belongs to one section

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Professor' })
  supervisor: mongoose.Types.ObjectId | Professor;
}
export  const StudentSchema = SchemaFactory.createForClass(Student);