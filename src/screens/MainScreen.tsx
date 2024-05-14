import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../types/types';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/NavigationTypes';
import * as api from '../services/api';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export const MainScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState<number | null>(null);  // Asegúrate de que este valor sea el correcto
  const navigation = useNavigation<MainScreenNavigationProp>();

  useEffect(() => {
    // Simulación: establece aquí el userId cuando el componente se monta
    // Deberías obtener este valor de tu estado de autenticación o similar
    setUserId(1);
  }, []);

  const fetchTasks = useCallback(async () => {
    if (!userId) return;
    try {
      const fetchedTasks = await api.getTodos(userId);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [fetchTasks])
  );

  const handleAddTask = async () => {
    if (!userId) {
      alert('User ID is not set.');
      return;
    }
    if (input.trim().length === 0) {
      alert('Please enter a task title.');
      return;
    }
    try {
      const newTask = await api.createTodo(input, userId);
      setTasks([...tasks, newTask]);
      setInput('');
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    navigation.navigate('EditTask', { task });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add a new task"
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />
      <Button title="Add Task" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Details', { task: item })}>
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
            <Button title="Edit" onPress={() => handleEditTask(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    flex: 1,
  }
});
