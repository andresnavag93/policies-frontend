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
import { Sinister } from 'interfaces/sinister';

export const SinistersTemplate:React.FC = () => {

  const [sinisters, setSinisters] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns: ColumnsType<Sinister> = [
    {
      title: 'Código',
      dataIndex: 'code',
    },
    {
      title: 'Recibo',
      dataIndex: 'receipt_code',
    },
    {
      title: 'Estado de Aprobación',
      dataIndex: 'estado_de_aprobacion',
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => renderActions(_, record),
    },
  ];
  const {
    //@ts-ignore
    state: { token ,role_id},
   
    //@ts-ignore
    dispatch,
  } = useContext(store);

  useEffect(() => {
    void getSinisters();
  }, []);

  const getSinisters = async () => {
    try {
      const response = await axiosInstance.get('sinisters/', headerAuthorization(token));
      const {
        data: { data: sinistersData },
      } = response;
      for (let i in sinistersData) {
        if (sinistersData[i].estado_de_aprobacion==1){
          sinistersData[i].estado_de_aprobacion='Por Revisar';
        }else if(sinistersData[i].estado_de_aprobacion==2){
          sinistersData[i].estado_de_aprobacion='Aprobado';
        }
        else if(sinistersData[i].estado_de_aprobacion==3){
          sinistersData[i].estado_de_aprobacion='Rechazado';
        }
      }
      setLoading(false);
      setSinisters(sinistersData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const renderActions = (_, record) => (
    <Space size="middle">


      <Link href="/sinisters/[sinisterId]?see=true" as={`/sinisters/${record._id}?see=true`}>
        Ver
      </Link>

      {role_id === 3 && (
        <Link href="/sinisters/[sinisterId]" as={`/sinisters/${record._id}`}>
        Editar
      </Link>
        )}

    </Space>
  );

  return (
    <>
      <PageHeader
        ghost={false}
        title="Siniestros"
        extra={[
          <Link key="1" href="/sinister">
            <Button>Crear Siniestro</Button>
          </Link>,
        ]}
      />
      <Table
        bordered
        loading={loading}
        columns={columns}
        dataSource={sinisters}
        rowKey={(record) => record._id.toString()}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </>
  )
}
