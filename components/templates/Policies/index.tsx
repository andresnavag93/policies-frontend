import* as React from 'react'
import { useContext, useEffect, useState } from 'react';
import { Table, Space, PageHeader, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import moment from 'moment';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { Policy } from 'interfaces/policy';

export const PoliciesTemplate:React.FC = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns: ColumnsType<Policy> = [
    {
      title: 'Código',
      dataIndex: 'code',
    },
    {
      title: 'Título',
      dataIndex: 'title',
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      render: (value) => moment(value).format('YYYY-MM-DD'),
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
    void getPolicies();
  }, []);

  const getPolicies = async () => {
    try {
      const response = await axiosInstance.get('policies/', headerAuthorization(token));
      const {
        data: { data: policiesData },
      } = response;
      setLoading(false);
      setPolicies(policiesData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const renderActions = (_, record) => (
    <Space size="middle">
      <Link href="/policies/[policyId]?see=true" as={`/policies/${record._id}?see=true`}>
        Ver
      </Link>
      <Link href="/policies/[policyId]" as={`/policies/${record._id}`}>
        Editar
      </Link>
    </Space>
  );

  return (
    <>
      <PageHeader
        ghost={false}
        title="Pólizas"
        extra={[
          <Link key="1" href="/policy">
            <Button>Crear Póliza</Button>
          </Link>,
        ]}
      />
      <Table
        bordered
        loading={loading}
        columns={columns}
        dataSource={policies}
        rowKey={(record) => record._id.toString()}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </>
  )
}