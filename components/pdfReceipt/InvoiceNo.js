import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: "flex-start"
    },
    invoiceNoContainer2: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: "flex-start"
    },
    invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
    },
    label: {
        width: 60
    }
    
  });


  const InvoiceNo = ({invoice}) => (
        <Fragment>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.invoiceDate}>Número de Póliza {invoice.policy_code}</Text>
            </View >
            <View style={styles.invoiceNoContainer2}>
                <Text >Número de Recibo {invoice.code}</Text>
            </View >
        </Fragment>
  );
  
  export default InvoiceNo