import React, { useContext } from 'react';
import { Form, Input, Button, Layout } from 'antd';
import { useRouter } from 'next/router';

// UTILS
import { axiosInstance } from 'utils/network/axios';
import { Regexs } from 'utils/regexs/regexs';
import { ErrorMessages } from 'utils/constants/constants';
import { handleErrors } from 'utils/helpers/helpers';

// CONTEXT
import { store } from 'context/contextProvider';
import { TYPES } from 'context/types';

// STYLES
import styles from './login.module.css';
import Cookies from "universal-cookie";
const cookies = new Cookies()
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Content } = Layout;
const { SET_VALUES } = TYPES;

export const Login = () => {
  //@ts-ignore
  const { dispatch } = useContext(store);
  const router = useRouter();

  const onFinish = async (payload: any) => {
    try {
      const response = await axiosInstance.post('auth/login/', payload);
      const {
        data: {
          data: { token, role_id },
        },
      } = response;
      dispatch({ type: SET_VALUES, payload: { token, role_id } });
      cookies.set('jwt', token)
      cookies.set("role_id", role_id)
      await router.push('/');
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  return (
    <Content className={styles.content}>
      <Form {...layout} name="basic" onFinish={onFinish}>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ message: ErrorMessages.pattern.email, pattern: Regexs.email }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Contraseña" name="password" rules={[{ message: ErrorMessages.required }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};
