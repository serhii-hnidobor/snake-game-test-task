'use client';

import { TypeOptions } from 'react-toastify';
import Typography from '../typography';

type ToastNotificationParams = {
  type?: TypeOptions;
  durationMs?: number;
  title: string;
  message: string;
};
const ToastNotification = ({ title, message }: ToastNotificationParams) => {
  return (
    <div className={'relative flex w-full cursor-pointer opacity-90'}>
      <div className={'inline-block w-full px-[15px] py-2'}>
        <div className={'my-[5px]'}>
          <Typography as={'h2'} className={'text-black'} styleName={'body1Bold'}>
            {title}
          </Typography>
        </div>
        <div className={'my-[5px]'}>
          <Typography as={'span'} className={'text-black'} styleName={'body1Regular'}>
            {message}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export { ToastNotification, type ToastNotificationParams };
