import React from 'react';
import {Text, View, StyleSheet,Page } from '@react-pdf/renderer';
import moment from 'moment';
import { states, policiesType, coverageFormType } from 'utils/constants/constants';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        borderBottomColor: borderColor,
        borderBottomWidth:1,
    },
    qty: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        borderBottomColor: borderColor,
        borderBottomWidth:1,

    },
    rate: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        borderBottomColor: borderColor,
        borderBottomWidth:1,
    },
    email: {
        width: '50%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        borderBottomColor: borderColor,
        borderBottomWidth:1,
    },
    amount: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        borderBottomColor: borderColor,
        borderBottomWidth:1,
    },
    titulo: {
        width: '100%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        borderBottomColor: borderColor,
        borderBottomWidth:1,

    },
    direccion: {
        width: '50%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        borderBottomColor: borderColor,
        borderBottomWidth:1,

    },

  });
  const getAgents = async () => {
    try {
      const response = await axiosInstance.get(`auth/agents/`, headerAuthorization(token));
      const {
        data: { data: agentsData },
      } = response;
      setAgents(client.agent_id);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const InvoiceTableHeader = ({client}) => (
    
    <View>
    <Text style={styles.titulo}>Datos del Asegurado</Text>
    <View style={styles.container}>
        <Text style={styles.description}>Nombre: {client.name} {client.lastname}</Text>
        <Text style={styles.email}>Email: {client.email}</Text>
        <Text style={styles.amount}>Teléfono: {client.cellphone}</Text>
    </View>
    <View style={styles.container}>
        <Text style={styles.direccion}>Fecha de Nacimiento: {moment(client.birthday).format('YYYY-MM-DD')}</Text>
        <Text style={styles.direccion}>Documento: {client.document_type.name}-{client.document}</Text>
    </View>
    <View style={styles.container}>
        <Text style={styles.description}>Id de Agente: #{client.agent_id}</Text>
        <Text style={styles.qty}>Estado Civil: {client.civil_status.name}</Text>
        <Text style={styles.amount}>Género: {client.gender.name}</Text>
        <Text style={styles.description}>Ocupación: {client.occupation}</Text>
    </View>
    <Text style={styles.titulo}>Dirección: {client?.addresses[0]?.line_1}</Text>
    <View style={styles.container}>
        <Text style={styles.direccion}>Ciudad: {client?.addresses[0]?.city}</Text>
        <Text style={styles.direccion}>Estado: {' '}
              {states.find((state) => state.id == client?.addresses[0]?.state_id)?.name || 'N/A'}</Text>
    </View>
    </View>

    
  );
  
  export default InvoiceTableHeader