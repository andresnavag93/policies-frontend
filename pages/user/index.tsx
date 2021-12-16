import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import moment from 'moment';

// COMPONENTS
import { UserForm } from 'components/userForm/userForm';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { User as UserInterface } from 'interfaces/user';
import { Vehicle } from 'interfaces/vehicle';
import { Address } from 'interfaces/address';

export const User = () => {
  const { back } = useRouter();
  const {
    handleSubmit: handleSubmitUser,
    control: controlUser,
    errors: errorsUser,
    setValue: setValueUser,
  } = useForm<UserInterface>({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      birthday: '',
      document: null,
      cellphone: '',
      razon_social:'',
      occupation: '',
      gender_id: null,
      document_type_id: null,
      civil_status_id: null,
      agent_id: null,
    },
    mode: 'onChange',
  });
  const {
    handleSubmit: handleSubmitVehicle,
    control: controlVehicle,
    trigger: triggerVehicle,
    errors: errorsVehicle,
    setValue: setValueVehicle,
  } = useForm<Vehicle>({
    defaultValues: {
      client_id: null,
      policy_id: null,
      brand: '',
      model: '',
      year: null,
      civi: '',
      plate: '',
      version: '',
      serial: '',
      doors_no: null,
      pasajeros: '',
      type: '',
      rate_width_coverage: null,
      rate_total_lost: null,
      sum_assured: null,
    },
    mode: 'onChange',
  });

  const {
    handleSubmit: handleSubmitAddress,
    control: controlAddress,
    trigger: triggerAddress,
    errors: errorsAddress,
    setValue: setValueAddress,
  } = useForm<Address>({
    defaultValues: {
      client_id: null,
      state_id: null,
      line_1: '',
      city: '',
    },
    mode: 'onChange',
  });

  const [alreadyPostUser, setAlreadyPostUser] = useState(null);
  const [alreadyPostAddress, setAlreadyPostAddress] = useState(null);
  const [alreadyPostVehicle, setAlreadyPostVehicle] = useState(null);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);

  useEffect(() => {
    if (alreadyPostUser) {
      handleSubmitVehicle(onSubmitVehicle)();
      handleSubmitAddress(onSubmitAddress)();
    }
  }, [alreadyPostUser]);

  useEffect(() => {
    if (alreadyPostVehicle && alreadyPostAddress) {
      Modal.success({
        content: 'El cliente fue creado satisfactoriamente',
        onOk: () => back(),
      });
    }
  }, [alreadyPostVehicle, alreadyPostAddress]);

  const onSubmitUser = (data: UserInterface) => {
    verifyInputs(data);
  };

  const onSubmitVehicle = (data: Vehicle) => {
    postVehicle(data);
  };

  const onSubmitAddress = (data: Address) => {
    postAddress(data);
  };

  const verifyInputs = async (data: UserInterface) => {
    const resultVehicle = await triggerVehicle([
      'plate',
      'model',
      'serial',
      'year',
      'doors_no',
      'brand',
    ]);
    const resultAddress = await triggerAddress(['line_1', 'state_id', 'city']);
    if (resultVehicle && resultAddress) {
      data.birthday = moment(new Date(data.birthday)).format('YYYY-MM-DD');
      let payload = data;
      setLoadingResponse(true);
      postUser(payload);
    }
  };

  const postUser = async (payload) => {
    try {
      const response = await axiosInstance.post('clients/', payload, headerAuthorization(token));
      const {
        data: { data: resp },
      } = response;
      setAlreadyPostUser(resp.id);
    } catch (err) {
      handleErrors(err, dispatch);
      setLoadingResponse(false);
    }
  };

  const postVehicle = async (payload) => {
    try {
      const response = await axiosInstance.post(
        `vehicles/clients/${alreadyPostUser}/`,
        payload,
        headerAuthorization(token),
      );
      const {
        data: { data: resp },
      } = response;
      setAlreadyPostVehicle(resp.id);
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoadingResponse(false);
  };

  const postAddress = async (payload) => {
    try {
      const response = await axiosInstance.post(
        `addresses/clients/${alreadyPostUser}/`,
        payload,
        headerAuthorization(token),
      );
      const {
        data: { data: resp },
      } = response;
      setAlreadyPostAddress(resp.id);
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoadingResponse(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitUser(onSubmitUser)();
  };

  return (
    <UserForm
      controlUser={controlUser}
      controlVehicle={controlVehicle}
      controlAddress={controlAddress}
      onSubmit={handleSubmit}
      buttonText="Crear Cliente"
      loadingResponse={loadingResponse}
      errorsUser={errorsUser}
      errorsVehicle={errorsVehicle}
      errorsAddress={errorsAddress}
      setValueUser={setValueUser}
      setValueVehicle={setValueVehicle}
      setValueAddress={setValueAddress}
    />
  );
};

export default User;
