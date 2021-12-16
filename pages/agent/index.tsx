import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Modal } from 'antd';

// COMPONENTS
import { AgentForm } from 'components/agentForm/agentForm';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { Agent as AgentInterface } from 'interfaces/agent';

const Agent = () => {
  const { back } = useRouter();
  const { handleSubmit, control, errors } = useForm<AgentInterface>({
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

  const [loadingResponse, setLoadingResponse] = useState(false);
  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);

  const onSubmit = (data: AgentInterface) => {
    postAgent(data);
  };

  const postAgent = async (payload) => {
    setLoadingResponse(false);

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
        const response = await axiosInstance.post(
          'auth/register',
          payload,
          headerAuthorization(token),
        );
        const {
          data: { data: resp },
          
        } = response;
        console.log(response)
        Modal.success({
          content: 'El agente fue creada satisfactoriamente',
          onOk: () => back(),
        });
      } catch (err) {
        handleErrors(err, dispatch);
        setLoadingResponse(false);
      }
    }
  };

  return (
    <AgentForm
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      buttonText="Crear Agente"
      loadingResponse={loadingResponse}
      errors={errors}
    />
  );
};

export default Agent;
