import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  declare email: string;

  @Prop({ required: true })
  declare password: string;

 @Prop({ type: String, default: null })
 declare resetToken: string | null;

@Prop({ type: Date, default: null })
declare resetTokenExpiry: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
