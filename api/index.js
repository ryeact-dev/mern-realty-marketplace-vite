import expres from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

// Routes
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

// Database connection
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = expres();

app.use(expres.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(3000, () => {
  console.log('Server is running on port: 3000');
});
