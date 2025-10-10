import { atom, PrimitiveAtom } from 'jotai';

export function genericAtom<T>(initialValue: T): PrimitiveAtom<T> & { init: T } {
  return atom(initialValue) as PrimitiveAtom<T> & { init: T };
}