import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import moment from 'moment';

// COMPONENTS
import { PolicyForm } from 'components/policyForm/policyForm';
import { Loading } from 'components/loading/loading';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { Policy as PolicyInterface } from 'interfaces/policy';

export const Policy = () => {
  const { query, back } = useRouter();
  const { handleSubmit, control, reset, setValue, errors, getValues } = useForm<PolicyInterface>({
    defaultValues: {
      _id: '',
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
      receipt_id: '',
      receipt_code: '',
      agent_id: null,
    },
    mode: 'onChange',
  });
  const [loading, setLoading] = useState(true);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [clientId, setClientId] = useState(null);
  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);

  useEffect(() => {
    if (query.policyId) {
      getPolicy();
    }
  }, [query.policyId]);

  const getPolicy = async () => {
    try {
      const response = await axiosInstance.get(
        `policies/${query.policyId}`,
        headerAuthorization(token),
      );
      const {
        data: { data: policyData },
      } = response;
      let policy = { ...policyData };
      policy.date = moment(policyData.date, 'YYYY-MM-DD');
      reset(policy);
      setClientId(policyData.client_id);
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoading(false);
  };

  const onSubmit = (data: PolicyInterface) => {
    data.date = moment(new Date(data.date)).format('YYYY-MM-DD');
    //@ts-ignore
    data.vehicle_value = parseInt(data.vehicle_value);
    setLoadingResponse(true);
    putPolicy(data);
  };

  const putPolicy = async (payload) => {
    try {
      const response = await axiosInstance.put(
        `policies/${query.policyId}/`,
        payload,
        headerAuthorization(token),
      );
      const {
        data: { data: resp },
      } = response;
      Modal.success({
        content: 'La póliza fue actualizada satisfactoriamente',
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
    <PolicyForm
      control={control}
      onSubmit={onSubmit}
      clientId={clientId}
      buttonText="Editar Póliza"
      setValue={setValue}
      loadingResponse={loadingResponse}
      errors={errors}
      onlyView={query.see === 'true'}
      onlyViewCustom={true}
      handleSubmit={handleSubmit}
    />
  );
};

export default Policy;
