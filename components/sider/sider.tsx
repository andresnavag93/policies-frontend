import React, { useState, useContext, useEffect, FC } from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import {
  HomeOutlined,
  UserOutlined,
  FileOutlined,
  ProfileOutlined,
  SolutionOutlined,
  FolderOutlined,
  LogoutOutlined,
  CarOutlined ,
} from '@ant-design/icons';
import { useRouter } from 'next/router';

// CONTEXT
import { store } from 'context/contextProvider';
import { TYPES } from 'context/types';
import Cookies from "universal-cookie";
const cookies = new Cookies()
const { Sider: SiderAntd } = Layout;
const { CLEAR_STORE } = TYPES;

export const Sider:FC = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => setCollapsed(!collapsed);
  const {
    //@ts-ignore
    state: { role_id },
    //@ts-ignore
    dispatch,
  } = useContext(store);
  const items = [
    { key: '1', path: '/' },
    {
      key: '2',
      path: '/agents',
    },
    {
      key: '3',
      path: '/users',
    },
    {
      key: '4',
      path: '/policies',
    },
    {
      key: '5',
      path: '/receipts',
    },
    {
      key: '6',
      path: '/sinisters',
    },
    {
      key: '7',
      path: '/vehicles',
    },
  ];
  const foundItem = items.find((_item) => router.pathname === _item.path);
  const [selectedKey, setSelectedKey] = useState(foundItem ? foundItem.key : '/');

  const logout = () => {
    dispatch({ type: CLEAR_STORE, payload: { token: null, role_id: null } });
    cookies.remove('jwt')
    cookies.remove('role_id')
  };

  useEffect(() => {
    const foundItem = items.find((_item) => router.pathname === _item.path);
    if (foundItem) {
      setSelectedKey(foundItem.key);
    } else {
      if (router.pathname === '/agent') {
        setSelectedKey('2');
      } else if (router.pathname === '/user') {
        setSelectedKey('3');
      } else if (router.pathname === '/policy') {
        setSelectedKey('4');
      } else if (router.pathname === '/receipt') {
        setSelectedKey('5');
      } else if (router.pathname === '/sinister') {
        setSelectedKey('6');
      }else if (router.pathname === '/vehicles') {
        setSelectedKey('7');
      }
      
    }
  }, [router.pathname]);

  return (
    <SiderAntd collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu
        theme="dark"
        defaultSelectedKeys={[selectedKey]}
        selectedKeys={[selectedKey]}
        mode="inline"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link href="/">Home</Link>
        </Menu.Item>
        {role_id === 3 && (
          <Menu.Item key="2" icon={<ProfileOutlined />}>
            <Link href="/agents">Agentes</Link>
          </Menu.Item>
        )}

        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link href="/users">Clientes</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<CarOutlined />}>
          <Link href="/vehicles">Vehiculos</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SolutionOutlined />}>
          <Link href="/policies">Pólizas</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<FileOutlined />}>
          <Link href="/receipts">Recibos</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<FolderOutlined />}>
          <Link href="/sinisters">Siniestros</Link>
        </Menu.Item>
        
        <Menu.Item key="8" icon={<LogoutOutlined />} onClick={logout}>
          Cerrar Sesión
        </Menu.Item>
      </Menu>
    </SiderAntd>
  );
};

export default Sider;
