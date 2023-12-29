import expres from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Routes
import userRouter from './routes/user.route.js';

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = expres();

app.use('/api/user', userRouter);

app.listen(3000, () => {
  console.log('Server is running on port: 3000');
});
