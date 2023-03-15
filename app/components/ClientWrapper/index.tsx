'use client';

interface Props extends React.PropsWithChildren {}

export default function ClientWrapper({ children }: Props) {

  return (
    <>
      {children}
    </>
  )
}