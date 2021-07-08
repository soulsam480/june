import { Schema, model, Document } from 'mongoose';

export interface NotificationSchema extends Document {
  notificationMessage: string;
  user: string;
  actionBy: string;
  post: string;
}

const notificationSchema = new Schema<NotificationSchema>(
  {
    notificationMessage: {
      type: String,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    actionBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  },
);

export default model<NotificationSchema>('Notification', notificationSchema);
