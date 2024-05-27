import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EntrepriseDocument = HydratedDocument<Entreprise>;
@Schema()
export class Entreprise {

  @Prop()
  nomEntreprise: string;

  @Prop()
  pays: string;

  @Prop()
  contact: string;

  @Prop()
  encadrant: string;

  @Prop()
  adresseEmailEncadrant: string;
}
export const EntrepriseSchema = SchemaFactory.createForClass(Entreprise);