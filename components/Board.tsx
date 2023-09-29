"use client"

import { useBoardStore } from '@/store/BoardStore';
import{ useEffect} from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';

export default function Board() {
  const [board, getBoard, setBoardState] = useBoardStore((state) => [state.board, state.getBoard, state.setBoardState]);

  useEffect(() => {
    getBoard()
  }, [getBoard])

  const handleOnDragEnd =(result: DropResult) => {
    const {destination, source, type} = result;

    //Control the position of each board/card and handle it to keep the position after move
    if(!destination) return;

      //*Handle column drag
      if(type==="column"){
        const entries = Array.from(board.columns.entries());
        const [removed] = entries.splice(source.index, 1);
        entries.splice(destination.index, 0 , removed);

        const rearrangedColumns = new Map(entries);
      }
  };
  

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="boardDrop" direction="horizontal" type="column">
        {(provided) => (
          <div
          className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {/* Redenring all columns */}
            {Array.from(board.columns.entries()).map(([id,column] ,index) => (
              <Column 
                key={id}
                id={id}
                todos={column.todos}
                index={index}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

//3:18