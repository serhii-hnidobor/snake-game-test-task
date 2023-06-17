import { GameRecordData } from '@/common';
import Typography from '@/components/client/common/typography';

interface Props {
  gameRecords: GameRecordData[];
  curGamerPoint: number;
}

export default function LeaderTable({ gameRecords, curGamerPoint }: Props) {
  return (
    <div className={'flex flex-col gap-[10px]'}>
      <Typography as={'h2'} styleName={'h1'}>
        you result {curGamerPoint} point
      </Typography>
      <Typography as={'h3'} styleName={'h2'}>
        Table Leaders
      </Typography>
      <div className={'max-h-[350px] overflow-y-auto'}>
        {gameRecords
          .sort((firstRecord, secondRecord) => secondRecord.score - firstRecord.score)
          .map(({ player_name, score }, index) => (
            <div className={'flex gap-[10px]'} key={`${player_name}-${score}-${index}`}>
              <Typography as={'span'} styleName={'body1Bold'}>
                {index + 1}
              </Typography>
              <Typography as={'span'} styleName={'body1Regular'}>
                {player_name} - {score}
              </Typography>
            </div>
          ))}
      </div>
    </div>
  );
}
