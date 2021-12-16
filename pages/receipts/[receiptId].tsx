import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import moment from 'moment';

// COMPONENTS
import { ReceiptForm } from 'components/receiptForm/receiptForm';
import { Loading } from 'components/loading/loading';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { Receipt as ReceiptInterface } from 'interfaces/receipt';

export const Receipt = () => {
  const { query, back } = useRouter();
  const { handleSubmit, control, reset, setValue, errors, getValues } = useForm<ReceiptInterface>({
    defaultValues: {
      _id: '',
      issue_date: '',
      policy_id: null,
      client_id: null,
      vehicle_id: null,
      code: null,
      observations: '',
      receipt_number: null,
      prima: null,
      prima_payment_frecuency: null,
      valid_from: '',
      valid_until: '',
      total_sum_insured: null,
      agent_bonus: null,
      deducible: null,
      next_payment_date: '',
      policy_code: null,
    },
  });
  const [loading, setLoading] = useState(true);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [record, setRecord] = useState(null);
  const [coverages, setCoverages] = useState([]);

  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);

  useEffect(() => {
    if (query.receiptId) {
      getReceipt();
      getCoverages();
    }
  }, [query.receiptId]);

  const getReceipt = async () => {
    try {
      const response = await axiosInstance.get(
        `receipts/${query.receiptId}/`,
        headerAuthorization(token),
      );
      const {
        data: { data: ReceiptData },
      } = response;
      let receipt = { ...ReceiptData };
      receipt.issue_date = moment(ReceiptData.issue_date, 'YYYY-MM-DD');
      receipt.valid_from = moment(ReceiptData.valid_from, 'YYYY-MM-DD');
      receipt.valid_until = moment(ReceiptData.valid_until, 'YYYY-MM-DD');
      //receipt.next_payment_date = moment(ReceiptData.next_payment_date, 'YYYY-MM-DD');
      setRecord(receipt);
      reset(receipt);
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoading(false);
  };

  const onSubmit = (data: ReceiptInterface) => {
    data.issue_date = moment(new Date(data.issue_date)).format('YYYY-MM-DD');
    data.valid_from = moment(new Date(data.valid_from)).format('YYYY-MM-DD');
    data.valid_until = moment(new Date(data.valid_until)).format('YYYY-MM-DD');
    //data.valid_until = moment(new Date(data.valid_until)).format('YYYY-MM-DD');
    //@ts-ignore
    data.agent_bonus = parseInt(data.agent_bonus);
    setLoadingResponse(true);
    putReceipt(data);
  };

  const putReceipt = async (payload) => {
    try {
      const response = await axiosInstance.put(
        `receipts/${query.receiptId}`,
        payload,
        headerAuthorization(token),
      );
      const {
        data: { data: resp },
      } = response;

      Modal.success({
        content: 'El recibo fue actualizado satisfactoriamente',
        onOk: () => back(),
      });
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoadingResponse(false);
  };

  const getCoverages = async () => {
    try {
      const response = await axiosInstance.get(
        `coverages/receipts/${query.receiptId}`,
        headerAuthorization(token),
      );
      const {
        data: { data: CoverageData },
      } = response;
      setCoverages(CoverageData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <ReceiptForm
      record={record}
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={handleSubmit(onSubmit)}
      buttonText="Editar Recibo"
      setValue={setValue}
      loadingResponse={loadingResponse}
      errors={errors}
      onlyView={query.see === 'true'}
      getValues={getValues}
      policyNotEditable={true}
      coverages={coverages}
      setCoverages={setCoverages}
      //handleSubmit={handleSubmit}
    />
  );
};

export default Receipt;
