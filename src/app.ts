import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoute } from './app/modules/users/user.route';

const app: Application = express();

//parse
app.use(express.json());
app.use(cors());

//application route

app.use('/api', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
