import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { PaymentGatewayEnums, SubscriptionStatus } from 'src/constants';

export type OrderDocument = Subscription & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Subscription {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true, type: String })
  plan: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ default: SubscriptionStatus.INACTIVE })
  status: SubscriptionStatus;

  @Prop({ type: String, required: true })
  reference: string;

  @Prop({ enum: PaymentGatewayEnums, required: true })
  paymentGateway: PaymentGatewayEnums;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
