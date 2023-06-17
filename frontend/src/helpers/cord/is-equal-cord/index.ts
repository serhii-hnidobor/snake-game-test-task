import { Cord2D } from '@/common';

export default function isEqualCord(firstCord: Cord2D, secondCord: Cord2D) {
  return firstCord.x === secondCord.x && firstCord.y === secondCord.y;
}
