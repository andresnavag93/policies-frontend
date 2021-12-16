import React, { useState, useEffect, useContext } from 'react';
import { Row, Modal } from 'antd';

// COMPONENTS
import { Input } from '../input/input';
import { Loading } from 'components/loading/loading';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { axiosMarcas } from 'utils/network/axiosMarcas';
import { genders, documentsType, civilStatus, states ,vehicleType} from 'utils/constants/constants';
import { Regexs } from 'utils/regexs/regexs';
import { handleErrors } from 'utils/helpers/helpers';

// STYLES
import styles from './userForm.module.css';

export const UserForm = ({
  controlUser,
  controlVehicle,
  controlAddress,
  onSubmit,
  brandId = null,
  buttonText,
  loadingResponse,
  errorsUser,
  errorsVehicle,
  errorsAddress,
  setValueUser,
  setValueVehicle,
  setValueAddress,
  onlyView = false,
}) => {
  const rules = { required: true };
  const [agents, setAgents] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState(null);
  const [models, setModels] = useState([]);
  const [model, setModel] = useState(null);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState(null);
  const [versions, setVersions] = useState([]);
  const [version, setVersion] = useState('');
  const [type, setType] = useState('');
  const [civi, setCivi] = useState(null);

  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);

  useEffect(() => {
    getAgents();
    getBrands();
  }, []);

  useEffect(() => {
    if (brand) {
      setModels([]);
      getModels(brand);
      setValueVehicle('model', '');
      setValueVehicle('year', null);
      setValueVehicle('civi', null);
      setValueVehicle('type', null);
      setValueVehicle('version', '');
      setValueVehicle('rate_width_coverage', null);
      setValueVehicle('rate_total_lost', null);
      setValueVehicle('sum_assured', null);
    }
  }, [brand]);

  useEffect(() => {
    if (model) {
      setYears([]);
      getYears(model);
      setType(null);
      setValueVehicle('year', null);
      setValueVehicle('civi', null);
      setValueVehicle('version', '');
      setValueVehicle('rate_width_coverage', null);
      setValueVehicle('rate_total_lost', null);
      setValueVehicle('sum_assured', null);
    }
  }, [model]);

  useEffect(() => {
    if (year) {
      setVersions([]);
      getType();
      getVersion();
      setValueVehicle('civi', null);
      setValueVehicle('version', '');
      setValueVehicle('rate_width_coverage', null);
      setValueVehicle('rate_total_lost', null);
      setValueVehicle('sum_assured', null);
    }
  }, [year]);

  useEffect(() => {
    if (type) {
      setValueVehicle('rate_width_coverage', null);
      setValueVehicle('rate_total_lost', null);
      
    }
  }, [type]);

  useEffect(() => {
    if (civi) {
      getAllData();
    }
  }, [civi]);

  const handleBrandChange = (value) => {
    setBrand(value);
  };

  const handleModelChange = (value) => {
    const modelObject = JSON.parse(value);
    setModel(modelObject.code);
    setValueVehicle('model', value);
  };

  const getType = () => {
    let modelObject = models.find((x) => x.code === model);
    if (modelObject && modelObject.type) {
      setType(modelObject.type.toLowerCase());
      setValueVehicle('type', modelObject.type.toLowerCase());
    }
  };

  const handleYearChange = (value) => {
    setYear(value);
  };

  const handleVersionChange = (value) => {
    const versionObject = JSON.parse(value);
    setCivi(versionObject.civi);
    setVersion(value);
    setValueVehicle('version', value);
    setValueVehicle('civi', versionObject.civi);
  };

  const handleTypeChange = (value) => {
    setType(value)
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

  const getBrands = async () => {
    try {
      const response = await axiosMarcas.get(`api/v2/brands/`);
      const {
        data: { brands: brandsData },
      } = response;
      setBrands(brandsData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const getModels = async (brand) => {
    try {
      const response = await axiosMarcas.get(`api/v2/models/${brand}/`);
      const {
        data: { models: modelsData },
      } = response;
      setModels(modelsData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const getYears = async (model) => {
    try {
      const response = await axiosMarcas.get(`api/v2/years/${brand}/${model}/`);
      const {
        data: { years: yearsData },
      } = response;
      setYears(yearsData);
    } catch (err) {
      Modal.error({
        content: 'Lo sentimos este modelo no puede registrarse en el sistema',
      });
      handleErrors(err, dispatch);
    }
  };

  const getVersion = async () => {
    try {
      const response = await axiosMarcas.get(`api/v2/versions/${brand}/${model}/${year}/${type}/`);
      const {
        data: { versions, rateWideCoverage, rateTotalLoss },
      } = response;
      setVersions(versions);
      setValueVehicle('rate_width_coverage', rateWideCoverage);
      setValueVehicle('rate_total_lost', rateTotalLoss);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const getAllData = async () => {
    try {
      const response = await axiosMarcas.get(`api/v1/allData/${civi}/${year}/`);
      const { data } = response;
      setValueVehicle('sum_assured', data.info.sumAssured);
      setValueVehicle('pasajeros', data.info.passengers);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  return (
    <>
      <h1>{onlyView ? 'Ver Cliente' : buttonText}</h1>
      <form onSubmit={onSubmit} id="user-form">
        <Row gutter={16}>
        <Input
            label="Razon Social (En caso de empresa)"
            id="razon_social"
            name="razon_social"
            control={controlUser}
            rules={{ required: false, }}
            type="text"
            errors={errorsUser}
            pattern="characters"
            disabled={onlyView}
          />
          <Input
            label="Nombre"
            id="name"
            name="name"
            control={controlUser}
            rules={{ required: true, pattern: Regexs.characters }}
            type="text"
            errors={errorsUser}
            pattern="characters"
            disabled={onlyView}
          />
          <Input
            label="Apellido"
            id="lastname"
            name="lastname"
            control={controlUser}
            rules={{ required: true, pattern: Regexs.characters }}
            type="text"
            errors={errorsUser}
            pattern="characters"
            disabled={onlyView}
          />
          <Input
            label="E-mail"
            id="email"
            name="email"
            control={controlUser}
            rules={{ required: true, pattern: Regexs.email }}
            type="text"
            errors={errorsUser}
            disabled={onlyView}
          />
          <Input
            label="Teléfono Celular"
            id="cellphone"
            name="cellphone"
            control={controlUser}
            rules={{ required: true, pattern: Regexs.phone }}
            type="text"
            errors={errorsUser}
            disabled={onlyView}
          />

          <Input
            label="Profesión"
            id="occupation"
            name="occupation"
            control={controlUser}
            rules={{ required: true, pattern: Regexs.characters }}
            type="text"
            errors={errorsUser}
            pattern="characters"
            disabled={onlyView}
          />
          <Input
            label="Tipo de Documento"
            id="document_type_id"
            name="document_type_id"
            control={controlUser}
            rules={rules}
            type="select"
            array={documentsType}
            errors={errorsUser}
            disabled={onlyView}
          />
          <Input
            label="Documento"
            id="document"
            name="document"
            control={controlUser}
            rules={{ required: true, pattern: Regexs.numeric }}
            type="text"
            errors={errorsUser}
            pattern="numeric"
            disabled={onlyView}
          />
          <Input
            label="Género"
            id="gender_id"
            name="gender_id"
            control={controlUser}
            rules={rules}
            type="select"
            array={genders}
            errors={errorsUser}
            disabled={onlyView}
          />
          <Input
            label="Estado Civil"
            id="civil_status_id"
            name="civil_status_id"
            control={controlUser}
            rules={rules}
            type="select"
            array={civilStatus}
            errors={errorsUser}
            disabled={onlyView}
          />
          <Input
            label="Fecha de Nacimiento"
            id="birthday"
            name="birthday"
            control={controlUser}
            rules={rules}
            type="datepicker"
            errors={errorsUser}
            disabled={onlyView}
          />
          <Input
            label="Agente del Cliente"
            id="agent_id"
            name="agent_id"
            rules={{ required: true, pattern: Regexs.numeric }}
            control={controlUser}
            showValue="agent"
            type="select"
            array={agents}
            errors={errorsUser}
            disabled={onlyView}
          />
        </Row>
      </form>
      <form id="address-form">
        <h1>Dirección de Cliente</h1>
        <Row gutter={16}>
          <Input
            label="Dirección"
            id="line_1"
            name="line_1"
            control={controlAddress}
            rules={rules}
            type="text"
            errors={errorsAddress}
            disabled={onlyView}
          />
          <Input
            label="Estado"
            id="state_id"
            name="state_id"
            control={controlAddress}
            rules={rules}
            type="select"
            array={states}
            errors={errorsAddress}
            disabled={onlyView}
          />
          <Input
            label="Ciudad"
            id="city"
            name="city"
            control={controlAddress}
            rules={{ required: true, pattern: Regexs.characters }}
            type="text"
            errors={controlAddress}
            pattern="characters"
            disabled={onlyView}
          />
        </Row>
      </form>
      <form id="vehicle-form">
        <h1>Vehículo de Cliente</h1>
        <Row gutter={16}>
          <Input
            label="Placa"
            id="plate"
            name="plate"
            control={controlVehicle}
            rules={{ required: true, pattern: Regexs.alphanumeric }}
            type="text"
            errors={errorsVehicle}
            pattern="alphanumeric"
            disabled={onlyView}
          />
          <Input
            label="Serial"
            id="serial"
            name="serial"
            control={controlVehicle}
            rules={{ required: true, pattern: Regexs.alphanumeric }}
            type="text"
            errors={errorsVehicle}
            pattern="alphanumeric"
            disabled={onlyView}
          />
          <Input
            label="Marca"
            id="brand"
            name="brand"
            control={controlVehicle}
            showValue="brand"
            rules={rules}
            type="select"
            array={brands}
            onChange={handleBrandChange}
            errors={errorsVehicle}
            disabled={onlyView}
          />
          <Input
            label="Modelo"
            id="model"
            name="model"
            showValue="model"
            control={controlVehicle}
            rules={rules}
            type="select"
            onChange={handleModelChange}
            array={models}
            errors={errorsVehicle}
            disabled={onlyView}
          />
          <Input
            label="Tipo"
            id="type"
            name="type"
            control={controlVehicle}
            rules={{ required: false, pattern: Regexs.alphanumeric }}
            array={vehicleType}
            type="select"
            onChange={handleTypeChange}
            errors={errorsVehicle}
            pattern="alphanumeric"
            disabled={onlyView}
          />
          <Input
            label="Año"
            id="year"
            name="year"
            showValue="year"
            control={controlVehicle}
            rules={{ required: true, pattern: Regexs.numeric }}
            array={years}
            type="select"
            onChange={handleYearChange}
            errors={errorsVehicle}
            pattern="numeric"
            disabled={onlyView}
          />
          <Input
            label="Descripción"
            id="version"
            name="version"
            showValue="version"
            control={controlVehicle}
            rules={rules}
            type="select"
            onChange={handleVersionChange}
            array={versions}
            errors={errorsVehicle}
            disabled={onlyView}
          />
          <Input
            label="Civi"
            id="civi"
            name="civi"
            showValue="civi"
            value={civi}
            control={controlVehicle}
            rules={{ required: false, pattern: Regexs.alphanumeric }}
            type="text"
            errors={errorsVehicle}
            pattern="alphanumeric"
            disabled={onlyView}
          />
          <Input
            label="Tasa Cobertura Amplia"
            id="rate_width_coverage"
            name="rate_width_coverage"
            control={controlVehicle}
            rules={{ required: false, pattern: Regexs.numeric }}
            type="text"
            errors={errorsVehicle}
            pattern="numeric"
            disabled={onlyView}
          />
          <Input
            label="Tasa de Perdida Total"
            id="rate_total_lost"
            name="rate_total_lost"
            control={controlVehicle}
            rules={{ required: false, pattern: Regexs.numeric }}
            type="text"
            errors={errorsVehicle}
            pattern="numeric"
            disabled={onlyView}
          />
          <Input
            label="Suma Asegurada"
            id="sum_assured"
            name="sum_assured"
            control={controlVehicle}
            rules={{ required: false, pattern: Regexs.numeric }}
            type="text"
            errors={errorsVehicle}
            pattern="numeric"
            disabled={onlyView}
          />
          <Input
            label="Número de puertas"
            id="doors_no"
            name="doors_no"
            control={controlVehicle}
            rules={{ required: true, pattern: Regexs.numeric }}
            type="text"
            errors={errorsVehicle}
            pattern="numeric"
            disabled={onlyView}
          />
          <Input
            label="Número de Pasajeros"
            id="pasajeros"
            name="pasajeros"
            control={controlVehicle}
            rules={{ required: true, pattern: Regexs.alphanumeric }}
            type="text"
            errors={errorsVehicle}
            pattern="alphanumeric"
            disabled={onlyView}
          />
          <Input
            label="Identificacion de la Póliza"
            id="policy_id"
            name="policy_id"
            control={controlVehicle}
            type="text"
            errors={errorsVehicle}
            disabled={true}
          />
        </Row>
      </form>
      {!onlyView && (
        <input type="submit" value={buttonText} form="user-form" disabled={loadingResponse} />
      )}
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
