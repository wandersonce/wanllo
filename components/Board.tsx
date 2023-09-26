"use client"
import{ useEffect} from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function Board() {
  useEffect(() => {
    //getBoard
  }, [])
  

  return (
    <DragDropContext>
      <Droppable droppableId='board' direction='horizontal' type='column'>
        {(provided) => (
          <div>
            {/* Redenring all columns */}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
