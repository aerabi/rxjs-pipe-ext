# RxJS Pipe Extensions
[![npm](https://img.shields.io/npm/v/rxjs-pipe-ext)](https://www.npmjs.com/package/rxjs-pipe-ext)
![Node.js CI](https://github.com/aerabi/rxjs-pipe-ext/workflows/Node.js%20CI/badge.svg)

## Install
```bash
$ npm install --save rxjs rxjs-pipe-ext
```

## Usage

The available operators so far are the following:

-  [zipMap](#zipmap)
-  [flatZipMap](#flatzipmap)
-  [projectToFormer](#projecttoformer)
-  [projectToLatter](#projecttolatter)
-  [projectTo](#projectto)
-  [mapFormer](#mapformer)
-  [mapLatter](#maplatter)
-  [flatMapFormer](#flatmapformer)
-  [flatMapLatter](#flatmaplatter)

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

### projectToFormer

Projects an observable of pairs, i.e. `Observable<[T1, T2]>`, to the first coordinate,
so to get an `Observable<T1>`.

```typescript
import { of } from 'rxjs';
import { projectToFormer } from 'rxjs-pipe-ext';

of<[number, string]>([1, '1'], [2, '2'])
  .pipe(projectToFormer())
  .subscribe((n: number) => console.log(n));
```

### projectToLatter

Projects an observable of pairs, i.e. `Observable<[T1, T2]>`, to the second coordinate,
so to get an `Observable<T2>`.

```typescript
import { of } from 'rxjs';
import { projectToLatter } from 'rxjs-pipe-ext';

of<[number, string]>([1, '1'], [2, '2'])
  .pipe(projectToLatter())
  .subscribe((s: string) => console.log(s));
```

### projectTo

Projects an observable of tuples, i.e. `Observable<T[]>`, to the a custom coordinate,
so to get an `Observable<T>`.

```typescript
import { of } from 'rxjs';
import { projectTo } from 'rxjs-pipe-ext';

of([1, 2, 3], [4, 5, 6])
  .pipe(projectTo(1)) // of(2, 5)
  .subscribe(console.log);
```

### mapFormer

Transforms the first coordinate of an observable of pairs.

```typescript
import { of } from 'rxjs';
import { mapFormer } from 'rxjs-pipe-ext';

of<[number, string]>([1, '1'], [2, '2'])
  .pipe(mapFormer(x => x * 2)) // [2, '1'], [4, '2']
  .subscribe(console.log);
```

### mapLatter

Transforms the second coordinate of an observable of pairs.

```typescript
import { of } from 'rxjs';
import { mapLatter } from 'rxjs-pipe-ext';

of<[number, string]>([1, '1'], [2, '2'])
  .pipe(mapLatter(y => `${y}+${y}`)) // [1, '1+1'], [2, '2+2']
  .subscribe(console.log);
```

### flatMapFormer

Similar to [`mapFormer`](#mapformer), but works on stream-returning transformations:

```typescript
import { of } from 'rxjs';
import { flatMapFormer } from 'rxjs-pipe-ext';

of<[number, string]>([1, '1'], [2, '2'])
  .pipe(flatMapFormer(x => of(x * 2))) // [2, '1'], [4, '2']
  .subscribe(console.log);
```

### flatMapLatter

Similar to [`mapLatter`](#maplatter), but works on stream-returning transformations:

```typescript
import { of } from 'rxjs';
import { flatMapLatter } from 'rxjs-pipe-ext';

of<[number, string]>([1, '1'], [2, '2'])
  .pipe(flatMapLatter(y => of(`${y}+${y}`))) // [1, '1+1'], [2, '2+2']
  .subscribe(console.log);
```

## IDE Type Inference

If the IDE could not infer the type of operators like `zipMap`, import them from
`rxjs-pipe-ext/lib` instead:

```typescript
import { zipMap } from 'rxjs-pipe-ext/lib';
```
