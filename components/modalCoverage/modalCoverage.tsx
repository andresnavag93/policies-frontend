import React from 'react';
import { Row } from 'antd';

// COMPONENTS
import { Input } from '../input/input';

// UTILS
import { policiesType, coverageFormType ,perdida_total,cobertura_amplia,responsabilidad_civil_vial,ramoPerdidaTotal,RamoCoberturaAmplia,RamoRCV} from 'utils/constants/constants';
import { Regexs } from 'utils/regexs/regexs';

// STYLES
import styles from './modalCoverage.module.css';
import { title } from 'node:process';
var coberturas2 = [];
export const ModalCoverage = ({
  control,
  onSubmit,
  errors,
  getValues,
  setValue,
  ramos,
  vehicle,
  policyType,
  enableCoverageTypeInput,
  setEnableCoverageTypeInput,
  clearErrorsCoverage,
  enablePrimaPercentageInput,
  setEnablePrimaPercentageInput,
  enableTotalSumInsuredInput,
  setEnableTotalSumInsuredInput,
}) => {

  
  const rules = { required: true };

  const handleRamoChangeSelect = (value) => {
    clearErrorsCoverage('coverage_form_type');
    if (value === 1) {
      // RCV
      setValue("title","")
      coberturas2=responsabilidad_civil_vial
      setValue('coverage_form_type', 2);
      setEnableCoverageTypeInput(false);
      setEnablePrimaPercentageInput(true);
      setEnableTotalSumInsuredInput(true);
    } else if (value === 2) {
      // Perdida total
      setValue("title","")
      coberturas2=perdida_total
      if (vehicle.rate_total_lost) {
        setEnableCoverageTypeInput(true);
      } else {
        setValue('coverage_form_type', 2);
        setEnableCoverageTypeInput(false);
        setEnablePrimaPercentageInput(true);
        setEnableTotalSumInsuredInput(true);
      }
    } else {
      // Cobertura amplia
      setValue("title","")
      coberturas2=cobertura_amplia
      if (vehicle.rate_width_coverage) {
        setEnableCoverageTypeInput(true);
      } else {
        setValue('coverage_form_type', 2);
        setEnableCoverageTypeInput(false);
        setEnablePrimaPercentageInput(true);
        setEnableTotalSumInsuredInput(true);
      }
    }
    setValue('total_sum_insured', null);
    setValue('prima_percentage', null);
    setValue('prima', null);
  };

  const handleTotalSumInsured = (value) => {
    setValue('total_sum_insured', value);
    handlePrimaValue(value, getValues('prima_percentage'));
    clearErrorsCoverage('total_sum_insured');
  };

  const handlePrimaPercentage = (value) => {
    setValue('prima_percentage', value);
    handlePrimaValue(getValues('total_sum_insured'), value);
    clearErrorsCoverage('prima_percentage');
  };

  const handlePrimaValue = (total_sum_insured, prima_percentage) => {
    const primaPerc = parseFloat(
      prima_percentage && prima_percentage !== '' ? prima_percentage : 0,
    );
    const totalSumInsured = total_sum_insured && total_sum_insured !== '' ? total_sum_insured : 0;
    const primaValue = totalSumInsured * (primaPerc / 100);
    setValue('prima', primaValue);
  };

  const handleCoverageFormType = (value) => {
    
    if (getValues('ramo') === 2 && value === 1) {
      // Perdida total y Suma asegurada
      
      setValue('total_sum_insured', vehicle.sum_assured);
      setValue('prima', vehicle.sum_assured * (vehicle.rate_total_lost /100));
      setValue('prima_percentage', vehicle.rate_total_lost);
      setEnablePrimaPercentageInput(false);
      setEnableTotalSumInsuredInput(false);
    } else if (getValues('ramo') === 3 && value === 1) {
      // Cobertura amplia y Suma asegurada
      setValue('total_sum_insured', vehicle.sum_assured);
      setValue('prima', vehicle.sum_assured * (vehicle.rate_width_coverage /100));
      setValue('prima_percentage', vehicle.rate_width_coverage);
      setEnablePrimaPercentageInput(false);
      setEnableTotalSumInsuredInput(false);
    }

    if (value === 2) {
      // Tasa Fija
      setValue('total_sum_insured', null);
      setValue('prima', null);
      setValue('prima_percentage', null);
      setEnablePrimaPercentageInput(true);
      setEnableTotalSumInsuredInput(true);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Row gutter={16}>
      <Input
          label="Ramo"
          id="ramo"
          name="ramo"
          control={control}
          rules={rules}
          type="select"
          onChange={handleRamoChangeSelect}
          array={ramos}
          errors={errors}
        />
        <Input
          label="Título"
          id="title"
          name="title"
          control={control}
          rules={rules}
          type="select"
          array={coberturas2}
          errors={errors}
        />
        <Input
          label="Tipo Cálculo"
          id="coverage_form_type"
          name="coverage_form_type"
          control={control}
          rules={rules}
          type="select"
          onChange={handleCoverageFormType}
          array={coverageFormType}
          errors={errors}
          disabled={!enableCoverageTypeInput}
        />
        <Input
          label="Suma Asegurada"
          id="total_sum_insured"
          name="total_sum_insured"
          rules={{ required: true, pattern: Regexs.numeric }}
          control={control}
          type="numeric"
          errors={errors}
          onChange={handleTotalSumInsured}
          pattern="numeric"
          disabled={!enableTotalSumInsuredInput}
        />
        <Input
          label="Porcentaje de Cobertura"
          id="prima_percentage"
          name="prima_percentage"
          rules={{ required: true, pattern: Regexs.numeric }}
          control={control}
          type="numeric"
          errors={errors}
          onChange={handlePrimaPercentage}
          pattern="numeric"
          disabled={!enablePrimaPercentageInput}
        />
        <Input
          label="Prima"
          id="prima"
          name="prima"
          control={control}
          type="numeric"
          errors={errors}
          pattern="numeric"
          disabled
        />
      </Row>
    </form>
  );
};
