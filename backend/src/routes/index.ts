import { gameRecordRouter } from '@routes/game-record';
import { Express } from 'express';
import { API_PREFIX, ApiRoutes } from '@config';

export default function (app: Express) {
  app.use(`${API_PREFIX}${ApiRoutes.GAME_RECORDS}`, gameRecordRouter);
}
