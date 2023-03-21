import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudiosDocument = HydratedDocument<Studios>;

@Schema({ collection: 'Studios' })
export class Studios {
  @Prop({ required: true, unique: true }) studio_id: number;

  @Prop() name: string;

  @Prop({ set: (value) => (value ? value.slice(0, -15).substring(25) : null) })
  img: string | null;
}

export const StudiosSchema = SchemaFactory.createForClass(Studios);
