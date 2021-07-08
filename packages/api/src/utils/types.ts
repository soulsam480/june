import { Request, Response } from 'express';
import { PostSchema } from 'src/models/post';
import { Document } from 'mongoose';

export interface JuneRequest extends Request {
  userId?: string;
  post: PostSchema & Document<any, any>;
  personId?: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
    post: PostSchema & Document<any, any>;
    personId?: string;
  }
}

export type JuneHandler = (req: JuneRequest, res: Response) => any;
