// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount, MountConfig } from 'cypress/angular';
import { Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { API_BASE_URL } from '../../src/app/tokens';
import { environment } from '../../src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

const imports = [TranslateModule.forRoot(), HttpClientModule];
const providers = [
  {
    provide: API_BASE_URL,
    useValue: environment.apiBaseUrl,
  },
];
function customMount<T>(component: string | Type<T>, config?: MountConfig<T>) {
  if (!config) {
    config = { imports, providers };
  } else {
    config.imports = [...(config?.imports || []), ...imports];
    config.providers = [...(config?.providers || []), ...providers];
  }
  return mount<T>(component, {
    ...config,
    autoDetectChanges: true,
    autoSpyOutputs: true,
  });
}

Cypress.Commands.add('mount', customMount);
