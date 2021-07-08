import express from 'express';
const postRouter = express.Router();
import {
  deletePost,
  findPostById,
  uploadPost,
  updateCaption,
  likePost,
  unlikePost,
  commentPosts,
  unCommentPosts,
} from '../controllers/post';

postRouter.param('postId', findPostById);

postRouter
  .post('/upload', uploadPost)
  .post('/comment/:postId', commentPosts)
  .post('/uncomment/:postId/:commentId', unCommentPosts)

  .patch('/update/caption/:postId', updateCaption)
  .patch('/like/:postId', likePost)
  .patch('/unlike/:postId', unlikePost)

  .delete('/delete/:postId', deletePost);

export { postRouter };
