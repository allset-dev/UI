export const percentage = {
  getValue: (percentageOfValueIWant: number, valueIKnow: number, percentageOfValueIKnow = 100) => {
    return (percentageOfValueIWant / percentageOfValueIKnow) * valueIKnow;
  },
  getPercentage: (
    valueOfPercentageIWant: number,
    valueOfPercentageIKnow: number,
    percentageOfValueIKnow = 100
  ) => {
    return (valueOfPercentageIWant / valueOfPercentageIKnow) * percentageOfValueIKnow;
  },
};
