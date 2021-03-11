import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import FEATURE_FLAGS from './flags.constants';

/**
 * Variable used to create the Feature Values type.
 */
const _typescriptHelper = {} as FEATURE_FLAGS;

type FEATURE = keyof FEATURE_FLAGS;
type FEATURE_VALUES = typeof _typescriptHelper[FEATURE];

/**
 * Feature flagging configuration service.
 *
 * It can be refactored into an abstract ConfigurationService that
 * can be implemented either by hypothetical LocalConfiguration or
 * RemoteConfiguration concrete classes.
 *
 * Initial configuration values can be set during bootstraping using
 * the `FEATURE_FLAGS` dependency injection token.
 */
@Injectable({
  providedIn: 'root',
})
export class FeatureFlagConfigurationService {
  private _store;
  constructor(
    @Inject('FEATURE_FLAGS') @Optional() initialStore?: FEATURE_FLAGS
  ) {
    const DEFAULT_CONFIG = { ANIMATION_ENABLED: true };
    this._store = new BehaviorSubject<FEATURE_FLAGS>(
      initialStore || DEFAULT_CONFIG
    );
  }

  get$(feature: FEATURE) {
    return this._store.pipe(map((store) => store[feature]));
  }

  get(prop: FEATURE) {
    return this._store.value[prop];
  }

  /**
   * Mutate the key-value pair of a feature in the store.
   *
   * @param feature feature to mutate
   * @param value new value of the feature to mutate
   */
  set(feature: FEATURE, value: FEATURE_VALUES): void {
    this._store.next({ ...this._store.value, [feature]: value });
  }
}
