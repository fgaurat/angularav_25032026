
import { createAction, props } from '@ngrx/store';
import { Actions } from '../../../core/enums/actions';
import { Todo, Todos } from '../entities/todo';


// todo

export const loadTodo = createAction(Actions.LOAD_TODOS)
export const loadTodoSuccess = createAction(Actions.LOAD_TODOS_SUCCESS,props<{todos:Todos}>())

export const deleteTodo = createAction(Actions.DELETE_TODO,props<{todo:Todo}>())
export const deleteTodoSuccess = createAction(Actions.DELETE_TODO_SUCCESS,props<{todo:Todo}>())

export const newTodo = createAction(Actions.NEW_TODO,props<{todo:Todo}>())