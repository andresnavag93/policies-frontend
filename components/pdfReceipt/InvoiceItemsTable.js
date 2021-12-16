import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceTableRow from './InvoiceTableRow'
import InvoiceTableVehicle from './InvoiceTableVehicle'




const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

  const InvoiceItemsTable = ({invoice}) => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader client={invoice}/>
        
    </View>
  );
  
  export default InvoiceItemsTable
  //<InvoiceTableBlankSpace rowsCount={ tableRowsCount - invoice.items.length} />
  //<InvoiceTableRow items={invoice.items} />
  //<InvoiceTableFooter items={invoice.items} />