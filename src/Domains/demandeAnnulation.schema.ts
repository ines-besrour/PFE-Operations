import { Student } from 'src/Domains/student.schema';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type DemandeAnnulationDocument = HydratedDocument<demandeAnnulation>;
@Schema()
export class demandeAnnulation {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student' , nullable: true})
  student: Student;
}

export const DemandeAnnulationSchema = SchemaFactory.createForClass(demandeAnnulation);