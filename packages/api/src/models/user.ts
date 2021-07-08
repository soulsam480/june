import { Schema, model, Document } from 'mongoose';
import { createHmac } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { PostSchema } from './post';
import { NotificationSchema } from './notification';

export interface UserSchema extends Document {
  _password: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  profile_photo: string;
  likedPosts: (PostSchema | string)[];
  commentedPosts: (PostSchema | string)[];
  followers: (UserSchema | string)[];
  followings: (UserSchema | string)[];
  salt: string;
  encrypted_password: string;
  posts: (PostSchema | string)[];
  notifications: (NotificationSchema | string)[];
  securePassword: (this: UserSchema, ...args: any[]) => any;
  authenticate: (this: UserSchema, ...args: any[]) => any;
}

const userSchema = new Schema<UserSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: '',
    },
    profile_photo: {
      type: String,
      default: 'june_gallary/user_qd3fb7',
    },
    likedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    commentedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    salt: {
      type: String,
    },
    encrypted_password: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Notification',
      },
    ],
  },
  { timestamps: true },
);

userSchema
  .virtual('password')
  .set(function (this: UserSchema, password: string) {
    this._password = password;
    this.salt = uuidv4();
    this.encrypted_password = this.securePassword(password);
  })
  .get(function (this: UserSchema) {
    return this._password;
  });

userSchema.methods = {
  securePassword: function (plainPassword) {
    if (!plainPassword) {
      return '';
    }
    try {
      const secret = this.salt;
      return createHmac('sha256', secret).update(plainPassword).digest('hex');
    } catch (error) {
      return '';
    }
  },
  authenticate: function (plainPassword) {
    return this.encrypted_password === this.securePassword(plainPassword);
  },
};

const UserModel = model<UserSchema>('User', userSchema);

export default UserModel;
