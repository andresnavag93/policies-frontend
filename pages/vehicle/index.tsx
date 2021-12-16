import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import moment from 'moment';

// COMPONENTS
import { VehicleForm } from 'components/vehicleForm/vehicleForm';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
import { User as UserInterface } from 'interfaces/user';
import { Vehicle as VehicleInterface} from 'interfaces/vehicle';


export const Vehicle = () => {
  const { back } = useRouter();
  const {
    handleSubmit: handleSubmitVehicle,
    control: controlVehicle,
    trigger: triggerVehicle,
    errors: errorsVehicle,
   
    setValue: setValueVehicle,
  } = useForm<VehicleInterface>({
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
      
    }
  }, [alreadyPostUser]);

  useEffect(() => {
    if (alreadyPostVehicle) {
      Modal.success({
        content: 'El vehiculo fue creado satisfactoriamente',
        onOk: () => back(),
        
      });
    }
  }, [alreadyPostVehicle]);


  const onSubmitVehicle = (data: VehicleInterface) => {
    
    postVehicle(data);
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

    if (resultVehicle ) {
      
      let payload = data;
      setLoadingResponse(true);
      postVehicle(payload);
    }
  };



  const postVehicle = async (payload) => {
    try {
      const response = await axiosInstance.post(
        `vehicles/clients/${payload.client_id}/`,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitVehicle(onSubmitVehicle)();
  };

  return (
    <VehicleForm
      
      controlVehicle={controlVehicle}
      
      onSubmit={handleSubmit}
      buttonText="Crear Vehiculo"
      loadingResponse={loadingResponse}
    
      errorsVehicle={errorsVehicle}
   
      setValueVehicle={setValueVehicle}
      
    />
  );
};

export default Vehicle;
