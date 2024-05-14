import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getTodosByID(id) {
  const [rows] = await pool.query(
    `
    SELECT todos.*, shared_todos.shared_with_id
    FROM todos
    LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
    WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?
  `,
    [id, id]
  );
  return rows;
}

export async function getTodo(id) {
  const [rows] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
  return rows[0];
}

export async function getSharedTodoByID(id) {
  const [rows] = await pool.query(
    `SELECT * FROM shared_todos WHERE todo_id = ?`,
    [id]
  );
  return rows[0];
}

export async function getUserByID(id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
}

export async function getUserByEmail(email) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
  return rows[0];
}

export async function createTodo(user_id, title) {
  if (isNaN(Number(user_id))) {
    throw new Error("user_id is not a valid number"); // Valida que user_id sea un número
  }
  const [result] = await pool.query(
    `
    INSERT INTO todos (user_id, title)
    VALUES (?, ?)
  `,
    [Number(user_id), title]
  );
  const todoID = result.insertId;
  return getTodo(todoID);
}

export async function deleteTodo(id) {
  console.log(`Deleting todo with id ${id}`);
  const [result] = await pool.query(`DELETE FROM todos WHERE id = ?`, [id]);
  console.log(`Delete result:`, result);
  return result;
}

export async function toggleCompleted(id, value) {
  const newValue = value ? 1 : 0; // Ajusta el valor a 1 o 0 en lugar de "TRUE" o "FALSE"
  const [result] = await pool.query(
    `
    UPDATE todos
    SET completed = ?
    WHERE id = ?;
  `,
    [newValue, id]
  );
  return result;
}

export async function updateTodo(id, { title, details, completed }) {
  console.log(`Executing update query for todo ${id} with data:`, { title, details, completed });
  try {
    const [result] = await pool.query(
      `
      UPDATE todos
      SET title = ?, details = ?, completed = ?
      WHERE id = ?;
    `,
      [title, details, completed ? 1 : 0, id] // Asegúrate de convertir `completed` a 1 o 0
    );
    console.log('Update result:', result);
    return getTodo(id);
  } catch (error) {
    console.error('Failed to execute update query:', error);
    throw error;
  }
}

export async function shareTodo(todo_id, user_id, shared_with_id) {
  const [result] = await pool.query(
    `
    INSERT INTO shared_todos (todo_id, user_id, shared_with_id)
    VALUES (?, ?, ?)
  `,
    [todo_id, user_id, shared_with_id]
  );
  return result.insertId;
}
