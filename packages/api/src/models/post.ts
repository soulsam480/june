import { Schema, model, Document } from 'mongoose';

interface Comment {
  _id?: string;
  comment: string;
  commentedBy: string;
}

export class PostSchema extends Document {
  user: string;
  caption: string;
  photo: string;
  public_id: string;
  likes: string[];
  comments: Comment[];
}

const postSchema = new Schema<PostSchema>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  caption: {
    type: String,
    default: '',
  },
  photo: {
    type: String,
    default: '',
  },
  public_id: {
    type: String,
    default: '',
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      comment: String,
      commentedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
});

export default model<PostSchema>('Post', postSchema);
