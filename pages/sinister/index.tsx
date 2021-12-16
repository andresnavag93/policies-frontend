import React, { useState, useContext ,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import moment from 'moment';

// COMPONENTS
import { SinisterForm } from 'components/sinisterForm/sinisterForm';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { Sinister as SinisterInterface } from 'interfaces/sinister';

export const Sinister = () => {
  const { back } = useRouter();
  const [fechaIni, setFechaIni] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const { handleSubmit, control, setValue, errors, register } = useForm<SinisterInterface>({
    defaultValues: {
      _id: '',
      observations: '',
      estado_de_aprobacion: '',
      monto: null,
      date: '',
      code: null,
      receipt_id: '',
      receipt_code: null,
      fechaIni: '',
      fechaFin: '',
      policy_code: null,
      image_url: "test",
    },
    mode: 'onChange',
  });
  const [loadingResponse, setLoadingResponse] = useState(false);
  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);

  const getReceipt = async (index) => {
    try {
      const response = await axiosInstance.get(`receipts/${index}/`, headerAuthorization(token));
      const {
        data: { data: receiptData },
        
      } = response;
      
      setFechaIni(receiptData.valid_from)
      
      setFechaFin(receiptData.valid_until)
      console.log('fecha en recibo')
      console.log(fechaIni)
      console.log(fechaFin)
      setFechaIni(receiptData.valid_from)
      
      setFechaFin(receiptData.valid_until)
      
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const onSubmit = (data: SinisterInterface) => {
    
    //getReceipt(data.receipt_id);
   // getReceipt(data.receipt_id);
    console.log(data)
    
   


    data.date = moment(moment(data.date)).format('YYYY-MM-DD');
    
    //@ts-ignore
    data.monto = parseInt(data.monto);
    
    postSinister(data);
  };

  const postSinister = async (payload) => {
    setLoadingResponse(true)
    //getReceipt(payload.receipt_id);
    //getReceipt(payload.receipt_id);
    const { policy_id } = payload;
    console.log('fechaglobal')
    console.log(fechaIni)
    console.log(fechaFin)
    setLoadingResponse(false);
    
    if (payload.date<payload.fechaIni || payload.date>payload.fechaFin) {
      Modal.error({
        content: 'La fecha seleccionada esta fuera del rango de validez del recibo',
      });
      
    }else{
      setLoadingResponse(true);
      delete payload['fechaIni'];
      delete payload['fechaFin'];
    try {
      const response = await axiosInstance.post('sinisters/', payload, headerAuthorization(token));
      const {
        data: { data: resp },
      } = response;
      Modal.success({
        content: 'El siniestro fue creado satisfactoriamente',
        onOk: () => back(),
      });
    } catch (err) {
      handleErrors(err, dispatch);
    }}
    setLoadingResponse(false);
  };

  return (
    //@ts-ignore
    <SinisterForm
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      buttonText="Crear Siniestro"
      setValue={setValue}
      loadingResponse={loadingResponse}
      errors={errors}
      register={register}
    />
  );
};

export default Sinister;
