import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Student } from "./student.schema";
import { Entreprise } from "./entreprise.schema";

export type PFEDocument = HydratedDocument<PFE>;

@Schema({ collection: 'pfe' })
export class PFE {
  @Prop()
  sujet: string;

  @Prop({ type: 'date' })
  dateDebut: Date;

  @Prop({ type: 'date' })
  dateFin: Date;

  @Prop()
  sessionDeSoutenance: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student'})
  student: mongoose.Types.ObjectId ;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Entreprise' })
  entreprise: mongoose.Types.ObjectId ;
}
export const PFESchema = SchemaFactory.createForClass(PFE);