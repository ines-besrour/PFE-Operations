import { Student } from 'src/Domains/student.schema';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type AvenantDocument = HydratedDocument<avenant>;
@Schema()
export class avenant {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student' , nullable: true})

  student: Student;
}

export const AvenantSchema = SchemaFactory.createForClass(avenant);