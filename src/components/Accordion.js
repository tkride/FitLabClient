import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';

const Accordion = ({
    title,
    content,
    expandedDefault = false,
    foldSymbol = '-',
    unfoldSymbol = '+',
    styleContainer,
    styleHeader,
    styleTitle,
    styleFolding,
    styleContentContainer,
    ...props
 }) => {
  const { styles } = useTheme();
  const stylesDefault = StyleSheet.create({
    container: {
      backgroundColor: styles.gray,
      margin: 10,
      borderRadius: styles.borderRadius,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: styles.grayHeader,
      borderRadius: styles.borderRadius,
    },
    title: {
      flex: 1,
      fontWeight: 'bold',
      borderRadius: styles.borderRadius,
    },
    arrow: {
      fontSize: 20,
    },
    content: {
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
  });
  const [expanded, setExpanded] = useState(expandedDefault);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <View {...props} style={{...stylesDefault.container, ...styleContainer}}>
      <TouchableOpacity style={{...stylesDefault.header, ...styleHeader}} onPress={toggleAccordion}>
        <Text style={{...stylesDefault.title, ...styleTitle}}>{title}</Text>
        <Text style={{...stylesDefault.arrow, ...styleFolding}}>{expanded ? foldSymbol : unfoldSymbol}</Text>
      </TouchableOpacity>
      {expanded && <View style={styleContentContainer ?? stylesDefault.content}>{content}</View>}
    </View>
  );
};

export default Accordion;
