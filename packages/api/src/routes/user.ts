import express from 'express';
const userRouter = express.Router();

import {
  signin,
  signup,
  getUser,
  isAuthenticatedToken,
  updateUser,
  deleteUser,
  createAccessToken,
  getPerson,
  getPersonByUserName,
  updatePersonFollowers,
  UnfollowPerson,
  getAllUsers,
  setUserProfilePhoto,
  getNotificationsById,
} from '../controllers/user';

// middlewware
userRouter.param('personUsername', getPersonByUserName);

userRouter.post('/signin', signin).post('/signup', signup).get('/token/refresh', createAccessToken);

userRouter
  .use(isAuthenticatedToken)

  .get('/person/:personUsername', getPerson)
  .get('/user', getUser)
  .get('/allusers', getAllUsers)
  .get('/usernotifications', getNotificationsById)

  .post('/user/update', updateUser)
  .post('/user/update/profilephoto', setUserProfilePhoto)

  .patch('/person/:personUsername/updateFollowers', updatePersonFollowers)
  .patch('/person/:personUsername/unfollow', UnfollowPerson)

  .delete('/user/delete', deleteUser);

export { userRouter };
