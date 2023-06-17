import { ReactNode, HTMLAttributes } from 'react';
import { cx } from 'class-variance-authority';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: 'submit';
}

export default function Button({ children, className, ...restProps }: Props) {
  return (
    <button {...restProps} className={cx('bg-blue rounded-[7px] text-white', className)}>
      {children}
    </button>
  );
}
