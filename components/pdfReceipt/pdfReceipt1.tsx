import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { states, policiesType, coverageFormType } from 'utils/constants/constants';

// UTILS
import { axiosInstance, headerAuthorization } from 'utils/network/axios';
import { handleErrors } from 'utils/helpers/helpers';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 16,
    margin: 2,
  },
  sectionText: {
    fontSize: 12,
    marginLeft: 10,
  },
});

// Create Document Component
export const PdfReceipt = ({ record, token, dispatch }) => {
  const [receipt, setReceipt] = useState(null);
  const [client, setClient] = useState(null);
  const [policy, setPolicy] = useState(null);

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
      getClient(ReceiptData.client_id);
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
      setClient(ClientData);
    } catch (err) {
      handleErrors(err, dispatch);
    }
  };

  useEffect(() => {
    getReceipt();
  }, []);

  return (
    <Document>
      {receipt && client && policy && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cliente</Text>
            <Text style={styles.sectionText}>Nombre: {client.name}</Text>
            <Text style={styles.sectionText}>Apellido: {client.lastname}</Text>
            <Text style={styles.sectionText}>Email: {client.email}</Text>
            <Text style={styles.sectionText}>
              Fecha de Nacimiento: {moment(client.birthday).format('YYYY-MM-DD')}
            </Text>
            <Text style={styles.sectionText}>Teléfono: {client.cellphone}</Text>
            <Text style={styles.sectionText}>Id de Agente: #{client.agent_id}</Text>
            <Text style={styles.sectionText}>Estado Civil: {client.civil_status.name}</Text>
            <Text style={styles.sectionText}>
              Documento: {client.document_type.name}-{client.document}
            </Text>
            <Text style={styles.sectionText}>Género: {client.gender.name}</Text>
            <Text style={styles.sectionText}>Ocupación: {client.occupation}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dirección</Text>
            <Text style={styles.sectionText}>Línea 1: {client?.addresses[0]?.line_1}</Text>
            <Text style={styles.sectionText}>Ciudad: {client?.addresses[0]?.city}</Text>
            <Text style={styles.sectionText}>
              Estado:{' '}
              {states.find((state) => state.id == client?.addresses[0]?.state_id)?.name || 'N/A'}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vehículo</Text>
            <Text style={styles.sectionText}> Código de Marca: {client?.vehicles[0]?.brand} </Text>
            <Text style={styles.sectionText}> Civi: {client?.vehicles[0]?.civi}</Text>
            <Text style={styles.sectionText}>
              {' '}
              Número de puertas: {client?.vehicles[0]?.doors_no}
            </Text>
            <Text style={styles.sectionText}> Código de modelo: {client?.vehicles[0]?.model}</Text>
            <Text style={styles.sectionText}> Pasajeros: {client?.vehicles[0]?.pasajeros}</Text>
            <Text style={styles.sectionText}> Placa: {client?.vehicles[0]?.plate}</Text>
            <Text style={styles.sectionText}> Serial: {client?.vehicles[0]?.serial}</Text>
            <Text style={styles.sectionText}> Tipo: {client?.vehicles[0]?.type || 'N/A'}</Text>
            <Text style={styles.sectionText}> Descripción: {client?.vehicles[0]?.version}</Text>
            <Text style={styles.sectionText}> Año: {client?.vehicles[0]?.year}</Text>
            <Text style={styles.sectionText}>
              {' '}
              Tasa de perdida total: {client?.vehicles[0]?.rate_total_lost || 'N/A'}{' '}
            </Text>
            <Text style={styles.sectionText}>
              {' '}
              Tasa de cobertura amplia: {client?.vehicles[0]?.rate_width_coverage || 'N/A'}{' '}
            </Text>
            <Text style={styles.sectionText}>
              {' '}
              Suma asegurada: {client?.vehicles[0]?.rate_width_coverage || 'N/A'}{' '}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Poliza</Text>
            <Text style={styles.sectionText}> Código: {policy.code} </Text>
            <Text style={styles.sectionText}>
              Estado:{' '}
              {states.find((state) => state.id == client?.addresses[0]?.state_id)?.name || 'N/A'}
            </Text>
            <Text style={styles.sectionText}>
              {' '}
              Forma de calcular la cobertura:{' '}
              {coverageFormType.find((coverage) => coverage.id == policy.coverage_form_type)
                ?.name || 'N/A'}
            </Text>
            <Text style={styles.sectionText}> Fecha: {policy.date} </Text>
            <Text style={styles.sectionText}> Observaciones: {policy.observations} </Text>
            <Text style={styles.sectionText}> Título: {policy.title} </Text>
            <Text style={styles.sectionText}>
              {' '}
              Tipo de poliza: {policiesType.find((type) => type.id == policy.type)?.name || 'N/A'}
            </Text>
            <Text style={styles.sectionText}> Valor del Vehiculo: {policy.vehicle_value} </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recibo</Text>
            <Text style={styles.sectionText}> Bonus del agente: {receipt.agent_bonus}</Text>
            <Text style={styles.sectionText}> Codigo: {receipt.code}</Text>
            <Text style={styles.sectionText}> Fecha: {receipt.issue_date}</Text>
            <Text style={styles.sectionText}>
              {' '}
              Total de suma asegurada: {receipt.total_sum_insured}
            </Text>
            <Text style={styles.sectionText}> Valido desde: {receipt.valid_from}</Text>
            <Text style={styles.sectionText}> Valido hasta: {receipt.valid_until}</Text>
            <Text style={styles.sectionText}> Prima: {receipt.prima}</Text>
          </View>
        </Page>
      )}
    </Document>
  );
};
