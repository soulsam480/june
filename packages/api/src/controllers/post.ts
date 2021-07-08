import Post, { PostSchema } from '../models/post';
import User from '../models/user';
import Notification from '../models/notification';
import { extend } from 'lodash';
import { cloudinary } from '../utils/cloudinary';
import { NextFunction, Response } from 'express';
import { JuneHandler, JuneRequest } from '../utils/types';

// middleware
export const findPostById = async (
  req: JuneRequest,
  res: Response,
  next: NextFunction,
  postId: string,
) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).send({
        message: 'could not find the post',
      });
    }

    req.post = post;
    return next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getJunePosts: JuneHandler = async (req, res) => {
  try {
    const junePosts = await Post.find()
      .populate('comments')
      .populate({ path: 'user', select: ['username', 'profile_photo'] })
      .populate({
        path: 'comments.commentedBy',
        select: ['username', 'profile_photo'],
      })
      .sort({ _id: -1 })
      .limit(8);
    res.json(junePosts);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// create post
export const uploadPost: JuneHandler = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).send('User not found !');

    const fileStr = req.body.photo;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'june_gallary',
    });

    const post = await new Post({
      user: req.userId,
      caption: req.body.caption,
      photo: uploadResponse.url,
      public_id: uploadResponse.public_id,
    });
    // saving post to post DB
    const savedPost = await post.save();

    // saving post to user DB
    user.posts.unshift(savedPost._id);
    await user.save();

    res.json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong', message: error.message });
  }
};

// update posts
export const updateCaption: JuneHandler = async (req, res) => {
  try {
    let post = req.post;
    const changedCaption = req.body.editedCaption;

    post = extend(post, changedCaption);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const likePost: JuneHandler = async (req, res) => {
  try {
    const post = req.post;
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).send('User not found !');

    post.likes.unshift(req.userId as string);
    user.likedPosts.unshift(post._id);
    post.save();
    user.save();

    // adding notification
    if (post.user.toString() !== (req.userId as string).toString()) {
      const notification = new Notification({
        notificationMessage: `${user.username} liked your post`,
        user: post.user,
        post: post._id,
        actionBy: req.userId,
      });

      await notification.save();
    }

    res.json(post);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const unlikePost: JuneHandler = async (req, res) => {
  try {
    const post = req.post;
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).send('User not found !');

    const userIndex = post.likes.findIndex(
      (like) => like.toString() == (req.userId as any).toString(),
    );
    const postIndex = user.likedPosts.findIndex((like) => like.toString() == post._id.toString());

    post.likes.splice(userIndex, 1);
    user.likedPosts.splice(postIndex, 1);

    post.save();
    user.save();
    // delete notification
    // Notification.deleteOne({ actionBy: req.userId, post: post._id });

    res.json(post);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const commentPosts: JuneHandler = async (req, res) => {
  try {
    const post = req.post;
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).send('User not found !');

    const userComment = req.body.comment;
    post.comments.unshift({
      comment: userComment,
      commentedBy: req.userId as string,
    });
    user.commentedPosts.unshift(post._id);

    // adding notification
    if (post.user.toString() !== (req.userId as string).toString()) {
      const notification = new Notification({
        notificationMessage: `${user.username} commented on your post : ${userComment}`,
        user: post.user,
        post: post._id,
        actionBy: req.userId,
      });

      await notification.save();
    }

    post.save();
    user.save();
    res.json(post);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      message: "Can't update comment",
    });
  }
};

export const unCommentPosts: JuneHandler = async (req, res) => {
  try {
    const post = req.post;
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).send('User not found !');

    const userIndex = post.comments.findIndex(
      (item) => (item._id as string).toString() == req.params.commentId.toString(),
    );
    const postIndex = user.commentedPosts.findIndex(
      (item) => item.toString() == post._id.toString(),
    );

    post.comments.splice(userIndex, 1);
    user.commentedPosts.splice(postIndex, 1);

    post.save();
    user.save();

    res.json(post);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// delete post
export const deletePost: JuneHandler = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).send('User not found !');

    const post = req.post;
    const filteredUser = user.posts.filter(
      (item) => post._id.toString() !== (item as any as PostSchema)._id.toString(),
    );
    const removedPost = await post.remove();
    if (removedPost === undefined) {
      return res.status(400).json({
        message: "post didn't delete",
      });
    }
    // deleting from cloudinary DB
    cloudinary.uploader.destroy(post.public_id);

    user.posts = filteredUser;

    // deleteting post from user DB
    const savedUser = await user.save();

    if (savedUser === undefined) {
      res.status(400).json({
        message: 'post did not delete from the user DB',
      });
    }
    res.json({
      message: 'post deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
