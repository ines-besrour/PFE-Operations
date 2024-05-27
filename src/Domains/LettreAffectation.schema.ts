import { Student } from 'src/Domains/student.schema';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type LettreAffectationDocument = HydratedDocument<LettreAffectation>;
@Schema()
export class LettreAffectation {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student'})
  student: Student;
}

export const LettreAffectationSchema = SchemaFactory.createForClass(LettreAffectation);