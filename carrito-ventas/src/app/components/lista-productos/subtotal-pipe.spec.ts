import { SubtotalPipe } from './subtotal.pipe';

describe('SubtotalPipe', () => {
  it('create an instance', () => {
    const pipe = new SubtotalPipe();
    expect(pipe).toBeTruthy();
  });

  it('debe multiplicar precio por cantidad', () => {
    const pipe = new SubtotalPipe();
    expect(pipe.transform(100, 3)).toBe(300);
  });

  it('debe devolver 0 si la cantidad es 0', () => {
    const pipe = new SubtotalPipe();
    expect(pipe.transform(500, 0)).toBe(0);
  });
});