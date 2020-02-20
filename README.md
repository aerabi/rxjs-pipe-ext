# RxJS Pipe Extensions

## Install
```bash
$ npm install --save rxjs rxjs-pipe-ext
```

## Usage

### zipMap

Useful when one wants to transform a value, but also keep the original value to access later:

```typescript
import { of } from 'rxjs';
import { zipMap } from 'rxjs-pipe-ext';

of(1, 2, 3)
  .pipe(zipMap(x => `${x}`))
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

### flatZipMap

Similar to `flatMap`, it is used when the transformation returns an observable.

```typescript
import { of } from 'rxjs';
import { flatZipMap } from 'rxjs-pipe-ext';

of(1, 2, 3)
  .pipe(flatZipMap(x => of(`${x}`)))
  .subscribe(([x, s]) => console.log(x, s));
```

## IDE Type Inference

If the IDE could not infer the type of operators like `zipMap`, import them from
`rxjs-pipe-ext/lib` instead:

```typescript
import { zipMap } from 'rxjs-pipe-ext/lib';
```
