import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {MainScreen} from './src/screens/MainScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { RootStackParamList } from './src/types/NavigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;