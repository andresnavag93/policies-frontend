import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import moment from 'moment';

// COMPONENTS
import { UserForm } from 'components/userForm/userForm';
import { Loading } from 'components/loading/loading';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { User } from 'interfaces/user';
import { Vehicle } from 'interfaces/vehicle';
import { Address } from 'interfaces/address';

export const UserDetail = () => {
  const { query, back } = useRouter();
  const {
    handleSubmit: handleSubmitUser,
    control: controlUser,
    reset: resetUser,
    errors: errorsUser,
    setValue: setValueUser
  } = useForm<User>({
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
    reset: resetVehicle,
    errors: errorsVehicle,
    setValue: setValueVehicle
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
    reset: resetAddress,
    errors: errorsAddress,
    setValue: setValueAddress
  } = useForm<Address>({
    defaultValues: {
      client_id: null,
      state_id: null,
      line_1: '',
      city: '',
    },
    mode: 'onChange',
  });
  const [loading, setLoading] = useState(true);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [vehicleId, setVehicleId] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [alreadyPutAddress, setAlreadyPutAddress] = useState(null);
  const [alreadyPutVehicle, setAlreadyPutVehicle] = useState(null);
  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);

  useEffect(() => {
    if (query.userId) {
      getUser();
    }
  }, [query.userId]);

  useEffect(() => {
    if (alreadyPutVehicle && alreadyPutAddress) {
      Modal.success({
        content: 'El cliente fue actualizado satisfactoriamente',
        onOk: () => back(),
      });
    }
  }, [alreadyPutVehicle, alreadyPutAddress]);

  const getUser = async () => {
    try {
      const response = await axiosInstance.get(
        `clients/${query.userId}/`,
        headerAuthorization(token),
      );
      const {
        data: { data: userData },
      } = response;
      let user = { ...userData };
      user.birthday = moment(userData.birthday, 'YYYY-MM-DD');
      resetUser(user);
      let vehicle = { ...userData.vehicles[0] };
      setVehicleId(vehicle.id);
      resetVehicle(vehicle);
      let address = { ...userData.addresses[0] };
      setAddressId(address.id);
      resetAddress(address);
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoading(false);
  };

  const onSubmitUser = (data: User) => {
    verifyInputs(data);
  };

  const onSubmitVehicle = (data: Vehicle) => {
    putVehicle(data);
  };

  const onSubmitAddress = (data: Address) => {
    putAddress(data);
  };

  const verifyInputs = async (data: User) => {
    const resultVehicle = await triggerVehicle(['plate', 'model', 'serial', 'year', 'doors_no', 'brand']);
    const resultAddress = await triggerAddress(['line_1', 'state_id', 'city']);
    if (resultVehicle && resultAddress) {
      data.birthday = moment(new Date(data.birthday)).format('YYYY-MM-DD');
      let payload = data;
      setLoadingResponse(true);
      putUser(payload);
    }
  };

  const putUser = async (payload) => {
    try {
      const response = await axiosInstance.put(
        `clients/${query.userId}`,
        payload,
        headerAuthorization(token),
      );
      const {
        data: { data: resp },
      } = response;
      handleSubmitVehicle(onSubmitVehicle)();
      handleSubmitAddress(onSubmitAddress)();
    } catch (err) {
      handleErrors(err, dispatch);
      setLoadingResponse(false);
    }
  };

  const putVehicle = async (payload) => {
    try {
      const response = await axiosInstance.put(
        `vehicles/${vehicleId}/clients/${query.userId}`,
        payload,
        headerAuthorization(token),
      );
      const {
        data: { data: resp },
      } = response;
      setAlreadyPutVehicle(vehicleId);
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoadingResponse(false);
  };

  const putAddress = async (payload) => {
    try {
      const response = await axiosInstance.put(
        `addresses/${addressId}/clients/${query.userId}/`,
        payload,
        headerAuthorization(token),
      );
      const {
        data: { data: resp },
      } = response;
      setAlreadyPutAddress(addressId);
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoadingResponse(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitUser(onSubmitUser)();
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <UserForm
      controlUser={controlUser}
      controlVehicle={controlVehicle}
      controlAddress={controlAddress}
      onSubmit={handleSubmit}
      buttonText="Editar Cliente"
      loadingResponse={loadingResponse}
      errorsUser={errorsUser}
      errorsVehicle={errorsVehicle}
      errorsAddress={errorsAddress}
      onlyView={query.see === 'true'}
      setValueUser={setValueUser}
      setValueVehicle={setValueVehicle}
      setValueAddress={setValueAddress}
    />
  );
};

export default UserDetail;
