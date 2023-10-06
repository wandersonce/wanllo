import { databases, storage } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand';

interface BoardState{
  board: Board;
  getBoard: () => void;
  setBoardState: (board:Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;

  //Search Interface
  searchString: string;
  setSearchString: (searchString: string) => void;

  //Delete Task 
  deleteTask: (taskIndex:number, todoId: Todo, id: TypedColumn) => void;

  //New Task Input
  newTaskInput: string;
  setNewTaskInput: (input: string) => void;

  //New Task Type
  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn ) => void;

  //Upload Image
  image: File | null;
  setImage: (image: File | null) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  searchString: "",
  setSearchString: (searchString) => set({searchString}),
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({board})
  },
  setBoardState: (board) => set({board}),
  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    )
  },

  deleteTask: async(taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns);

    // Delete todoId from the newColumns
    newColumns.get(id)?.todos.splice(taskIndex, 1);

    set({board: {columns: newColumns}});

    if(todo.image){
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },

  newTaskInput: "",
  setNewTaskInput: (input:string) => set({newTaskInput : input}),
  newTaskType: "todo",
  setNewTaskType: (columnId: TypedColumn) => set({newTaskType : columnId}),

  image: null,
  setImage: (image: File | null) => set({image}),
}))