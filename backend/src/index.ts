import express from 'express';
import routes from '@routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3035;

app.use(cors());
app.use(bodyParser({ limit: '50mb' }));
routes(app);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.info(`server run on port ${PORT}`));
