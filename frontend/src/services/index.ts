import { GameRecordsApi } from './game-records-api.service';
import { API_PREFIX } from '@/common';

const gameRecordsApi = new GameRecordsApi({ apiPrefix: `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_PREFIX}` });

export { gameRecordsApi };
