import React from 'react';
import { Layout } from 'antd';

const { Content: ContentAntd } = Layout;

export const Content = ({ children }) => {
  return <ContentAntd className="content-container">{children}</ContentAntd>;
};
