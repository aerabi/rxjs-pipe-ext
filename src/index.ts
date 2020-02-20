import { flatMap, map } from 'rxjs/operators';
import { ObservableInput, ObservedValueOf, of, OperatorFunction, zip } from 'rxjs';

export function zipWith<T, R>(project: (v1: T) => R): OperatorFunction<T, [T, R]> {
  return map(val => [val, project(val)]);
}

export function flatZipWith<T, O extends ObservableInput<any>>(
  project: (value: T) => O,
): OperatorFunction<T, [T, ObservedValueOf<O>]> {
  return flatMap((val: T) => zip(of(val), project(val)));
}
