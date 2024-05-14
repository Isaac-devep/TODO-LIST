import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Switch, Text } from 'react-native';
import { Task } from '../types/types';  // Asegúrate de que tus tipos están en esta ruta
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/NavigationTypes';
import { updateTodo } from '../services/api'; // Asegúrate de que la ruta es correcta para importar la API

// Definir el tipo específico de propiedades de ruta para esta pantalla
type EditTaskScreenRouteProp = RouteProp<RootStackParamList, 'EditTask'>;

const EditTaskScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<EditTaskScreenRouteProp>();
  const [task, setTask] = useState<Task>(route.params.task);

  const handleSaveChanges = async () => {
    try {
      const updatedTask = {
        title: task.title,
        details: task.details,
        completed: !!task.completed // Asegúrate de que `completed` es un booleano
      };
      console.log('Saving changes for task:', updatedTask);
      await updateTodo(task.id, updatedTask);
      Alert.alert('Success', 'Task updated successfully');
      navigation.goBack(); // Regresa a la pantalla anterior después de actualizar
    } catch (error) {
      Alert.alert('Error', 'Failed to update the task');
      console.error('Error updating task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={task.title}
        onChangeText={(text) => setTask({ ...task, title: text })}
        placeholder="Task Title"
      />
      <TextInput
        style={styles.input}
        value={task.details}
        onChangeText={(text) => setTask({ ...task, details: text })}
        placeholder="Task Details"
        multiline
      />
      <View style={styles.switchContainer}>
        <Text>Completed:</Text>
        <Switch
          value={task.completed}
          onValueChange={(value) => setTask({ ...task, completed: value })}
        />
      </View>
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default EditTaskScreen;