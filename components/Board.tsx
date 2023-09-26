"use client"

import { useBoardStore } from '@/store/BoardStore';
import{ useEffect} from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function Board() {
  const getBoard = useBoardStore((state) => state.getBoard);

  useEffect(() => {
    getBoard()
  }, [getBoard])
  

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
