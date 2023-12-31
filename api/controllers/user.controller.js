import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export function test(req, res) {
  res.json({ msg: 'Hello World!' });
}

export async function updateUserInfo(req, res, next) {
  const { email, password, username, avatar } = req.body;
  const userId = req.params.id;
  let hashedPassword;

  if (req.user.id !== req.params.id)
    return next(errorHandler(403, 'You can update only your own account'));

  if (password) hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username,
          password: hashedPassword,
          email,
          avatar,
        },
      },
      { new: true } // Return the latest user data
    );

    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
}
