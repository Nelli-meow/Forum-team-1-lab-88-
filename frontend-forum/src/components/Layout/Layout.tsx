import React, { PropsWithChildren } from 'react';
import Header from '../UI/Header/Header.tsx';

const Layout:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;