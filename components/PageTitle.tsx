import React from 'react';

type PageTitleProps = {
  children: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <h1 className="font-bold tracking-wider text-3xl">
      {children}
    </h1>
  );
}

export default PageTitle;
