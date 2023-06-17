'use client';

import { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { cx } from 'class-variance-authority';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
  title: string;
  isNeedModal: boolean;
  isWide?: boolean;
  handleClose?: VoidFunction;
}

export default function Modal({ children, title, isNeedModal, isWide = false, handleClose }: Props) {
  const modal = (
    <Transition appear show={isNeedModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          if (handleClose) {
            handleClose();
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-[25%]" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto backdrop-brightness-95">
          <div className={'flex min-h-full items-center justify-center overflow-visible p-4 text-center'}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cx(
                  'relative flex w-full flex-col gap-[20px] overflow-visible rounded-2xl bg-[white] md:px-6 py-6 text-left align-middle shadow-xl transition-all',
                  isWide ? 'md:max-w-[548px]' : 'md:max-w-md',
                  'sm:w-screen sm:px-2',
                )}
              >
                <Dialog.Title as="h3" className="text-blue text-2xl font-medium leading-6">
                  {title}
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modal, document.body);
  }

  return modal;
}
