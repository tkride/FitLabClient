import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { ThemeContext } from '../context/ThemeProvider';
// const headers = ['Nombre', 'Edad', 'Género'];
// const data = [
  // ['Alice', 28, 'Mujer', 'Alice', 28, 'Mujer', 'Alice', 28, 'Mujer', 'Alice', 28, 'Mujer'],
  // ['Bob', 32, 'Hombre', 'Bob', 32, 'Hombre', 'Bob', 32, 'Hombre', 'Bob', 32, 'Hombre'],
  // ['Charlie', 37, 'Hombre', 'Charlie', 37, 'Hombre', 'Charlie', 37, 'Hombre', 'Charlie', 37, 'Hombre']
// ];

function TableCustom({headers, data}) {
  const { styles } = React.useContext(ThemeContext);
  return (
    <View style={styles.table}>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={headers} textStyle={stylesLight.text}/>
        <Rows data={data} textStyle={stylesLight.text}/>
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 4,
  },
});

export default TableCustom;