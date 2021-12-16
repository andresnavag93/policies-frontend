import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
import { policiesType, coverageFormType } from 'utils/constants/constants';
const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '25%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '50%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '20%',
        textAlign: 'right',
        paddingRight: 8,
    },
    prima: {
        width: '100%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        backgroundColor:"#CDCDCD",
        borderBottomColor: borderColor,
        borderBottomWidth:1,
        textAlign: "right",

    },
  });

  


         
    





const InvoiceRecibo = ({invoice}) => (
    
        <View  >
            <Text style={styles.titulo}>Datos del Recibo</Text>
        <View style={styles.row} >
            <Text style={styles.rate}>Nro de Recibo: {invoice.code}</Text>
            <Text style={styles.rate}>Fecha de Emision: {invoice.issue_date}</Text>
        </View>
        <View style={styles.row} >
            <Text style={styles.rate}>Valido Desde: {invoice.valid_from}</Text>
            <Text style={styles.rate}>Valido Hasta {invoice.valid_until}</Text>
        </View>
        <Text style={styles.prima}>Total Prima: Bs {invoice.prima}</Text>
        </View>
        
  );
  
export default InvoiceRecibo

            