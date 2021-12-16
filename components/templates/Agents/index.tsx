import* as React from 'react'
import { useContext, useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Agent } from 'interfaces/agent';
import { store } from 'context/contextProvider';
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { Button, PageHeader, Table ,Space} from 'antd';
import Link from 'next/link';

export const AgentsTemplate:React.FC = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns: ColumnsType<Agent> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      render: (_, record) => record.user?.name,
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      render: (_, record) => record.user?.lastname,
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      render: (_, record) => record.email,
    },
    {
      title: 'Bono del agente',
      dataIndex: 'bono',
      render: (_, record) => record.user?.bono,
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
   void getAgents();
  }, []);

  const getAgents = async () => {
    try {
      const response = await axiosInstance.get('auth/agents/', headerAuthorization(token));
      const {
        data: { data: agentsData },
      } = response;
      console.log(response)
      setLoading(false);
      setAgents(agentsData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  }

  const renderActions = (_, record) => (
    <Space size="middle">
      <Link href="/agents/[agentId]?see=true" as={`/agents/${record.id}?see=true`}>
        Ver
      </Link>
      <Link href="/agents/[agentId]" as={`/agents/${record.id}`}>
        Editar
      </Link>
    </Space>
  );
  


  return (
    <>
      <PageHeader
        ghost={false}
        title="Agentes"
        extra={[
          <Link key="1" href="/agent">
            <Button>Crear Agente</Button>
          </Link>,
        ]}
      />
      <Table
        bordered
        loading={loading}
        columns={columns}
        dataSource={agents}
        rowKey={(record) => record.id.toString()}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </>
  )
}