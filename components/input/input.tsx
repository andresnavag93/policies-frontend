import React from 'react';
import { useController } from 'react-hook-form';
import { Input as InputAntd, InputNumber, DatePicker, Switch, Col } from 'antd';

// COMPONENTS
import { Select } from 'components/select/select';

// UTILS
import { ErrorMessages } from 'utils/constants/constants';

// STYLES
import styles from './input.module.css';

export const Input = (props) => {
  const { field } = useController(props);
  return (
    <Col xs={24} md={12}>
      <label htmlFor={props.name}>
        {props.label}
        <br />
        {props.type === 'text' ? (
          <InputAntd {...field} disabled={props.disabled} />
        ) : props.type === 'numeric' ? (
          <InputNumber
            {...field}
            style={{ width: '100%' }}
            disabled={props.disabled}
            onChange={props.onChange}
          />
        ) : props.type === 'select' ? (
          <Select
            field={field}
            array={props.array}
            onChange={props.onChange}
            showValue={props.showValue}
            disabled={props.disabled}
          />
        ) : props.type === 'datepicker' ? (
          <DatePicker
            {...field}
            className="datepicker-container"
            placeholder="Selecciona una fecha"
            disabled={props.disabled}
          />
        ) : props.type === "password"?  (
          <InputAntd.Password {...field} {...props} />
        ) : (
          <Switch checked={field.value} {...field} disabled={props.disabled} />
        )}
      </label>
      <p className={styles.error}>
        {props.errors && props.errors[props.name]
          ? props.errors[props.name]['type'] === 'required'
            ? ErrorMessages.required
            : ErrorMessages['pattern'][props.name]
            ? ErrorMessages['pattern'][props.name]
            : ErrorMessages['pattern'][props.pattern]
          : ''}
      </p>
    </Col>
  );
};
