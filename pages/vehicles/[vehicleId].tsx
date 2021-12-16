import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import moment from 'moment';

// COMPONENTS
import { VehicleForm } from 'components/vehicleForm/vehicleForm';
import { Loading } from 'components/loading/loading';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';

import { Vehicle } from 'interfaces/vehicle';


export const VehicleDetail = () => {
  const { query, back } = useRouter();
  
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


  const [loading, setLoading] = useState(true);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [vehicleId, setVehicleId] = useState(null);

  const [alreadyPutVehicle, setAlreadyPutVehicle] = useState(null);
  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);

  useEffect(() => {
    if (query.vehicleId) {
      getVehicle();
    }
  }, [query.userId]);

  useEffect(() => {
    if (alreadyPutVehicle ) {
      Modal.success({
        content: 'El vehiculo fue actualizado satisfactoriamente',
        onOk: () => back(),
      });
    }
  }, [alreadyPutVehicle]);

  const getVehicle = async () => {
    try {
      const response = await axiosInstance.get(
        `vehicles/${query.vehicleId}/`,
        headerAuthorization(token),
      );
      const {
        data: { data: vehicleData },
      } = response;
      let vehicle = { ...vehicleData };

      resetVehicle(vehicle);

  
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoading(false);
  };



  const onSubmitVehicle = (data: Vehicle) => {
    putVehicle(data);

  };



  const verifyInputs = async (data: Vehicle) => {
    const resultVehicle = await triggerVehicle(['plate', 'model', 'serial', 'year', 'doors_no', 'brand']);

    if (resultVehicle ) {
 
      let payload = data;
      setLoadingResponse(true);
      putVehicle(payload);
    }
  };


  // const putVehicle = async (payload) => {
  //   try {
  //     const response = await axiosInstance.put(
  //       `vehicles/${query.vehicleId}/clients/${payload.client_id}`,
  //       payload,
  //       headerAuthorization(token),
  //     );
  //     const {
  //       data: { data: resp },
  //     } = response;
  //     handleSubmitVehicle(onSubmitVehicle)();
      
  //   } catch (err) {
  //     //handleErrors(err, dispatch);
  //     setLoadingResponse(false);
  //   }
  // };

  const putVehicle = async (payload) => {
    try {
      const response = await axiosInstance.put(
        `vehicles/${query.vehicleId}/clients/${payload.client_id}`,
        payload,
        headerAuthorization(token),
      );

      Modal.success({
        content: 'El vehiculo fue actualizado satisfactoriamente',
        onOk: () => back(),
      });
    } catch (err) {
      handleErrors(err, dispatch);
    }
    setLoadingResponse(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitVehicle(onSubmitVehicle)();
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <VehicleForm
 
      controlVehicle={controlVehicle}

      onSubmit={handleSubmit}
      buttonText="Editar Vehiculo"
      loadingResponse={loadingResponse}

      errorsVehicle={errorsVehicle}

      onlyView={query.see === 'true'}
 
      setValueVehicle={setValueVehicle}

    />
  );
};

export default VehicleDetail;
