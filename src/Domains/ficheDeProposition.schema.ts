import { Student} from 'src/Domains/student.schema';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ficheDePropositionDocument = HydratedDocument<ficheDeProposition>;
@Schema()
export class ficheDeProposition {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student'})
  student: Student;
}

export const ficheDePropositionSchema = SchemaFactory.createForClass(ficheDeProposition);