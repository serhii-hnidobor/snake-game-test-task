import { GameFrame } from '@/components/client';
import { gameRecordsApi } from '@/services';
import { GameRecordData } from '@/common';

const Main = async () => {
  let gameRecords: GameRecordData[] | null;

  try {
    const { data: gameRecordsData } = await gameRecordsApi.getAll();
    gameRecords = gameRecordsData;
  } catch {
    gameRecords = null;
  }

  return (
    <div className="App">
      <GameFrame gameRecords={gameRecords} />
    </div>
  );
};

export default Main;
