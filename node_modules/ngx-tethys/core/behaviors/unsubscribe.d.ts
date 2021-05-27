import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Constructor } from './constructor';
export interface ThyUnsubscribe extends OnDestroy {
    ngUnsubscribe$: Subject<any>;
}
/** Mixin to augment a directive with a `disableRipple` property. */
export declare function mixinUnsubscribe<T extends Constructor<{}>>(base: T): Constructor<ThyUnsubscribe> & T;
