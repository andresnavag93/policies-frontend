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
import { Vehicle } from 'interfaces/vehicle';

export const VehiclesTemplate:React.FC = () => {
  const [vehicles, setVehicles] = useState([]);
  const [clients, setClients] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const columns: ColumnsType<Vehicle> = [
    {
      title: 'Id cliente',
      dataIndex: 'client_id',
      render: (_, record) => record.client_id,
    },
    {
      title: 'Nombre del cliente',
      dataIndex: 'nombre',
      //@ts-ignore
      render: (_, record) => record.nombre,
    },
    {
      title: 'Placa',
      dataIndex: 'plate',
      render: (_, record) => record.plate,
    },
    

    {
      title: 'Serial',
      dataIndex: 'serial',
      render: (_, record) => record.serial,
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
    void getVehicles();
  }, []);

  const getVehicles = async () => {
    try {
      const response = await axiosInstance.get('vehicles/', headerAuthorization(token));
      const {
        data: { data: vehiclesData },
      } = response;
      setLoading(false);
      const clientData=getClients
      for (const property in vehiclesData) {
        
        vehiclesData[property].nombre=(`${vehiclesData[property].client.name} ${vehiclesData[property].client.lastname}`)
       
      }
      
      // for (const property in vehiclesData) {

       
      //   var __FOUND = clientData.(function(post, index) {
      //     if(post.code == vehiclesData[property].client_id)
          
      //       return true;
      //   });

      //   vehiclesData[property].cedula=__FOUND.document
      //   console.log( vehiclesData[property].cedula)
      // }



     
      setVehicles(vehiclesData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const getClients = async () => {
    try {
      const response = await axiosInstance.get('clients/', headerAuthorization(token));
      const {
        data: { data: clientsData },
      } = response;
      setLoading(false);
      setClients(clientsData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };


  const renderActions = (_, record) => (
    <Space size="middle">
      <Link href="/vehicles/[vehicleId]?see=true" as={`/vehicles/${record.id}?see=true`}>
        Ver
      </Link>
      <Link href="/vehicles/[vehcileId]/" as={`/vehicles/${record.id}`}>
        Editar
      </Link>
    </Space>
  );

  return (
    <>
      <PageHeader
        ghost={false}
        title="Vehiculos"
        extra={[
          <Link key="1" href="/vehicle">
            <Button>Crear Vehiculo</Button>
          </Link>,
        ]}
      />
      <Table
        bordered
        loading={loading}
        columns={columns}
        dataSource={vehicles}
        rowKey={(record) => record.id.toString()}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </>
    )
}