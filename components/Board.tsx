"use client"

import { useBoardStore } from '@/store/BoardStore';
import{ useEffect} from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function Board() {
  const [board, getBoard] = useBoardStore((state) => [state.board, state.getBoard]);

  useEffect(() => {
    getBoard()
  }, [getBoard])
  
  console.log(board)

  return (
    <h1>here</h1>
    // <DragDropContext>
    //   <Droppable droppableId='board' direction='horizontal' type='column'>
    //     {(provided) => (
    //       <div>
    //         {/* Redenring all columns */}
    //       </div>
    //     )}
    //   </Droppable>
    // </DragDropContext>
  )
}
