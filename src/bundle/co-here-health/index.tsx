import { useEffect } from 'react';

export function CoHereHealth() {
  useEffect(() => {
    console.log('solution', removeSAndFindLowestPossibility({ N: -5353, S: 5 }));
  }, []);

  return <div />;
}

function removeSAndFindLowestPossibility({ N, S }: { N: number; S: number }) {
  const NString = `${N}`;
  const SString = `${S}`;
  const NSplitBy5 = NString.split(SString);
  const NSplitBy5Length = NSplitBy5.length;

  let lowestPossible: number = null;

  Array(NSplitBy5Length - 1)
    .fill(0)
    .forEach((_e, inx) => {
      const nextIndex = inx + 1;

      const before = NSplitBy5.slice(0, nextIndex).join(SString);
      const after = NSplitBy5.slice(nextIndex, NSplitBy5Length).join(SString);

      const currentLowestPossible = Number(`${before}${after}`);

      if (lowestPossible === null || lowestPossible > currentLowestPossible) {
        lowestPossible = currentLowestPossible;
      }
    });

  return lowestPossible;
}
