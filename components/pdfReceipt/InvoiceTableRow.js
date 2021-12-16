import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
import { policiesType, coverageFormType } from 'utils/constants/constants';


const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
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
        textAlign: 'center',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });

  

const InvoiceTableRow = ({items}) => {
    
    const rows = items.map( item => 
      
        <View style={styles.row} key={item._id.toString()}>
            <Text style={styles.description}>{item.title}</Text>
            <Text style={styles.ramo}>{policiesType.find((type) => type.id == item.ramo)?.name || 'N/A'}</Text>
            <Text style={styles.rate}>{item.prima}</Text>
            <Text style={styles.rate}>{item.total_sum_insured}</Text>
        </View>
        
    )




    return (<Fragment>{rows}</Fragment> )
};
  
export default InvoiceTableRow
{/* <Text style={styles.qty}>{item.qty}</Text>
            <Text style={styles.rate}>{item.rate}</Text>
            <Text style={styles.amount}>{(item.qty * item.rate).toFixed(2)}</Text>  
              {if (item.ramo==1) {ramo="Responsabilidad Civil Vial (RCV)"}}, */
        }
            