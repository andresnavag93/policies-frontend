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
        width: '30%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    ramo: {
        width: '40%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });

  


         
    





const InvoiceHeaderCoberturas = ({invoice}) => (
    
        <View  >
            <Text style={styles.titulo}>Coberturas</Text>
        <View style={styles.row} >
            <Text style={styles.description}>{"Titulo"}</Text>
            <Text style={styles.ramo}>{"Ramo"}</Text>
            <Text style={styles.rate}>{"Prima"}</Text>
            <Text style={styles.rate}>{"Asegurado"}</Text>
        </View>
        </View>
        
  );
  
export default InvoiceHeaderCoberturas

            