import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import path from 'path';
dotenv.config();
// const __dirname = path.resolve();

// Routes
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';

// Database connection
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

// app.use(express.static(path.join(__dirname, '/client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build/index.html'), (err) => {
//     if (err) res.status(500).send(err);
//   });
// });

app.use(
  cors({
    credentials: true,
    origin: [process.env.LOCALHOST_URL, process.env.VERCEL_URL],
  })
);
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(3000, () => {
  console.log('Server is running on port: 3000');
});
