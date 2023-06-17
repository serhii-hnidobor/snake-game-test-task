import axios from 'axios';
import {
  AddGameRecordRequestDto,
  AddGameRecordResponseDto,
  ApiPaths,
  GetAllGameRecordsResponseDto,
  ApiRoutes,
} from '@/common';

type Constructor = {
  apiPrefix: string;
};

class GameRecordsApi {
  readonly #apiPrefix: string;

  constructor({ apiPrefix }: Constructor) {
    this.#apiPrefix = apiPrefix;
  }

  public getAll() {
    return axios.get<GetAllGameRecordsResponseDto>(
      `${this.#apiPrefix}${ApiRoutes.GAME_RECORDS}${ApiPaths.GET_ALL_GAME_RECORDS}`,
    );
  }

  public create(data: AddGameRecordRequestDto) {
    return axios.post<AddGameRecordResponseDto>(
      `${this.#apiPrefix}${ApiRoutes.GAME_RECORDS}${ApiPaths.ADD_GAME_RECORD}`,
      data,
    );
  }
}

export { GameRecordsApi };
