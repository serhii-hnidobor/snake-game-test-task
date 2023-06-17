'use client';

import { useState } from 'react';
import GameBoard from '@/components/client/game-board';
import {
  Apple,
  Cord2D,
  DIAMOND_APPLE_POINT,
  DIAMOND_APPLE_PROBABILITY,
  Direction,
  GAME_FIELD_SIZE,
  GAME_SPEED_MULTIPLIER,
  GameRecordData,
  GOLD_APPLE_POINT,
  GOLD_APPLE_PROBABILITY,
  INITIAL_SNAKE_CORD,
  INITIAL_SNAKE_MOVE_DIRECTION,
  INITIAL_SPEED,
  REGULAR_APPLE_POINT,
} from '@/common';
import useKeyPress from '@/hooks/use-key-press';
import { isEqualCord, rand } from '@/helpers';
import Image from 'next/image';
import Modal from '@/components/client/common/modal';
import NewGameForm from '@/components/client/game-frame/components/new-game-form';
import clone from 'just-clone';
import useDeepCompareEffect from 'use-deep-compare-effect';

import AppleImg from '@/assets/images/apple.webp';
import { createToastNotification } from '@/components/client/common/toast-notification';
import LeaderTable from '@/components/client/game-frame/components/leader-table';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import { gameRecordsApi } from '@/services';
import Button from '@/components/client/common/button';

interface Props {
  gameRecords: GameRecordData[] | null;
}

