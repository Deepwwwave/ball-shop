import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20
  },
  section: {
    marginBottom: 10
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    borderBottom: '1px solid #cccccc',
    paddingBottom: 10
  },
  customerInfo: {
    marginBottom: 10
  },
  itemTable: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: 5
  },
  tableRow: {
    borderBottom: '1px solid #cccccc',
    padding: 5
  },
  totalRow: {
    borderTop: '1px solid #cccccc',
    paddingTop: 5
  }
});

// Create Document Component
const InvoicePDF = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Facture</Text>
        <View style={styles.customerInfo}>
          <Text><strong>Nom du client:</strong> {invoiceData.customerName}</Text>
          <Text><strong>Date:</strong> {invoiceData.date}</Text>
          <Text><strong>Numéro de facture:</strong> {invoiceData.invoiceNumber}</Text>
        </View>
        <table style={styles.itemTable}>
          <thead style={styles.tableHeader}>
            <tr>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} style={styles.tableRow}>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>{item.unitPrice}</td>
                <td>{item.quantity * item.unitPrice}</td>
              </tr>
            ))}
            <tr style={styles.totalRow}>
              <td colSpan="3">Total:</td>
              <td>{invoiceData.total}</td>
            </tr>
          </tbody>
        </table>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;

