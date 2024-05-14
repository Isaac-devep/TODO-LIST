import axios from './axiosConfig';

// Función para obtener todos los "todos" de un usuario específico
export const getTodos = async (userId) => {
  try {
    const response = await axios.get(`/todos/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todos for user ${userId}:`, error);
    throw error;
  }
};

// Función para crear un nuevo "todo"
export const createTodo = async (title, userId) => {
  try {
    // Asegúrate de que userId es un número antes de enviarlo
    const numericUserId = Number(userId);
    const response = await axios.post(`/todos`, { title, user_id: numericUserId });
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Función para eliminar un "todo" por ID
export const deleteTodo = async (id) => {
  console.log(`Attempting to delete todo with ID ${id}`);
  try {
    const response = await axios.delete(`/todos/${id}`);
    console.log(`Delete response:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting todo with ID ${id}:`, error);
    throw error;
  }
};

// Función para actualizar un "todo" por ID
export const updateTodo = async (id, updatedData) => {
  // Asegúrate de que el campo 'completed' es un valor booleano
  if ('completed' in updatedData && typeof updatedData.completed !== 'boolean') {
    throw new Error('Invalid value for completed. Expected boolean.');
  }

  try {
    const response = await axios.put(`/todos/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating todo with ID ${id}:`, error);
    throw error;
  }
};