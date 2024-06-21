const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const generateNumbersFrom = (num: number, top: boolean) => {
  if (Number.isNaN(num)) {
    return [];
  }
  if (top) {
    return [...DIGITS.slice(0, num).reverse(), ...DIGITS.slice(num + 1, 100)];
  } else {
    return [...DIGITS.slice(num + 1, 100), ...DIGITS.slice(0, num)];
  }
};

export const isSpecialChar = (digit: string) => {
  if (digit === '.' || digit === ',') {
    return true;
  }
  return false;
};
