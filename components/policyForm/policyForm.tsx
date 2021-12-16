import React, { useState, useEffect, useContext } from 'react';
import { Row } from 'antd';

// COMPONENTS
import { Input } from '../input/input';
import { Loading } from 'components/loading/loading';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { Regexs } from 'utils/regexs/regexs';
import { handleErrors } from 'utils/helpers/helpers';

// STYLES
import styles from './policyForm.module.css';

import { policiesType2 } from 'utils/constants/constants';

export const PolicyForm = ({
  control,
  onSubmit,
  clientId = null,
  buttonText,
  setValue,
  loadingResponse,
  errors,
  onlyView = false,
  onlyViewCustom = false,
  secondButtonText = null,
  handleSubmit,
}) => {
  const rules = { required: true };
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);
  const [agents, setAgents] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [enableInput, setEnableInput] = useState(true);
  const [vehiculoSelecionado, setVehiculoSeleccionado] = useState([]);
  
  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);

  useEffect(() => {
    getClients();
    getAgents();
    if (clientId) {
      getClient(clientId);
    }
  }, [clients]);

  const getClients = async () => {
    try {
      const response = await axiosInstance.get('clients/', headerAuthorization(token));
      const {
        data: { data: clientsData },
      } = response;
      if (!clients.length) {
        setClients(clientsData);
      }
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const getClient = async (index) => {
    try {
      const response = await axiosInstance.get(
        `clients/${clients[index].id}/`,
        headerAuthorization(token),
      );
      const {
        data: { data: clientData },
      } = response;
      setClient(clientData);
      setVehicles(clientData?.vehicles);
      setValue('agent_id', clientData.agent_id);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const getVehiculoSeleccionado = async (index) => {
    try {
      const response = await axiosInstance.get(
        `vehicles/${index}/`,
        headerAuthorization(token),
      );
      const {
        data: { data: vehicleData },
      } = response;
      setVehiculoSeleccionado(vehicleData);
      
      setValue('vehicle_value', vehicleData.sum_assured);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };


  const getAgents = async () => {
    try {
      const response = await axiosInstance.get(`auth/agents/`, headerAuthorization(token));
      const {
        data: { data: agentsData },
      } = response;
      setAgents(agentsData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const handleChangeSelect = (value) => {
    setClient(null);
    setValue('vehicle_value', "");
    setValue('vehicle_id', null);
    
    let index = clients.findIndex((client) => client.id === value);
    getClient(index);
    
    setEnableInput(false);
  };


  const handleVehiculoChangeSelect = (value) => {
    setValue('vehicle_value', null);
    getVehiculoSeleccionado(value);
    
  };
  return (
    <>
      <h1>{buttonText}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={16}>
          <Input
            label="Ramo"
            id="title"
            name="title"
            control={control}
            rules={rules}
            type="select"
            array={policiesType2}
            errors={errors}
            disabled={onlyView}
          />
          <Input
            label="Código"
            id="code"
            name="code"
            control={control}
            rules={{ required: false, pattern: Regexs.numeric }}
            type="text"
            pattern="numeric"
            errors={errors}
            disabled={true}
          />
          <Input
            label="Fecha"
            id="date"
            name="date"
            control={control}
            rules={rules}
            type="datepicker"
            errors={errors}
            disabled={onlyView}
          />
          <Input
            label="Cliente"
            id="client_id"
            name="client_id"
            control={control}
            rules={rules}
            type="select"
            array={clients}
            onChange={handleChangeSelect}
            showValue="client"
            errors={errors}
            disabled={onlyViewCustom}
          />
          <Input
            label="Vehículo"
            id="vehicle_id"
            name="vehicle_id"
            control={control}
            rules={rules}
            type="select"
            array={vehicles}
            onChange={handleVehiculoChangeSelect}
            showValue="vehicle"
            errors={errors}
            disabled={onlyViewCustom || enableInput}
          />

          <Input
            label="Agente del Cliente"
            id="agent_id"
            name="agent_id"
            control={control}
            showValue="agent"
            type="select"
            array={agents}
            errors={errors}
            disabled={true}
          />
          <Input
            label="Habilitada"
            id="enabled"
            name="enabled"
            control={control}
            type="switch"
            errors={errors}
            disabled={onlyView}
          />
          <Input
            label="Observaciones"
            id="observations"
            name="observations"
            control={control}
            rules={rules}
            type="text"
            errors={errors}
            disabled={onlyView}
          />
          <Input
            label="Renovable"
            id="renewable"
            name="renewable"
            control={control}
            type="switch"
            errors={errors}
            disabled={onlyView}
          />
          <Input
            label="Valor del Vehículo"
            id="vehicle_value"
            name="vehicle_value"
            control={control}
            rules={{ required: true, pattern: Regexs.numeric }}
            type="text"
            errors={errors}
            pattern="numeric"
            disabled={true}
            //disabled={onlyView}
          />
          <Input
            label="Id Recibo"
            id="receipt_id"
            name="receipt_id"
            control={control}
            type="text"
            errors={errors}
            disabled={true}
          />
          <Input
            label="Codigo de Recibo"
            id="receipt_code"
            name="receipt_code"
            control={control}
            type="text"
            errors={errors}
            disabled={true}
          />
        </Row>
        {!onlyView && <input type="submit" value={buttonText} disabled={loadingResponse} />}
        {secondButtonText && (
          <input
            type="button"
            className={styles.buttonTypeSubmit}
            value={secondButtonText}
            disabled={loadingResponse}
            onClick={handleSubmit((data) => onSubmit(data, secondButtonText))}
          />
        )}
      </form>
      {loadingResponse && (
        <>
          <br />
          <div className={styles.containerLoading}>
            <Loading />
          </div>
        </>
      )}
    </>
  );
};
