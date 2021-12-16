import React, { useState, useEffect, useContext } from 'react';
import { Row, Upload, message, Button,Typography, Space, Image  } from 'antd';
import moment from 'moment';

// COMPONENTS
import { Input } from '../input/input';
import { Loading } from 'components/loading/loading';

// CONTEXT
import { store } from 'context/contextProvider';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { approval, policiesType } from 'utils/constants/constants';
import { Regexs } from 'utils/regexs/regexs';
import { handleErrors } from 'utils/helpers/helpers';

// STYLES
import styles from './sinisterForm.module.css';

export const SinisterForm2 = ({
  control,
  onSubmit,
  buttonText,
  setValue,
  loadingResponse,
  errors,
  onlyView = false,
  register,
  getValues,
  image_url = ""
}) => {
  const rules = { required: true };

  const [receipts, setReceipts] = useState([]);
  const [estado_de_aprobacion, setEstado_de_aprobacion] = useState(approval[1].name);
  const [fechalocal, setFechaLocal] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const {
    //@ts-ignore
    state: { token },
    //@ts-ignore
    dispatch,
  } = useContext(store);

  const { Text, Link } = Typography;

  useEffect(() => {
    getReceipts();
  }, []);

  const toBase64 = file => new Promise <any> ((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

  const getReceipts = async () => {
    try {
      const response = await axiosInstance.get('receipts/', headerAuthorization(token));
      const {
        data: { data: receiptsData },
      } = response;
      
      setReceipts(receiptsData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };
  const getReceipt = async (index) => {
    try {
      const response = await axiosInstance.get(`receipts/${index}/`, headerAuthorization(token));
      const {
        data: { data: receiptData },
      } = response;
      setValue('receipt_code', receiptData.code);
      setValue('policy_code', receiptData.policy_code);
      setValue('estado_de_aprobacion', approval[1].id);
      setValue('fechaIni', receiptData.valid_from);
      setValue('fechaFin', receiptData.valid_until);
      setFechaInicio(receiptData.valid_from)
      setFechaFin(receiptData.valid_until)
     
      
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };
  // const handleFechaChangeSelect = (value) => {
  //   //let fechaini=new date
  //       //moment(receiptData.valid_from, 'YYYY-MM-DD');
  //       setFechaLocal(value)
  //       console.log('holaaa')
  //       console.log(value)
  //       //console.log(fechaFin)
  //       //console.log(fechaInicio)
  //       if(value>fechaFin || value<fechaInicio){
  //         console.log("FUERA DE RANGO")
  //       }
  //     };

  const handleChangeSelect = (value) => {
    getReceipt(value);
   
  };



  return (
    <>
      <h1>{buttonText}</h1>
      <form onSubmit={onSubmit}>
        <Row gutter={16}>
          <Input
            label="Recibo"
            id="receipt_id"
            name="receipt_id"
            control={control}
            rules={rules}
            type="select"
            array={receipts}
            onChange={handleChangeSelect}
            showValue="receiptId"
            errors={errors}
            disabled={onlyView}
          />
   


          <Input
            label="Código de Recibo"
            id="receipt_code"
            name="receipt_code"
            control={control}
            type="text"
            errors={errors}
            disabled={true}
          />
          <Input
            label="Código"
            id="code"
            name="code"
            control={control}
            type="text"
            errors={errors}
            disabled={true}
          />
          <Input
            label="Codigo de Poliza"
            id="policy_code"
            name="policy_code"
            control={control}
            type="text"
            errors={errors}
            disabled={true}
          />
          <Input
            label="Descripción del Siniestro"
            id="observations"
            name="observations"
            control={control}
            rules={rules}
            type="text"
            errors={errors}
            disabled={onlyView}
          />
          <Input
            label="Monto"
            id="monto"
            name="monto"
            control={control}
            rules={{ required: true, pattern: Regexs.numeric }}
            type="text"
            errors={errors}
            pattern="numeric"
            disabled={onlyView}
          />
          <Input
            label="Fecha"
            id="date"
            name="date"
            //onSelect={handleFechaChangeSelect}
            control={control}
            rules={rules}
            type="datepicker"
            errors={errors}
            disabled={true}
          />
          <Input
            label="Estado de Aprobación"
            id="estado_de_aprobacion"
            name="estado_de_aprobacion"
            control={control}
            type="select"
            array={approval}
            errors={errors}
            disabled={onlyView}
          />
          <Row >
          <br />
          <Space>
          {!onlyView ? <div> <Text>Imagen del Siniestro . . . </Text>
          <input type="file" accept="image/*" {...register("image_url")} onChange={async(file) => {
            let fileBase64 = await toBase64(file.target.files[0]);
            //var strImage = fileBase64.split(',')[1];
            let base64Encoded = fileBase64.replace(/^data:\w+\/\w+;base64,/, "");
            setValue('image_url', base64Encoded)
            console.log(control.getValues()) }} />  </div> :  <Image
            width={200}
            src={image_url}
          /> }
          </Space>
          <br />
        </Row>
        </Row>
        <Row >
        <br />
        </Row>

        {!onlyView && <input type="submit" value={buttonText} disabled={loadingResponse} />}
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
