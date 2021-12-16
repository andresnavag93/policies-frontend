import* as React from 'react'
import { useState, useEffect, useContext } from 'react';
// import { PDFDownloadLink } from '@react-pdf/renderer';
import { Table, Space, PageHeader, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import moment from 'moment';

// COMPONENTS
import { PdfReceipt } from 'components/pdfReceipt/pdfReceipt';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { Receipt } from 'interfaces/receipt';

export const ReceiptsTemplate:React.FC = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns: ColumnsType<Receipt> = [
    {
      title: 'Póliza',
      dataIndex: 'policy_code',
    },
    {
      title: 'Número de Recibo',
      dataIndex: 'code',
    },
    {
      title: 'Valido Desde',
      dataIndex: 'valid_from',
      render: (value) => moment(value).format('YYYY-MM-DD'),
    },
    {
      title: 'Valido Hasta',
      dataIndex: 'valid_until',
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
    void getReceipts();
  }, []);

  const getReceipts = async () => {
    try {
      const response = await axiosInstance.get('receipts/', headerAuthorization(token));
      const {
        data: { data: receiptsData },
      } = response;
      setLoading(false);
      setReceipts(receiptsData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const renderActions = (_, record) => (
    <Space size='middle'>
      <Link href='/receipts/[receiptId]?see=true' as={`/receipts/${record._id}?see=true`}>
        Ver
      </Link>
      <Link href='/receipts/[receiptId]' as={`/receipts/${record._id}`}>
        Editar
      </Link>
      {/* <PDFDownloadLink document={<PdfReceipt record={record} token={token} dispatch={dispatch} />} fileName={`${record.code}.pdf`}>
        {({ blob, url, loading, error }) => (loading ? 'Cargando...' : 'Descargar')}
      </PDFDownloadLink> */}
    </Space>
  );

  return (
    <>
      <PageHeader
        ghost={false}
        title='Recibos'
        extra={[
          <Link key='1' href='/receipt'>
            <Button>Crear Recibo</Button>
          </Link>,
        ]}
      />
      <Table
        bordered
        loading={loading}
        columns={columns}
        dataSource={receipts}
        rowKey={(record) => record._id.toString()}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </>
  )
}