import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import FEATURE_FLAGS from './flags.constants';

/**
 * Configuration service.
 *
 * It can be refactored into an abstract ConfigurationService that
 * can be implemented either by hypothetical LocalConfiguration or
 * RemoteConfiguration concrete classes.
 *
 * Initial configuration values can be set during bootstraping using
 * the `INITIAL_STORE` dependency injection token.
 */
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _store;
  constructor(
    @Inject('INITIAL_STORE') @Optional() initialStore?: FEATURE_FLAGS
  ) {
    const DEFAULT_CONFIG = { ANIMATION_ENABLED: true };
    this._store = new BehaviorSubject<FEATURE_FLAGS>(
      initialStore || DEFAULT_CONFIG
    );
  }

  get(prop: keyof FEATURE_FLAGS) {
    return this._store.value[prop];
  }
}
