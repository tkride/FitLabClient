import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';
import { useTheme } from '../context/ThemeProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';

function TableCustom({headers, data, style, onClickHeader}) {
  const { styles } = useTheme();

  useEffect(() => {
    // console.log({headers})
  }, [data])
  
  const handleClickHeader = (info) => {
    if(onClickHeader) {
      onClickHeader(info._targetInst.child.pendingProps);
    }
    // console.log(info);
    console.log(info._targetInst.child.pendingProps);
  }

  return (
    <View style={styles.view}>
      <Table borderStyle={style ?? styles.tableRoutine}>
        <Row
          data={headers}
          style={styles.tableHeadStyle}
          textStyle={styles.tableHeadText}
          onPress={handleClickHeader}
        />
        <Rows data={data} style={styles.tableRowStyle} textStyle={styles.tableText}/>
      </Table>
    </View>
  );
}

export default TableCustom;