import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

// const port : string|number= process.env.PORT || 3333;

const app = express();
app.set('port', (process.env.PORT || 3333));

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/items', express.static(path.resolve(__dirname, 'assets')));
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(process.env.PORT || 3000, () => {
    console.log('🏃 Running Server');
  });

// app.listen(app.get('port'), function() {
//     console.log('Running Server', app.get('port'));
// });

// app.listen(process.env.PORT || 3000, () => {
//     console.log('Running Server');
// });

