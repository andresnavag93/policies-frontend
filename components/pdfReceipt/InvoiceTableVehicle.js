import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet,Page } from '@react-pdf/renderer';
import moment from 'moment';
import { states, policiesType, coverageFormType } from 'utils/constants/constants';
import { axiosMarcas } from 'utils/network/axiosMarcas';
const borderColor = '#90e5fc'
const bordergris='D3D3D3'

const getBrands = async () => {
    try {
      const response = await axiosMarcas.get(`api/v2/brands/`);
      const {
        data: { brands: brandsData },
      } = response;
      setBrands(brandsData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  const getModels = async (client) => {
    try {
      const response = await axiosMarcas.get(`api/v2/models/${client?.vehicles[0]?.brand}/`);
      const {
        data: { models: modelsData },
      } = response;
      setModels(modelsData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };
 
  


//const [model, setModels = useState(null);


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //borderBottomColor: '#bff0fd',
        //backgroundColor: '#bff0fd',
        //borderBottomWidth: 1,
        borderColor: bordergris,
        borderWidth:1, 
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    container2: {
        flexDirection: 'row',
        //borderBottomColor: '#bff0fd',
        //backgroundColor: '#bff0fd',
        //borderBottomWidth: 1,
        //borderColor: bordergris,
        //borderWidth:1, 
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '25%',
        fontWeight:'bold',
        alignItems:'flex-start'
        // borderRightColor: borderColor,
        // borderRightWidth: 1,
        // borderBottomColor: borderColor,
        // borderBottomWidth:1,
    },
    valor: {
        width: '25%',
        alignItems:'flex-start'
        // borderRightColor: borderColor,
        // borderRightWidth: 1,
        // borderBottomColor: borderColor,
        // borderBottomWidth:1,

    },
    valor50: {
        width: '50%',
        alignItems:'flex-start'
        // borderRightColor: borderColor,
        // borderRightWidth: 1,
        // borderBottomColor: borderColor,
        // borderBottomWidth:1,

    },
    titulo: {
        width: '100%',
        borderRightColor: bordergris,
        borderRightWidth: 1,
        borderBottomColor: bordergris,
        borderBottomWidth:1,
    },
    modelo: {
        width: '100%',
        
    },

  });

  const InvoiceTableVehicle = ({vehicles}) => (
      
    <View >
    <Text style={styles.titulo}>Datos del Vehiculo </Text>
    <View style={styles.container2}>
        <Text style={styles.description}>Marca</Text>
        <Text style={styles.valor}>{vehicles.brandname}</Text>
        <Text style={styles.description}>Numero Civi</Text>
        <Text style={styles.valor}>{vehicles.civi}</Text>
    </View>
    <View style={styles.container2}>
        <Text style={styles.description}>Número de Puertas:</Text>
        <Text style={styles.valor}>{vehicles.doors_no}</Text>
        <Text style={styles.description}>Modelo</Text>
        <Text style={styles.valor}>{vehicles.Modelname}</Text>
    </View>
    <View style={styles.container2}>
        <Text style={styles.description}>Número de Pasajeros:</Text>
        <Text style={styles.valor}>{vehicles.pasajeros}</Text>
        <Text style={styles.description}>Placa</Text>
        <Text style={styles.valor}>{vehicles.plate}</Text>
    </View>
    <View style={styles.container2}>
        <Text style={styles.description}>N.I.V. (S. Carrocería):</Text>
        <Text style={styles.valor}>{vehicles.serial}</Text>
        <Text style={styles.description}>Tipo</Text>
        <Text style={styles.valor}>{vehicles.type || 'N/A'}</Text>
    </View>
    
    <View style={styles.container2}>
        <Text style={styles.valor50}>Año:</Text>
        <Text style={styles.valor50}>{vehicles.year || 'N/A'}</Text>
    </View>
   
    </View>
   

    
  );
  
  export default InvoiceTableVehicle

  //<Text style={styles.modelo}>{client?.vehicles[0]?.version}</Text>