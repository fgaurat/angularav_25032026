import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export const initialState = {value:0,name:"fred"};

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) =>({...state,value:state.value+1})),
  on(decrement, (state) => ({...state,value:state.value-1})),
  on(reset, () => initialState)
);