import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 4000;
import { postRouter } from './routes/post';
import { getJunePosts } from './controllers/post';
import { userRouter } from './routes/user';

function main() {
  // middlewares
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use('/api', userRouter);
  app.use('/api/post', postRouter);
  app.get('/api/juneposts', getJunePosts as any);

  // mongoose connection
  mongoose
    .connect(process.env.URI as string, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    })
    .then(() => console.log('DB connected !'))
    .catch((err) => console.log(err));

  // routes

  // listen
  app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
  });
}

main();
