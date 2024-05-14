// Define la estructura de una tarea individual
export interface Task {
  id: string;           // Identificador único para la tarea
  title: string;        // Título de la tarea
  details: string;      // Detalles adicionales de la tarea
  createdAt: string;    // Fecha de creación de la tarea
  completed: boolean;   // Estado de completado de la tarea (true o false)
}

// Opcionalmente, puedes definir otros tipos que necesites para la aplicación
// Por ejemplo, si tienes diferentes estados o categorías para las tareas, puedes usar enums:
export enum TaskStatus {
Todo = "TODO",
InProgress = "IN_PROGRESS",
Done = "DONE"
}

// Si decides implementar funcionalidades adicionales como prioridades
export enum TaskPriority {
Low = "LOW",
Medium = "MEDIUM",
High = "HIGH"
}
