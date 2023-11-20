import { useState } from 'react';
import { useTaskStore } from '../stores';
import { TaskStatus } from '../interfaces';
import Swal from 'sweetalert2';


export const useTasks = ( status: TaskStatus ) => {

  const isDragging = useTaskStore( state => !!state.draggingTaskId );
  const onTaskDrop = useTaskStore( state => state.onTaskDrop );
  const addTask = useTaskStore( state => state.addTask );

  const [ onDrapOver, setOnDrapOver ] = useState( false );

  const handleDragOver = ( event: React.DragEvent<HTMLDivElement> ) => {
    event.preventDefault();
    setOnDrapOver( true );
  };

  const handleDragLeave = ( event: React.DragEvent<HTMLDivElement> ) => {
    event.preventDefault();
    setOnDrapOver( false );
  };

  const handleDrop = ( event: React.DragEvent<HTMLDivElement> ) => {
    event.preventDefault();
    setOnDrapOver( false );
    onTaskDrop( status );
  };

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire( {
      title: 'Nueva Tarea',
      input: 'text',
      inputLabel: 'Nombre de la tarea',
      inputPlaceholder: 'Ingrese el nombre de la tarea',
      showCancelButton: true,
      inputValidator: ( value ) => {
        if ( !value ) {
          return 'Debe de ingresar un nombre para la tarea';
        }
      },
    } );
    if ( !isConfirmed ) return;

    addTask( value, status );
  };



  return { isDragging, onDrapOver, handleDragOver, handleDragLeave, handleDrop, handleAddTask };
};