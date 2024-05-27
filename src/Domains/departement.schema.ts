import { Professor } from './professor.schema';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Department {

  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Professor'})
  director: Professor;
}

export const DepartementSchema = SchemaFactory.createForClass(Department);