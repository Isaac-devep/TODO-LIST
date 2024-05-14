import { Task } from './types';

export type RootStackParamList = {
  Main: undefined;
  Details: { task: Task };
  EditTask: { task: Task };
  Settings: undefined;
};