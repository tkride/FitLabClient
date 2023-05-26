// import React from 'react';
// import { View } from 'react-native';
// import ECharts from '@wuba/react-native-echarts';
// import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';

// const option = {
//   title: {
//     text: 'Gráfica de barras apiladas'
//   },
//   tooltip: {},
//   legend: {
//     data: ['Ejercicios', 'Series', 'Repeticiones', 'Frecuencia']
//   },
//   xAxis: {
//     data: ['Ejercicio 1', 'Ejercicio 2', 'Ejercicio 3', 'Ejercicio 4', 'Ejercicio 5']
//   },
//   yAxis: {},
//   series: [
//     {
//       name: 'Ejercicios',
//       type: 'bar',
//       stack: 'total',
//       data: [120, 132, 101, 134, 90]
//     },
//     {
//       name: 'Series',
//       type: 'bar',
//       stack: 'total',
//       data: [220, 182, 191, 234, 290]
//     },
//     {
//       name: 'Repeticiones',
//       type: 'bar',
//       stack: 'total',
//       data: [150, 232, 201, 154, 190]
//     },
//     {
//       name: 'Frecuencia',
//       type: 'bar',
//       stack: 'total',
//       data: [320, 332, 301, 334, 390]
//     }
//   ]
// };

// function StackedBarChart() {
//   return (
//     <View style={{ flex:1 }}>
//       <ECharts option={option} />
//     </View>
//   );
// }

// export default StackedBarChart;
