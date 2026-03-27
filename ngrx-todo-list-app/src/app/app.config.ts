import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { todoReducer } from './features/todo/reducers/todo.reducer';
import { TodoEffectService } from './features/todo/effects/todo-effect.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({todoList:todoReducer}),
    provideEffects(TodoEffectService),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
