import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import moment from 'moment';

// COMPONENTS
import { ReceiptForm } from 'components/receiptForm/receiptForm';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { Receipt as ReceiptInterface } from 'interfaces/receipt';

export const Receipt = () => {
  const router = useRouter();
  const { back } = useRouter();
  const { handleSubmit, control, setValue, errors, getValues } = useForm<ReceiptInterface>({
    defaultValues: {
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
    mode: 'onChange',
  });
  const [coverages, setCoverages] = useState([]);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);

  const onSubmit = (data: ReceiptInterface, secondButton = null) => {
    data.issue_date = moment(new Date(data.issue_date)).format('YYYY-MM-DD');
    data.valid_from = moment(new Date(data.valid_from)).format('YYYY-MM-DD');
    data.valid_until = moment(new Date(data.valid_until)).format('YYYY-MM-DD');
    //data.valid_until = moment(new Date(data.valid_until)).format('YYYY-MM-DD');
    //@ts-ignore
    data.agent_bonus = parseInt(data.agent_bonus);
    setLoadingResponse(true);
    postReceipt(data, secondButton);
  };

  const postReceipt = async (payload, secondButton) => {
    const { policy_id } = payload;
    try {
      const response = await axiosInstance.post('receipts/', payload, headerAuthorization(token));
      const {
        data: { data: resp },
      } = response;

      for (let i = 0; i < coverages.length; i++) {
        postCoverages({ ...coverages[i], receipt_id: resp });
      }

      const responseReceipt = await axiosInstance.get(
        `receipts/${resp}`,
        headerAuthorization(token),
      );
      const {
        data: { data: ReceiptData },
      } = responseReceipt;

      const responsePolicy = await axiosInstance.put(
        `policies/${policy_id}`,
        { receipt_id: resp, receipt_code: ReceiptData.code },
        headerAuthorization(token),
      );

      Modal.success({
        content: 'El recibo fue creado satisfactoriamente',
        onOk: () => (typeof secondButton === 'string' ? router.push('/sinister') : back()),
      });
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoadingResponse(false);
  };

  const postCoverages = async (coverage) => {
    let auxCoverage = { ...coverage };
    delete auxCoverage._id;
    try {
      const response = await axiosInstance.post(
        'coverages',
        auxCoverage,
        headerAuthorization(token),
      );
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoadingResponse(false);
  };

  return (
    <ReceiptForm
      record={null}
      control={control}
      onSubmit={onSubmit}
      //secondButtonText="Crear y Generar Siniestro"
      buttonText="Crear Recibo"
      setValue={setValue}
      loadingResponse={loadingResponse}
      errors={errors}
      getValues={getValues}
      coverages={coverages}
      setCoverages={setCoverages}
      handleSubmit={handleSubmit}
    />
  );
};

export default Receipt;
