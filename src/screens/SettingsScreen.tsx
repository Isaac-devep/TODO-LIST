import React from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { useTheme } from '@react-navigation/native';

const SettingsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleSwitch = () => setIsDarkTheme(previousState => !previousState);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Dark Theme</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isDarkTheme}
      />
      {/* Agregar más configuraciones aquí según sea necesario */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  }
});

export default SettingsScreen;
