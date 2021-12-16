import React from 'react';
import { Row } from 'antd';

// COMPONENTS
import { Input } from '../input/input';
import { Loading } from 'components/loading/loading';

// UTILS
import { Regexs } from 'utils/regexs/regexs';

// STYLES
import styles from './agentForm.module.css';

export const AgentForm = ({
  control,
  onSubmit,
  buttonText,
  loadingResponse,
  errors,
  onlyView = false,
}) => {
  return (
    <>
      <h1>{onlyView ? 'Ver Agente' : buttonText}</h1>
      <form onSubmit={onSubmit} id="agent-form">
        <Row gutter={16}>
          <Input
            label="Nombre"
            id="user.name"
            name="user.name"
            control={control}
            rules={{ required: true, pattern: Regexs.characters }}
            type="text"
            errors={errors}
            pattern="characters"
            disabled={onlyView}
          />
          <Input
            label="Apellido"
            id="user.lastname"
            name="user.lastname"
            control={control}
            rules={{ required: true, pattern: Regexs.characters }}
            type="text"
            errors={errors}
            pattern="characters"
            disabled={onlyView}
          />

          <Input
            label="E-mail"
            id="email"
            name="email"
            control={control}
            rules={{ required: true, pattern: Regexs.email }}
            type="text"
            errors={errors}
            disabled={onlyView}
          />
          <Input
            label="Confirmar E-mail"
            id="emailConfirm"
            name="emailConfirm"
            control={control}
            rules={{ required: true }}
            type="text"
            errors={errors}
            disabled={onlyView}
          />
          <Input
            label="Contraseña"
            type={"password"}
            id="password"
            name="password"
            control={control}
            rules={{ required: true }}
            disabled={onlyView}
            iconRender={onlyView}
          />
          <Input
            label="Confirmar Constraseña"
            id="passwordConfirm"
            type={'password'}
            name="passwordConfirm"
            control={control}
            rules={{ required: true }}
            errors={errors}
            disabled={onlyView}
            iconRender={onlyView}
          />

          <Input
            label="Bono del agente"
            id="user.bono"
            name="user.bono"
            control={control}
            rules={{ required: false, pattern: Regexs.numeric }}
            type="text"
            errors={errors}
            pattern="numeric"
            disabled={onlyView}
          />
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
