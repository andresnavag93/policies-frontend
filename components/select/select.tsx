import React from 'react';
import { Select as SelectAntd } from 'antd';

const { Option } = SelectAntd;

export const Select = ({ field, array, onChange = null, showValue = null, disabled }) => {
  const handleOnChange = (value) => {
    if (onChange) onChange(value);
    field.onChange(value);
  };
  let options;
  if (showValue === 'vehicle') {
    options = array.map((item) => {
      if (!item.policy_id)
        return (
          <Option key={item.id} value={item.id}>
            {`Placa: ${item.plate}`}
          </Option>
        );
      return;
    });
  } else if (showValue === 'agent') {
    options = array.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.user?.name + ' ' + item.user?.lastname}
      </Option>
    ));
  } else if (showValue === 'client') {
    options = array.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.document_type.name+'-' + ' ' + item.document}
      </Option>
    ));
  } else if (showValue === 'policy') {
    options = array.map((item) => (
      <Option key={item.id} value={item.id}>
        {'poliza ' + item.policy_id + ' Recibo nro' + item.code}
      </Option>
    ));
  } else if (showValue === 'policyId') {
    options = array.map((item) => (
      <Option key={item._id} value={item._id}>
        {'poliza ' + item.code}
      </Option>
    ));
  } else if (showValue === 'receiptId') {
    options = array.map((item) => (
      <Option key={item._id} value={item._id}>
        {'recibo ' + item.code}
      </Option>
    ));
  } else if (showValue === 'brand') {
    options = array.map((item, i) => (
      <Option key={i} value={item.code}>
        {item.name}
      </Option>
    ));
  } else if (showValue === 'model') {
    const arrayTemp = !array ? [] : array;
    options = arrayTemp.map((item, i) => (
      <Option key={i} value={JSON.stringify({ model: item.name, code: item.code })}>
        {`model: ${item.name}, code: ${item.code}`}
      </Option>
    ));
  } else if (showValue === 'vehiculo') {
    options = array.map((item, i) => (
      <Option key={i} value={item}>
        {item.name}
      </Option>
    ));
  } else if (showValue === 'year') {
    options = array.map((item, i) => (
      <Option key={i} value={item}>
        {item}
      </Option>
    ));
  } else if (showValue === 'version') {
    options = array.map((item, i) => (
      <Option
        key={i}
        value={JSON.stringify({
          tipo: item.extra,
          motor: item.engine,
          trasnmision: item.transmission,
          civi: item.civi,
        })}
      >
        {`tipo: ${item.extra}, motor: ${item.engine}, trasnmision: ${item.transmission}, civi: ${item.civi}`}
      </Option>
    ));
  } else if (showValue === 'polizas') {
    options = array.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.code}
      </Option>
    ));
  } else {
    options = array.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  }

  return (
    <SelectAntd
      className="select-container"
      {...field}
      placeholder="Selecciona una opción"
      onChange={handleOnChange}
      allowClear
      disabled={disabled}
    >
      {options}
    </SelectAntd>
  );
};
