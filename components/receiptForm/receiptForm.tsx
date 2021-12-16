import React, { useState, useEffect, useContext } from 'react';
import { Row, Button, Table, Modal } from 'antd';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ColumnsType } from 'antd/es/table';
import { useForm } from 'react-hook-form';

// COMPONENTS
import { Input } from '../input/input';
import { Loading } from 'components/loading/loading';
import { PdfReceipt } from 'components/pdfReceipt/pdfReceipt';
import { ModalCoverage } from 'components/modalCoverage/modalCoverage';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { policiesType, coverageFormType ,ramoPerdidaTotal,RamoCoberturaAmplia,RamoRCV} from 'utils/constants/constants';
import { Regexs } from 'utils/regexs/regexs';
import { handleErrors } from 'utils/helpers/helpers';
import { Coverage } from 'interfaces/coverage';

// STYLES
import styles from './receiptForm.module.css';

export const ReceiptForm = ({
  record,
  control,
  onSubmit,
  buttonText,
  setValue,
  getValues,
  loadingResponse,
  errors,
  onlyView = false,
  policyNotEditable = false,
  coverages,
  setCoverages,
  //secondButtonText = null,
  handleSubmit,
}) => {
  const rules = { required: true };
  const [policies, setPolicies] = useState([]);
  const [policy, setPolicy] = useState(null);
  const [ramos, setRamos] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [policy_type, setPolicyType] = useState(null);
  const [enableCoverageTypeInput, setEnableCoverageTypeInput] = useState(false);
  const [enablePrimaPercentageInput, setEnablePrimaPercentageInput] = useState(false);
  const [enableTotalSumInsuredInput, setEnableTotalSumInsuredInput] = useState(false);
  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);
  const columns: ColumnsType<Coverage> = [
    {
      title: 'Título',
      dataIndex: 'title',
    },
    {
      title: 'Ramo',
      dataIndex: 'ramo',
      render: (value) => policiesType[value - 1].name,
    },
    {
      title: 'Tipo de Cálculo',
      dataIndex: 'coverage_form_type',
      render: (value) => coverageFormType[value - 1].name,
    },
    {
      title: 'Suma asegurada',
      dataIndex: 'total_sum_insured',
    },
    {
      title: 'Porcentaje de Cobertura',
      dataIndex: 'prima_percentage',
    },
    {
      title: 'Prima',
      dataIndex: 'prima',
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    handleSubmit: handleSubmitCoverage,
    control: controlCoverage,
    reset: resetCoverage,
    setValue: setValueCoverage,
    errors: errorsCoverage,
    getValues: getValuesCoverage,
    clearErrors: clearErrorsCoverage,
  } = useForm<Coverage>({
    defaultValues: {
      _id: null,
      title: '',
      ramo: '',
      coverage_form_type: '',
      total_sum_insured: null,
      prima_percentage: null,
      prima: null,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    getPolicies();
  }, []);

  useEffect(() => {
    if (record) {
      getPolicy(record.policy_id);
    }
  }, [record]);

  useEffect(() => {
    if (clientId) {
      getClient();
    }
  }, [clientId]);

  const getPolicies = async () => {
    try {
      const response = await axiosInstance.get('policies/', headerAuthorization(token));
      const {
        data: { data: policiesData },
      } = response;
      setPolicies(policiesData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const getClient = async () => {
    try {
      const response = await axiosInstance.get(`clients/${clientId}/`, headerAuthorization(token));
      const {
        data: { data: clientData },
      } = response;
      //setVehicle(clientData.vehicles[0]);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };


  const getVehiculo = async (index) => {
    try {
      const response = await axiosInstance.get(`vehicles/${index}/`, headerAuthorization(token));
      const {
        data: { data: vehicleData },
      } = response;
      setVehicle(vehicleData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  

  const getPolicy = async (policyId) => {
    try {
      const response = await axiosInstance.get(`policies/${policyId}/`, headerAuthorization(token));
      const {
        data: { data: policyData },
      } = response;
      getAgents(policyData.agent_id)
      setValue('client_id', policyData.client_id);
      setValue('vehicle_id', policyData.vehicle_id);
      setValue('policy_code', policyData.code);
            
      if (policyData.title=="Responsabilidad Civil Vial (RCV)"){
        setRamos(RamoRCV);
      }else if(policyData.title=='Cobertura Amplia'){
        setRamos(RamoCoberturaAmplia)
      }else if(policyData.title=='Perdida Total'){
        setRamos(ramoPerdidaTotal)
      }
      console.log(ramos)
      setPolicy(policyData);

      getVehiculo(policyData.vehicle_id);
      setClientId(policyData.client_id);
      setPolicyType(policyData.type);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };


  const getAgents = async (index) => {
    try {
      const response = await axiosInstance.get(`auth/agents/`, headerAuthorization(token));
      const {
        data: { data: agentsData },
      } = response;
      let obj = agentsData.find(o => o.id === index);
      //console.log(obj)
    var bono;
     bono=obj.user?.bono
     setValue('agent_bonus',bono)
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const handleChangeSelect = (value) => {
    setPolicy(null);
    let index = policies.findIndex((policy) => policy._id === value);
    getPolicy(policies[index]._id);
    
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetValuesCoverage();
  };

  const onSubmitCoverage = (data: Coverage) => {
    const coveragesTemp = [...coverages];
    coveragesTemp.push({
      ...data,
      _id: coverages.length.toString(),
      //@ts-ignore
      total_sum_insured: parseInt(data.total_sum_insured),
    });
    setCoverages(coveragesTemp);
    setIsModalVisible(false);
    setValue('prima', getValues('prima') + data.prima);
    resetValuesCoverage();
  };

  const resetValuesCoverage = () => {
    setEnableCoverageTypeInput(false);
    setEnablePrimaPercentageInput(false);
    setEnableTotalSumInsuredInput(false);
    setValueCoverage('title', '');
    setValueCoverage('ramo', '');
    setValueCoverage('coverage_form_type', '');
    setValueCoverage('total_sum_insured', null);
    setValueCoverage('prima_percentage', null);
    setValueCoverage('prima', null);
    clearErrorsCoverage();
  };

  return (
    <>
      <div className="receiptTitle">
        <h1>{buttonText} </h1>
        {record && (
          <PDFDownloadLink
            document={<PdfReceipt record={record} token={token} dispatch={dispatch} />}
            fileName={`${record.code}.pdf`}
          >
            {({ blob, url, loading, error }) => (loading ? 'Cargando...' : 'Descargar Recibo')}
          </PDFDownloadLink>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={16}>
          <Input
            label="Póliza"
            id="policy_id"
            name="policy_id"
            control={control}
            rules={rules}
            type="select"
            array={policies}
            onChange={handleChangeSelect}
            showValue="policyId"
            errors={errors}
            disabled={onlyView || policyNotEditable}
          />
          <Input
            label="Código de Poliza"
            id="policy_code"
            name="policy_code"
            control={control}
            type="text"
            errors={errors}
            disabled={true}
          />
          <Input
            label="Código de Recibo"
            id="code"
            name="code"
            control={control}
            type="text"
            errors={errors}
            disabled={true}
          />
          <Input
            label="Id de Vehículo"
            id="vehicle_id"
            name="vehicle_id"
            control={control}
            rules={rules}
            type="text"
            errors={errors}
            disabled={true}
          />
          <Input
            label="Id del Cliente"
            id="client_id"
            name="client_id"
            control={control}
            rules={rules}
            type="text"
            errors={errors}
            disabled={true}
          />
          <Input
            label="Fecha"
            id="issue_date"
            name="issue_date"
            control={control}
            rules={rules}
            type="datepicker"
            errors={errors}
            disabled={onlyView}
          />
          <Input
            label="Válido desde"
            id="valid_from"
            name="valid_from"
            control={control}
            rules={rules}
            type="datepicker"
            errors={errors}
            disabled={onlyView}
          />
          <Input
            label="Válido hasta"
            id="valid_until"
            name="valid_until"
            control={control}
            rules={rules}
            type="datepicker"
            errors={errors}
            disabled={onlyView}
          />
          <Input
            label="Bonus del Agente"
            id="agent_bonus"
            name="agent_bonus"
            rules={{ required: true, pattern: Regexs.numeric }}
            control={control}
            type="text"
            errors={errors}
            pattern="numeric"
            disabled={true}
          />
        </Row>
        <h1>Coberturas</h1>
        <Table
          bordered
          columns={columns}
          dataSource={coverages}
          rowKey={(record) => record._id.toString()}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
        <br />
        {!policyNotEditable && (
          <Button onClick={showModal} disabled={!vehicle}>
            Agregar nueva cobertura
          </Button>
        )}
        <br />
        <br />
        <Row gutter={16}>
          <Input
            label="Prima"
            id="prima"
            name="prima"
            rules={{ required: true, pattern: Regexs.numeric }}
            control={control}
            type="text"
            errors={errors}
            pattern="numeric"
            disabled={true}
          />
        </Row>
        <Modal
          title="Agregar Nueva Cobertura"
          visible={isModalVisible}
          okText="Guardar"
          onOk={handleSubmitCoverage(onSubmitCoverage)}
          onCancel={handleCancel}
        >
          <ModalCoverage
            control={controlCoverage}
            onSubmit={handleSubmitCoverage(onSubmitCoverage)}
            errors={errorsCoverage}
            getValues={getValuesCoverage}
            setValue={setValueCoverage}
            vehicle={vehicle}
            ramos={ramos}
            policyType={policy_type}
            enableCoverageTypeInput={enableCoverageTypeInput}
            setEnableCoverageTypeInput={setEnableCoverageTypeInput}
            clearErrorsCoverage={clearErrorsCoverage}
            enablePrimaPercentageInput={enablePrimaPercentageInput}
            setEnablePrimaPercentageInput={setEnablePrimaPercentageInput}
            enableTotalSumInsuredInput={enableTotalSumInsuredInput}
            setEnableTotalSumInsuredInput={setEnableTotalSumInsuredInput}
          />
        </Modal>
        <br />
        <br />
        <br />
        {!onlyView && <input type="submit" value={buttonText} disabled={loadingResponse} />}
        {/* {secondButtonText && (
          <input
            type="button"
            className={styles.buttonTypeSubmit}
            value={secondButtonText}
            disabled={loadingResponse}
            onClick={handleSubmit((data) => onSubmit(data, secondButtonText))}
          />
        )} */}
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