export default function GameFrame({ gameRecords: gameRecordsInitialData }: Props) {
  const [snakeCords, setSnakeCords] = useState<Cord2D[]>(INITIAL_SNAKE_CORD);

  const [gameRecords, setGameRecords] = useState(gameRecordsInitialData);

  const [appleCord, setAppleCord] = useState<Cord2D>({ x: 2, y: 2 });

  const [moveDirection, setMoveDirection] = useState<Direction>(INITIAL_SNAKE_MOVE_DIRECTION);

  const [isPause, setIsPause] = useState(false);

  const [isGameOver, setIsGameOver] = useState(false);

  const [point, setPoint] = useState(0);

  const [gamerName, setGamerName] = useState<string | null>(null);

  const [appleType, setAppleType] = useState<Apple>(Apple.REGULAR);

  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const [isNeedSaveResult, setIsNeedSaveResult] = useState(false);

  const generateAppleCord = () => {
    let isGeneratedCordOnSnakeBody = false;
    const generatedAppleCord: Cord2D = { x: 0, y: 0 };

    do {
      generatedAppleCord.x = rand(0, GAME_FIELD_SIZE - 1);
      generatedAppleCord.y = rand(0, GAME_FIELD_SIZE - 1);

      isGeneratedCordOnSnakeBody = snakeCords.some(
        (snakeCord) => snakeCord.x === generatedAppleCord.x && snakeCord.y === generatedAppleCord.y,
      );
    } while (isGeneratedCordOnSnakeBody);

    return generatedAppleCord;
  };

  const isCordInGameField = (cord: Cord2D) =>
    cord.x >= 0 && cord.x < GAME_FIELD_SIZE && cord.y >= 0 && cord.y < GAME_FIELD_SIZE;

  const generateAppleType = () => {
    const randNumber = rand(0, 100);

    if (randNumber % DIAMOND_APPLE_PROBABILITY === 0) {
      setAppleType(Apple.DIAMOND);
    } else if (randNumber % GOLD_APPLE_PROBABILITY === 0) {
      setAppleType(Apple.GOLD);
    } else {
      setAppleType(Apple.REGULAR);
    }
  };

  const updateCord = (cord: Cord2D) => {
    const updatedCord = { ...cord };

    switch (moveDirection) {
      case Direction.RIGHT: {
        updatedCord.y++;
        break;
      }
      case Direction.LEFT: {
        updatedCord.y--;
        break;
      }
      case Direction.DOWN: {
        updatedCord.x++;
        break;
      }
      case Direction.UP: {
        updatedCord.x--;
        break;
      }
    }

    return updatedCord;
  };

  const isSelfCollision = (snakeBodyCords: Cord2D[]) => {
    const snakeBodyCordsCopy = clone(snakeBodyCords);

    const head = snakeBodyCordsCopy.pop();

    if (!head) {
      return false;
    }

    for (const cord of snakeBodyCordsCopy) {
      if (isEqualCord(cord, head)) {
        return true;
      }
    }

    return false;
  };

  const handleCheckSpeedIncrease = (newPoint: number) => {
    if (!newPoint) {
      return;
    }

    const multiplier = Math.trunc(newPoint / 50);

    if (multiplier === 0) {
      return;
    }

    const newSpeed = speed - (speed - speed * GAME_SPEED_MULTIPLIER);

    if (multiplier * 50 === newPoint && newSpeed >= 100) {
      setSpeed(newSpeed);
    }
  };

  const handleEatApple = () => {
    switch (appleType) {
      case Apple.REGULAR: {
        setPoint((prevValue) => prevValue + REGULAR_APPLE_POINT);
        handleCheckSpeedIncrease(point + REGULAR_APPLE_POINT);
        return;
      }
      case Apple.GOLD: {
        setPoint((prevValue) => prevValue + GOLD_APPLE_POINT);
        handleCheckSpeedIncrease(point + GOLD_APPLE_POINT);
        return;
      }
      case Apple.DIAMOND: {
        setPoint((prevValue) => prevValue + DIAMOND_APPLE_POINT);
        handleCheckSpeedIncrease(point + DIAMOND_APPLE_POINT);
        return;
      }
      default: {
        const check = appleType;
        throw check;
      }
    }
  };

  const handleStartNewGame = () => {
    setSnakeCords(INITIAL_SNAKE_CORD);

    setAppleCord(generateAppleCord());

    setMoveDirection(INITIAL_SNAKE_MOVE_DIRECTION);

    setPoint(0);

    setSpeed(INITIAL_SPEED);

    setAppleType(Apple.REGULAR);

    setIsGameOver(false);
  };

  const gameRender = () => {
    if (isPause || isGameOver) {
      return;
    }

    const newSnakeCords = snakeCords.map((cord) => ({ ...cord }));

    const prevSnakeTail = newSnakeCords.shift();

    const newHead = updateCord({ ...newSnakeCords[newSnakeCords.length - 1] });

    newSnakeCords.push(newHead);

    if (isEqualCord(appleCord, newHead) && prevSnakeTail) {
      newSnakeCords.unshift(prevSnakeTail);
      handleEatApple();
      setAppleCord(generateAppleCord());
      generateAppleType();
    }

    if (isSelfCollision(newSnakeCords) || !isCordInGameField(newHead)) {
      setIsNeedSaveResult(true);
      return;
    }

    setSnakeCords(newSnakeCords);
  };

  useDeepCompareEffect(() => {
    if (!gameRecords || isGameOver || !isNeedSaveResult) {
      return;
    }

    gameRecordsApi
      .create({
        player_name: gamerName || 'unknown player',
        score: point,
      })
      .then(({ data: newRecord }) => {
        setGameRecords((prevValue) => prevValue && prevValue.concat(newRecord));
      })
      .catch(() => createToastNotification({ type: 'error', message: 'failed save your result', title: 'error' }))
      .finally(() => {
        setIsGameOver(true);
        setIsNeedSaveResult(false);
      });
  }, [isGameOver, isNeedSaveResult, gameRecords, gamerName, point]);

  useDeepCompareEffect(() => {
    if (!gamerName) {
      return;
    }

    const interval = setInterval(gameRender, speed);

    return () => {
      clearInterval(interval);
    };
  }, [gameRender, speed]);

  if (!gameRecords) {
    createToastNotification({ type: 'error', title: 'error', message: 'cannot load game record' });
  }

  const changeDirection = (newDirection: Direction) => {
    if (newDirection === Direction.UP && moveDirection === Direction.DOWN) {
      return;
    }

    if (newDirection === Direction.DOWN && moveDirection === Direction.UP) {
      return;
    }

    if (newDirection === Direction.LEFT && moveDirection === Direction.RIGHT) {
      return;
    }

    if (newDirection === Direction.RIGHT && moveDirection === Direction.LEFT) {
      return;
    }

    setMoveDirection(newDirection);
  };

  const handleChangeDirection = (key: 'ArrowUp' | 'ArrowLeft' | 'ArrowRight' | 'ArrowDown') => {
    switch (key) {
      case 'ArrowUp': {
        changeDirection(Direction.UP);
        break;
      }
      case 'ArrowLeft': {
        changeDirection(Direction.LEFT);
        break;
      }
      case 'ArrowDown': {
        changeDirection(Direction.DOWN);
        break;
      }
      case 'ArrowRight': {
        changeDirection(Direction.RIGHT);
        break;
      }
      default: {
        const check: never = key;
        throw check;
      }
    }
  };

  useKeyPress({ keyArray: ['ArrowUp'], callback: () => handleChangeDirection('ArrowUp') });
  useKeyPress({ keyArray: ['ArrowLeft'], callback: () => handleChangeDirection('ArrowLeft') });
  useKeyPress({ keyArray: ['ArrowDown'], callback: () => handleChangeDirection('ArrowDown') });
  useKeyPress({ keyArray: ['ArrowRight'], callback: () => handleChangeDirection('ArrowRight') });

  if (!gamerName) {
    return (
      <Modal title={'start game'} isNeedModal={true}>
        <NewGameForm handleSubmit={(newName) => setGamerName(newName)} />
      </Modal>
    );
  }

  if (isGameOver && gameRecords) {
    return (
      <Modal title={'result'} isNeedModal={isGameOver} handleClose={handleStartNewGame}>
        <LeaderTable gameRecords={gameRecords} curGamerPoint={point} />
      </Modal>
    );
  }

  return (
    <>
      <div className={'max-w-[500px] mx-auto'}>
        <div className={'h-[80px] bg-[#367f26] flex justify-between p-4'}>
          <div className={'flex gap-[3px] items-center'}>
            <Image src={AppleImg} alt={'apple illustration'} width={35} height={35} />
            <p>{point}</p>
          </div>
          <Button
            aria-label={'pause button'}
            className={'px-8 py-4 flex justify-center items-center'}
            onClick={() => setIsPause((prev) => !prev)}
          >
            {isPause ? 'continue' : 'pause'}
          </Button>
        </div>
        <GameBoard
          appleType={appleType}
          rowNum={GAME_FIELD_SIZE}
          colNum={GAME_FIELD_SIZE}
          snakeCords={snakeCords}
          appleCord={appleCord}
        />
      </div>
      <ToastContainer />
    </>
  );
}
