import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import moment from 'moment';

// COMPONENTS
import { PolicyForm } from 'components/policyForm/policyForm';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { Policy as PolicyInterface } from 'interfaces/policy';

export const Policy = () => {
  const router = useRouter();
  const { back } = useRouter();
  const { handleSubmit, control, setValue, errors, getValues } = useForm<PolicyInterface>({
    defaultValues: {
      type: '',
      title: '',
      code: null,
      date: '',
      enabled: false,
      renewable: false,
      vehicle_value: null,
      vehicle_id: null,
      client_id: null,
      observations: '',
      coverage_form_type: '',
      receipt_id: '',
      receipt_code: null,
      agent_id: null,
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

  const onSubmit = (data: PolicyInterface, secondButton = null) => {
    data.date = moment(new Date(data.date)).format('YYYY-MM-DD');
    //@ts-ignore
    data.vehicle_value = parseInt(data.vehicle_value);
    //@ts-ignore
    data.agent_id = parseInt(data.agent_id);
    setLoadingResponse(true);
    postPolicy(data, secondButton);
  };

  const postPolicy = async (payload, secondButton) => {
    const { client_id, vehicle_id } = payload;
    try {
    const response = await axiosInstance.post('policies/', payload, headerAuthorization(token));
      const {
        data: { data: resp },
      } = response;
      const responseVehicle = await axiosInstance.put(
        `vehicles/${vehicle_id}/clients/${client_id}/`,
        { policy_id: resp },
        headerAuthorization(token),
      );
      const {
        data: { data: respVehicle },
      } = responseVehicle;

      Modal.success({
        content: 'La póliza fue creada satisfactoriamente',
        onOk: () => ( router.push('/receipt')),
      });
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoadingResponse(false);
  };

  // router.push('/policies')

  return (
    <PolicyForm
      control={control}
      onSubmit={onSubmit}
      buttonText="Crear Póliza y Generar Recibo"
      
      setValue={setValue}
      loadingResponse={loadingResponse}
      errors={errors}
      handleSubmit={handleSubmit}
    />
  );
};

export default Policy;
