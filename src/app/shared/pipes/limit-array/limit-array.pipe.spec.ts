import { LimitArrayPipe } from './limit-array.pipe';

describe('LimitArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new LimitArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
