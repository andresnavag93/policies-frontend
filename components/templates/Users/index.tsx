import* as React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Table, Space, PageHeader, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { User } from 'interfaces/user';

export const UsersTemplate:React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns: ColumnsType<User> = [
    {
      title: 'Tipo de Documento',
      dataIndex: 'document_type',
      render: (_, record) => record.document_type.name,
    },
    {
      title: 'Documento',
      dataIndex: 'document',
      render: (_, record) => record.document,
    },
    {
      title: 'Razon Social',
      dataIndex: 'razon_social',
      render: (_, record) => record.razon_social,
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      render: (_, record) => record.name,
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      render: (_, record) => record.lastname,
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      render: (_, record) => record.email,
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => renderActions(_, record),
    },
  ];
  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);

  useEffect(() => {
    void getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get('clients/', headerAuthorization(token));
      const {
        data: { data: usersData },
      } = response;
      for (let i in usersData) {
        if (!usersData[i].razon_social){
          usersData[i].razon_social='Persona Natural';
        }
      }
      setLoading(false);
      setUsers(usersData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const renderActions = (_, record) => (
    <Space size="middle">
      <Link href="/users/[userId]?see=true" as={`/users/${record.id}?see=true`}>
        Ver
      </Link>
      <Link href="/users/[userId]" as={`/users/${record.id}`}>
        Editar
      </Link>
    </Space>
  );

  return (
    <>
      <PageHeader
        ghost={false}
        title="Clientes"
        extra={[
          <Link key="1" href="/user">
            <Button>Crear Cliente</Button>
          </Link>,
        ]}
      />
      <Table
        bordered
        loading={loading}
        columns={columns}
        dataSource={users}
        rowKey={(record) => record.id.toString()}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </>
    )
}