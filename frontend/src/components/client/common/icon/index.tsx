'use client';

import { SVGProps } from 'react';
import { IconName } from '@/common';
import { iconBoxVariants, IconBoxVariantType, iconVariants, IconVariantsType } from './cva-variants/cva-variants';

import CloseIcon from '@/assets/icon/close.svg';

import { cx } from 'class-variance-authority';

interface IconProps extends SVGProps<SVGElement> {
  name: IconName;
  intent?: NonNullable<IconBoxVariantType['intent']>;
  fill?: NonNullable<IconVariantsType['fill']>;
  className?: string;
  hoverStroke?: NonNullable<IconVariantsType['hoverStroke']>;
  hoverFill?: NonNullable<IconVariantsType['hoverFill']>;
  stroke?: NonNullable<IconVariantsType['stroke']>;
  strokeWidth?: NonNullable<IconVariantsType['strokeWidth']>;
}

const Icon = ({
  width = '20',
  height = '20',
  intent,
  fill,
  name,
  className,
  stroke,
  strokeWidth,
  hoverStroke,
  hoverFill,
  ...restSvgProps
}: IconProps) => {
  let iconClassName = iconVariants({
    fill,
    stroke,
    intent,
    strokeWidth,
    hoverStroke,
    hoverFill,
  });

  if (className && className.length) {
    iconClassName = cx([className, iconClassName]);
  }

  const iconBoxClassName = iconBoxVariants({ intent });

  switch (name) {
    case IconName.CLOSE: {
      return (
        <span className={iconBoxClassName}>
          <CloseIcon {...restSvgProps} width={width} height={height} className={iconClassName} />
        </span>
      );
    }

    default: {
      const check: never = name;
      throw new Error(check);
    }
  }
};
export { Icon as default, type IconProps };
