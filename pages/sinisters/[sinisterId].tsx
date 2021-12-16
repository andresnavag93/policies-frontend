import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import moment from 'moment';

// COMPONENTS
import { SinisterForm2 } from 'components/sinisterForm2/sinisterForm2';
import { Loading } from 'components/loading/loading';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { Sinister as SinisterInterface } from 'interfaces/sinister';

export const Sinister = () => {
  const { query, back } = useRouter();
  const { handleSubmit, control, reset, setValue, errors, register, getValues } = useForm<SinisterInterface>({
    defaultValues: {
      _id: '',
      observations: '',
      estado_de_aprobacion: '',
      monto: null,
      date: '',
      code: null,
      receipt_id: '',
      receipt_code: null,
      policy_code: null,
    },
  });
  const [loading, setLoading] = useState(true);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [image_url, setImage_Url] = useState("");

  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);

  useEffect(() => {
    if (query.sinisterId) {
      getSinister();
    }
  }, [query.sinisterId]);

  const getSinister = async () => {
    try {
      const response = await axiosInstance.get(
        `sinisters/${query.sinisterId}`,
        headerAuthorization(token),
      );
      const {
        data: { data: sinisterData },
      } = response;
      let sinister = { ...sinisterData };
      sinister.date = moment(sinisterData.date, 'YYYY-MM-DD');
      setImage_Url(sinister.image_url);
      reset(sinister);
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoading(false);
  };

  const onSubmit = (data: SinisterInterface) => {
    console.log(data.image_url)
    data.date = moment(new Date(data.date)).format('YYYY-MM-DD');
    //@ts-ignore
    data.monto = parseInt(data.monto);
    setLoadingResponse(true);
    putSinister(data);
  };

  const putSinister = async (payload) => {
    try {
      const response = await axiosInstance.put(
        `sinisters/${query.sinisterId}`,
        payload,
        headerAuthorization(token),
      );
      const {
        data: { data: resp },
      } = response;
      Modal.success({
        content: 'El siniestro fue actualizado satisfactoriamente',
        onOk: () => back(),
      });
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoadingResponse(false);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <SinisterForm2
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      buttonText="Editar Siniestro"
      setValue={setValue}
      loadingResponse={loadingResponse}
      errors={errors}
      onlyView={query.see === 'true'}
      register={register}
      getValues={getValues}
      image_url={image_url}
    />
  );
};

export default Sinister;
