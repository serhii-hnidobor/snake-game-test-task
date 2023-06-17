import { GameRecordData } from '../model';

export type AddGameRecordRequestDto = Omit<GameRecordData, 'id'>;
