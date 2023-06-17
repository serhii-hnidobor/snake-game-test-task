import BaseRepository from '@repositories/base';
import { CollectionName } from 'shared/dist';

const gameRecord = new BaseRepository(CollectionName.GAME_RECORD);

export { gameRecord };
