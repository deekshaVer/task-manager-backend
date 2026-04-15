import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Task {
  @Prop({ required: true })
  declare title: string;

  @Prop({ default: false })
  declare completed: boolean;

  @Prop({ required: true })
  declare userId: string;

  @Prop()
  declare dueDate?: Date;

  @Prop()
  declare projectId: string;

  @Prop({ enum: ['low', 'medium', 'high'], default: 'low' })
  declare priority: 'low' | 'medium' | 'high';

  @Prop({ default: 0 })
  declare order: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
