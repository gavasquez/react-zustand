import { StateCreator } from 'zustand';
import { Task, TaskStatus } from '../../interfaces';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
/* import { produce } from 'immer'; */
import { immer } from 'zustand/middleware/immer';


interface TaskState {
  draggingTaskId?: string,
  tasks: Record<string, Task>, // {[key: string]: task}
  getTaskByStatus: ( status: TaskStatus ) => Task[],
  addTask: ( title: string, status: TaskStatus ) => void,
  setDraggingTaskId: ( taskId: string ) => void,
  removeDraggingTaskId: () => void,
  changeTaskStatus: ( taskId: string, status: TaskStatus ) => void,
  onTaskDrop: ( status: TaskStatus ) => void,
}

const storeApi: StateCreator<TaskState, [ [ "zustand/devtools", never ], [ "zustand/immer", never ] ]> = ( set, get ) => ( {
  draggingTaskId: undefined,
  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
    'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
    'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
    'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
  },
  getTaskByStatus: ( status: TaskStatus ) => {
    const tasks = get().tasks;
    //* Para recorrer un objeto Object.values()
    return Object.values( tasks ).filter( task => task.status === status );
  },
  addTask: ( title: string, status: TaskStatus ) => {
    const newTask = { id: uuidv4(), title, status };

    set( state => {
      state.tasks[ newTask.id ] = newTask;
    } );
    //* requiere npm i immer Mutando con produce
    /*  set( produce( ( state: TaskState ) => {
       state.tasks[ newTask.id ] = newTask;
     } ) ); */
    //* Forma nativa de zustand
    /* set( state => ( {
      tasks: {
        ...state.tasks,
        [ newTask.id ]: newTask
      }
    } ) ); */
  },
  setDraggingTaskId: ( taskId: string ) => {
    set( { draggingTaskId: taskId } );
  },
  removeDraggingTaskId: () => {
    set( { draggingTaskId: undefined } );
  },
  changeTaskStatus: ( taskId: string, status: TaskStatus ) => {
    /* const task = get().tasks[ taskId ];
    task.status = status; */
    set( state => {
      state.tasks[ taskId ] = {
        ...state.tasks[ taskId ], status
      };
    } );
    /* set( ( state ) => ( {
      tasks: {
        ...state.tasks,
        [ taskId ]: task,
      }
    } ) ); */
  },
  onTaskDrop: ( status: TaskStatus ) => {
    const taskId = get().draggingTaskId;
    if ( !taskId ) return;
    get().changeTaskStatus( taskId, status );
    get().removeDraggingTaskId();
  }
} );


export const useTaskStore = create<TaskState>()(
  //* Añadir Devtools de Redux
  devtools(
    //* Poner la información persistente en el localStorage.
    persist(
      immer( storeApi ),
      {
        name: 'tasks',
      }
    )
  )
);