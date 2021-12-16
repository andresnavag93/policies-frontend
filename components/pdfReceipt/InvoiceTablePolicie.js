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
        width: '100%',
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

  const InvoiceTablePolicie = ({policy}) => (
    <View>
    <Text style={styles.titulo}>Datos de la Poliza</Text>
    <View style={styles.container}>
        
        <Text style={styles.qty}> Fecha de Emisión: {policy.date} </Text>
       
        
    </View>
    <Text style={styles.titulo}>Observaciones: {policy.observations}</Text>
    <View style={styles.container}>
        <Text style={styles.direccion}>Título: {policy.title} </Text>
        
    </View>
    
    
    </View>

    
  );


  //<Text style={styles.direccion}>Tipo de poliza: {policiesType.find((type) => type.id == policy.type)?.name || 'N/A'}</Text>
  export default InvoiceTablePolicie