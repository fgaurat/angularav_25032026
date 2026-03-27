import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodoService } from "../services/todo-service";
import { exhaustMap, map, switchMap, tap } from "rxjs";
import { deleteTodo, deleteTodoSuccess, loadTodo, loadTodoSuccess, newTodo } from "../actions/todo.actions";
import { Todos } from "../entities/todo";
import { Action } from "@ngrx/store";

@Injectable({
    providedIn: 'root'
})
export class TodoEffectService {
    private actions$ = inject(Actions);
    private todoService = inject(TodoService);

    loadTodo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadTodo),
            switchMap((action: Action) => this.todoService.findAll()),
            map((todos: Todos) => loadTodoSuccess({ todos }))
        )
    })

    deleteTodo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteTodo),
            tap((action: ReturnType<typeof deleteTodo>) => {
                this.todoService.delete(action.todo).subscribe()
            }),
            map((action: ReturnType<typeof deleteTodo>) => deleteTodoSuccess({ todo: action.todo }))

        )
    })

    newTodo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(newTodo),
            exhaustMap((action: ReturnType<typeof newTodo>) => this.todoService.save(action.todo)),
            map(() => loadTodo())
        )
    })



}
