import React from 'react';
import { Layout as LayoutAntd } from 'antd';

// COMPONENTS
import { Header } from '../header/header';
import { Sider } from '../sider/sider';
import { Content } from '../content/content';
import { Footer } from '../footer/footer';

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutAntd className="layout-container">
      <Sider />
      <LayoutAntd>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </LayoutAntd>
    </LayoutAntd>
  );
};
