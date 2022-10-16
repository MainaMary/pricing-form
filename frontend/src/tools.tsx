export const commafy = (num: number) => {
  const val = num.toLocaleString();
  return `KSH ${val}`;
};
export const hasValue = (obj: any) => {
  for (const i in obj) {
    if (obj[i]) {
      return true;
    }
  }
  return false;
};
