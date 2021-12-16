import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import moment from 'moment';

// COMPONENTS
import { AgentForm } from 'components/agentForm/agentForm';
import { Loading } from 'components/loading/loading';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { Agent as AgentInterface } from 'interfaces/agent';

export const Agent = () => {
  const { query, back } = useRouter();
  const { handleSubmit, control, reset, setValue, errors, getValues } = useForm<AgentInterface>({
    defaultValues: {
        name: '',
        lastname: '',
        email: '',
        bono: null,
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        user: {
          name: '',
          lastname: ''
        }
      },
    mode: 'onChange',
  });
  const [loading, setLoading] = useState(true);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [userId, setUserId] = useState(null);
  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);

  useEffect(() => {
    if (query.agentId) {
      getPolicy();
    }
  }, [query.id]);

  const getPolicy = async () => {
    try {
      const response = await axiosInstance.get(
        `auth/${query.agentId}`,
        headerAuthorization(token),
      );
      const {
        data: { data: policyData },
      } = response;
      policyData.emailConfirm=policyData.email
      policyData.password=''
      policyData.passwordConfirm=''
      setUserId(policyData.user.id)
      let policy = { ...policyData };
      
      reset(policy);
      
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoading(false);
  };

  const onSubmit = (data: AgentInterface) => {
    
    //@ts-ignore
    
    setLoadingResponse(true);
    putPolicy(data);
  };



  const putPolicy = async (payload) => {
    setLoadingResponse(false);
    payload.user.id=userId
    if (payload.email !== payload.emailConfirm) {
      Modal.error({
        content: 'Los correos no coinciden',
      });
    } else if (payload.password !== payload.passwordConfirm) {
      Modal.error({
        content: 'Las contraseñas no coinciden',
      });
    } else if (payload.user.bono> 100) {
        Modal.error({
          content: 'El bono no puede ser mayor 100',
        });}
    
    else {
      setLoadingResponse(true);

    try {
    setLoadingResponse(false);
      const response = await axiosInstance.put(
        `auth/${query.agentId}/`,
        payload,
        headerAuthorization(token),
      );
      const {
        data: { data: resp },
        
      } = response;
      console.log(payload)
      Modal.success({
        content: 'El agente fue actualizado satisfactoriamente',
        onOk: () => back(),
      });
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoadingResponse(false);
  }};

  if (loading) {
    return <Loading />;
  }
  return (
    <AgentForm
    control={control}
    onSubmit={handleSubmit(onSubmit)}
    buttonText="Editar Agente"
    loadingResponse={loadingResponse}
    errors={errors}
    onlyView={query.see === 'true'}
    
    />
  );
};

export default Agent;
