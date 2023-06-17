import { Apple } from '@/common';
import AppleImg from '@/assets/images/apple.webp';
import Image from 'next/image';

interface Props {
  isSnake: boolean;
  isDarkCell: boolean;
  isAppleCell: boolean;
  appleType: Apple;
}

function getAppleFilter(appleType: Apple) {
  switch (appleType) {
    case Apple.REGULAR: {
      return undefined;
    }
    case Apple.GOLD: {
      return 'hue-rotate(45deg)';
    }
    case Apple.DIAMOND: {
      return 'brightness(150%) hue-rotate(180deg)';
    }
    default: {
      throw appleType;
    }
  }
}

export default function GameBoardCell({ isSnake, isDarkCell, isAppleCell, appleType }: Props) {
  return (
    <div
      className={`w-full h-full ${isSnake ? 'bg-yellow' : ''} ${
        isDarkCell ? 'bg-[#70de23]' : 'bg-[#8feb35]'
      } pt-[100%] relative`}
    >
      {isAppleCell && (
        <Image
          className={'absolute top-0 left-0'}
          src={AppleImg}
          alt={'apple'}
          style={{
            filter: getAppleFilter(appleType),
          }}
        />
      )}
    </div>
  );
}
