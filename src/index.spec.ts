import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { zipWith } from './index';

describe('rxjs-pipe-ext', () => {
  it('zipWith', done => {
    of(2)
      .pipe(zipWith(num => `${num}`))
      .pipe(
        tap(([num, str]) => {
          expect(num).toEqual(2);
          expect(str).toEqual('2');
        }),
      )
      .subscribe(done);
  });
});
