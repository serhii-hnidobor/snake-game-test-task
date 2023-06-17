'use client';

import { HTMLAttributes, FormEvent, useState } from 'react';
import Button from '@/components/client/common/button';

interface Props extends HTMLAttributes<HTMLDivElement> {
  handleSubmit: (gamerName: string) => void;
}

export default function NewGameForm({ handleSubmit }: Props) {
  const [gamerName, setGamerName] = useState('');

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(gamerName);
  };

  return (
    <form onSubmit={handleFormSubmit} className={'flex flex-col gap-[10px]'}>
      <input
        placeholder={'name'}
        onChange={(event) => setGamerName(event.target.value)}
        required={true}
        className={'h-10 p-5 border border-black border-solid'}
      />
      <Button className={'h-10'}>Start game</Button>
    </form>
  );
}
