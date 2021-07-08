import User from '../models/user';
import Notification from '../models/notification';
import { sign, verify } from 'jsonwebtoken';
import { extend } from 'lodash';
import { cloudinary } from '../utils/cloudinary';
import { JuneHandler, JuneRequest } from 'src/utils/types';
import { NextFunction, Response } from 'express';

// middleware
export const isAuthenticatedToken = (req: JuneRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader && typeof authHeader !== 'string') {
    return res.status(400).json({
      message: 'no token found!',
    });
  }
  try {
    const accessToken = (req.headers['authorization'] as string).split(' ')[1];
    const { userId } = <{ userId: string }>(
      verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
    );
    req.userId = userId;
    return next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: 'token cannot be verified',
    });
  }
};

export const getPersonByUserName = async (
  req: JuneRequest,
  res: Response,
  next: NextFunction,
  personUsername: string,
) => {
  try {
    const person = await User.find({
      username: personUsername,
    });
    req.personId = person[0]._id;
    return next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// get notifications
export const getNotificationsById: JuneHandler = async (req, res) => {
  try {
    const userNotifications = await Notification.find({
      user: req.userId,
    })
      .populate({ path: 'user', select: ['username', 'profile_photo'] })
      .populate({ path: 'actionBy', select: ['username', 'profile_photo'] })
      .sort({ _id: -1 });

    res.json(userNotifications);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getPerson: JuneHandler = async (req, res) => {
  try {
    const person = await User.findById(req.personId).populate({
      path: 'posts',
      populate: {
        path: 'comments.commentedBy',
        select: ['username', 'profile_photo'],
      },
    });
    return res.json(person);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// read
export const getUser: JuneHandler = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: 'posts',
      populate: {
        path: 'comments.commentedBy',
        select: ['username', 'profile_photo'],
      },
    });
    if (!user) return res.status(400).send('User not found !');

    const { _id, name, username, email, posts, followers, followings, bio, profile_photo } = user;
    const userDetails = {
      _id,
      name,
      username,
      email,
      posts,
      followers,
      followings,
      bio,
      profile_photo,
    };
    return res.json(userDetails);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllUsers: JuneHandler = async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.json(users);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// create
export const signup: JuneHandler = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    const notification = new Notification({
      notificationMessage: `Welcome aboard ${user.name}`,
      user: user._id,
    });
    notification.save();
    const { _id, name, username, email, posts, followers, followings, bio, profile_photo } =
      savedUser;
    const userDetails = {
      _id,
      name,
      username,
      email,
      posts,
      followers,
      followings,
      bio,
      profile_photo,
    };
    return res.json(userDetails);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const signin: JuneHandler = async (req, res) => {
  try {
    const user = req.body;
    const { username, password } = user;

    await User.findOne({ username })
      .populate('posts')
      .exec((err: any, userData) => {
        if (err || !userData) {
          return res.status(400).json({
            message: 'user does not exists!',
          });
        }

        if (!userData.authenticate(password)) {
          return res.status(401).json({
            message: 'please enter the correct password!',
          });
        }

        const accessToken = sign(
          { userId: userData._id },
          process.env.ACCESS_TOKEN_SECRET as string,
          {
            expiresIn: '7d',
          },
        );
        const refreshToken = sign(
          { userId: userData._id },
          process.env.REFRESH_TOKEN_SECRET as string,
          {
            expiresIn: '7d',
          },
        );

        const { _id, name, username, email, posts, followers, followings, bio, profile_photo } =
          userData;
        const userDetails = {
          _id,
          name,
          username,
          email,
          posts,
          followers,
          followings,
          bio,
          profile_photo,
        };
        return res.json({ userDetails, accessToken, refreshToken });
      });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const createAccessToken: JuneHandler = (req, res) => {
  if (!req.headers['refresh-token'] && typeof req.headers['refresh-token'] !== 'string') {
    return res.status(401).json({
      message: 'No refresh tokens found',
    });
  }
  try {
    const oldRefreshToken = (req.headers['refresh-token'] as string).split(' ')[1];
    const { userId } = <{ userId: string }>(
      verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET as string)
    );

    const refreshToken = sign({ userId: userId }, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: '7d',
    });
    const accessToken = sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: '15m',
    });
    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(401).json({
      message: 'refresh token cannot be verified! please check it again.',
    });
  }
};

//Update
export const updateUser: JuneHandler = async (req, res) => {
  try {
    let updatedUser = req.body;
    let user = await User.findById(req.userId).populate('posts');
    updatedUser = await extend(user, updatedUser);

    updatedUser.save((err: any, updatedUser: any) => {
      if (err) {
        return res.status(400).json({
          message: "User didn't update",
        });
      }
      res.send(updatedUser);
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const setUserProfilePhoto: JuneHandler = async (req, res) => {
  try {
    let user = await User.findById(req.userId).populate('posts');
    if (!user) return res.status(400).send('User not found !');

    const fileStr = req.body.photo;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'june_gallary',
    });
    user.profile_photo = uploadResponse.public_id;
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updatePersonFollowers: JuneHandler = async (req, res) => {
  try {
    let person = await User.findById(req.personId).populate('posts');
    if (!person) return res.status(400).send('User not found !');

    let user = await User.findById(req.userId);
    if (!user) return res.status(400).send('User not found !');

    person.followers.unshift(req.userId as string);
    user.followings.unshift(req.personId as string);

    const updatedPerson = await person.save();
    await user.save();

    const notification = new Notification({
      notificationMessage: `${user.username} started following you.`,
      user: person._id,
      actionBy: user._id,
    });

    await notification.save();

    res.json(updatedPerson);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const UnfollowPerson: JuneHandler = async (req, res) => {
  try {
    let person = await User.findById(req.personId).populate('posts');
    if (!person) return res.status(400).send('User not found !');

    let user = await User.findById(req.userId);
    if (!user) return res.status(400).send('User not found !');

    const userIndex = person.followers.findIndex(
      (follower) => follower == (req.userId as string).toString(),
    );
    const personIndex = user.followings.findIndex(
      (following) => following == (req.personId as string).toString(),
    );

    person.followers.splice(userIndex, 1);
    user.followings.splice(personIndex, 1);

    const updatedPerson = await person.save();
    await user.save();

    res.json(updatedPerson);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// delete
export const deleteUser: JuneHandler = async (req, res) => {
  try {
    let user = await User.findById(req.userId);
    if (!user) return res.status(400).send('User not found !');

    user.deleteOne((err: any, user: any) => {
      if (err) {
        return res.status(400).json({
          message: "user didn't delete!",
        });
      }
      res.json({
        message: `user ${user.name} deleted successfully`,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
