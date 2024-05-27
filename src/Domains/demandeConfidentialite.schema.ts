import { Student } from 'src/Domains/student.schema';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type DemandeConfidentialiteDocument = HydratedDocument<demandeConfidentialite>;
@Schema()
export class demandeConfidentialite {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student'})
  student: Student;
}

export const DemandeConfidentialiteSchema = SchemaFactory.createForClass(demandeConfidentialite);