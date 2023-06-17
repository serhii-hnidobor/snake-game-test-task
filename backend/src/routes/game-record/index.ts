import { Router } from 'express';
import { responseMiddleware } from '@middlewares/response';
import { gameRecord } from '@repositories';
import { ApiPaths, GetAllGameRecordsResponseDto } from '@config';
import { validateSchema } from '@middlewares';
import { addGameRecordRequestDtoSchema } from '@config/schemas';

const router = Router();

router.get(
  ApiPaths.GET_ALL_GAME_RECORDS,
  async function (req, res, next) {
    try {
      res.locals.data = await gameRecord.getAll<GetAllGameRecordsResponseDto>();
    } catch (error) {
      res.locals.error = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

router.post(
  ApiPaths.ADD_GAME_RECORD,
  validateSchema(addGameRecordRequestDtoSchema),
  async function (req, res, next) {
    try {
      res.locals.data = await gameRecord.create(req.body);
    } catch (error) {
      res.locals.error = error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

export { router as gameRecordRouter };
