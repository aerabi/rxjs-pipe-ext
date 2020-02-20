# RxJS Pipe Extensions

## Install
```bash
$ npm install --save rxjs-pipe-ext
```

## Usage

### zipWith

Useful when one wants to transform a value, but also keep the original value to access later:

```typescript
import { of } from 'rxjs';
import { zipWith } from 'rxjs-pipe-ext';

of(1, 2, 3)
  .pipe(zipWith(x => `${x}`))
  .subscribe(([x, s]) => console.log(x, s));
```

Instead of the following code or similar solutions to store the original value of the observable:

```typescript
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

let nummericalVal: number;

of(1, 2, 3)
  .pipe(tap(x => nummericalVal = x))
  .pipe(map(x => `${x}`))
  .subscribe(s => console.log(nummericalVal, s));
```

###flatZipWith

Similar to `flatMap`, it is used when the transformation returns an observable.

```typescript
import { of } from 'rxjs';
import { flatZipWith } from 'rxjs-pipe-ext';

of(1, 2, 3)
  .pipe(flatZipWith(x => of(`${x}`)))
  .subscribe(([x, s]) => console.log(x, s));
```