import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { states, policiesType, coverageFormType } from 'utils/constants/constants';
import InvoiceTableVehicle from './InvoiceTableVehicle'
import { axiosMarcas } from 'utils/network/axiosMarcas';
import InvoiceTitle from './InvoiceTitle'

import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceTablePolicie from './InvoiceTablePolicie'
import InvoiceTableRow from './InvoiceTableRow'
import InvoiceHeaderCoberturas from './InvoiceHeaderCoberturas'
import InvoiceRecibo from './InvoiceRecibo'


//import InvoiceThankYouMsg from './InvoiceThankYouMsg'




// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';
const borderColor = '#90e5fc'
// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft:60,
    paddingRight:60,
    lineHeight: 1.5,
    flexDirection: 'column',
}, 
prima: {
  width: '100%',
  borderRightColor: borderColor,
  borderRightWidth: 1,
  borderBottomColor: borderColor,
  borderBottomWidth:1,

},
logo: {
    width: 74,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto'
}
});

// Create Document Component
export const PdfReceipt = ({ record, token, dispatch }) => {
  const [receipt, setReceipt] = useState(null);
  const [client, setClient] = useState(null);
  const [client2, setClient2] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [coverages, setCoverages] = useState(null);
  const [models, setModels] = useState(null);
  const [brandss, setBrands] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  
  


  
  

 

  const getReceipt = async () => {
    try {
      const response = await axiosInstance.get(
        `receipts/${record._id}`,
        headerAuthorization(token),
      );
      const {
        data: { data: ReceiptData },
      } = response;
      setReceipt(ReceiptData);
      getPolicy(ReceiptData.policy_id);
      getBrands(ReceiptData.client_id,ReceiptData.vehicle_id)
      //getClient(ReceiptData.client_id);
      getCoverages(ReceiptData._id);

    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const getPolicy = async (policyId) => {
    try {
      const response = await axiosInstance.get(`policies/${policyId}/`, headerAuthorization(token));
      const {
        data: { data: PolicyData },
      } = response;
      setPolicy(PolicyData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const getClient = async (clientId) => {
    try {
      const response = await axiosInstance.get(`clients/${clientId}/`, headerAuthorization(token));
      const {
        data: { data: ClientData },
      } = response;
      
    

      // var input2=client?.vehicles[0]?.version
      // var fields2 = input2.split('"');
      // console.log(fields2)
      // console.log(fields2[2]+" "+fields2[6]+" "+fields2[10])

      setClient(ClientData);
      
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const getCoverages = async (receiptId) => {
    try {
      const response = await axiosInstance.get(
        `coverages/receipts/${receiptId}`,
        headerAuthorization(token),
      );
      const {
        data: { data: CoverageData },
        
      } = response;
      
      setCoverages(CoverageData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const getVehicle = async (vehicleId,brandsData) => {
    try {
      const response = await axiosInstance.get(
        `vehicles/${vehicleId}`,
        headerAuthorization(token),
      );
      const {
        data: { data: VehicleData },
        
      } = response;  
      var __FOUND = brandsData.find(function(post, index) {
        if(post.code == VehicleData.brand)
          return true;
      });

      VehicleData.brandname=__FOUND.name
      
      var input=VehicleData.model
      var fields = input.split('"');
      //console.log(fields[3])
      VehicleData.Modelname=fields[3]
      
      setVehicles(VehicleData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };


  const getBrands = async (client,vehicle_id) => {
    try {
      const response = await axiosMarcas.get(`api/v2/brands/`);
      const {
        data: { brands: brandsData },
      } = response;
      setBrands(brandsData);
      
      //console.log("brands va bien")
      getVehicle(vehicle_id,brandsData)
      getClient(client)
      //console.log(__FOUND.name)
      
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  useEffect(() => {
    
    getReceipt();
    
  }, []);
  
  // client.brandname=__FOUND.name;
//<Image style={styles.logo} src={logo} />
  return (
    
    <Document>
      {receipt && client && policy  && coverages&& vehicles&&(
        
        <Page size="A4" style={styles.page}>
        
                    <InvoiceTitle title='Recibo de Póliza'/>
                    <InvoiceItemsTable invoice={client} />   
                    <InvoiceTableVehicle vehicles={vehicles}/>  
                    <InvoiceTablePolicie policy={policy}/>  
                    < InvoiceHeaderCoberturas  invoice={coverages}/> 
                    <InvoiceTableRow items={coverages}/> 
                    <InvoiceRecibo invoice={receipt}/> 
                    
                    
                    
                    
        </Page>
      )}
    </Document>
  );
};


{/* 
                    
                    
                    <InvoiceThankYouMsg /> 
                  <InvoiceNo invoice={receipt}/>*/}