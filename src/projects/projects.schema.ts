import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Project {
  @Prop({ required: true })
  declare name: string;

  @Prop({ required: true })
  declare userId: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
