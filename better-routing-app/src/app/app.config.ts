import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    // withComponentInputBinding() permet d'injecter les données du resolver
    // directement en tant qu'input() dans les composants
    provideRouter(routes, withComponentInputBinding()),
  ],
};
