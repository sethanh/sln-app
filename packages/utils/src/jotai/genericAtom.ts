import { atom } from 'jotai';

export function genericAtom<T>(initialValue: T) {
  return atom<T>(initialValue);
}