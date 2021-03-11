import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import FEATURE_FLAGS from './app/config/flags.constants';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const featureFlagsProvider = {
  provide: 'INITIAL_STORE',
  useValue: { ANIMATION_ENABLED: false } as FEATURE_FLAGS,
};
const providers = [featureFlagsProvider];

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
