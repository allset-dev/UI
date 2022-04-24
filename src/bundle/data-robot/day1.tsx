import { useEffect } from 'react';

// Pseudo classes
// https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements

// Media queries
// https://www.w3schools.com/cssref/css3_pr_mediaquery.asp

// HTML 5 tags
// https://www.htmlgoodies.com/html5/new-tags-in-html5/

export function DataRobotInterviewDay1() {
  useEffect(() => {
    console.log('asd', printPairs([1, 5, 7, -1, 5], 6));
    console.log('remove alternative char:', removeAlternatingCharacters('ABBABAABBB'));

    const str = 'never odd or even';
    console.log(wtf(str));
    // neve ro ddo reven

    const asd = [{ name: 'o1ga' }, { name: 'st3ve' }, { name: 'hel3n' }, { name: 'tren7' }];
    console.log(extractMessage(asd));
    // ['1', '3', '3', '7']

    const arr = [1, 2, [3, [4, 5], 6, 7], 'a'];
    console.log(flatten(arr));
    // [1,2,3,4,5,6,7,'a']

    console.log('remove duplicate:', removeDuplicate('Lets do some coding'));

    console.log(
      equalStacks([
        [3, 2, 1, 1, 1],
        [4, 3, 2],
        [1, 1, 4, 1],
      ])
    );
  }, []);

  function printPairs(numbers: number[], sum: number) {
    const matchedPairs: number[][] = [];

    numbers.reduce((numberA: number[], numberB: number) => {
      numberA
        .filter((a) => a + numberB === sum)
        .map((matchedNumber) => {
          matchedPairs.push([matchedNumber, numberB]);
        });

      return [...numberA, numberB];
    }, []);

    return matchedPairs;
  }

  function removeAlternatingCharacters(char: string) {
    return char.split('').reduce((noAlternatingChar, newChar) => {
      const lastNoAlternatingChar = noAlternatingChar[noAlternatingChar.length - 1];

      return lastNoAlternatingChar === newChar ? noAlternatingChar : noAlternatingChar + newChar;
    });
  }

  // Question 1: WTF

  function wtf(s: string) {
    return s.split('').reverse().join('');
  }

  // Question 2: Hidden Message

  function extractMessage(data: { name: string }[]) {
    return data.map(({ name = '' }) => /\d/.exec(name)?.[0]);
  }

  // Question 3: Flat to the Past

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function flatten(unFlatArrs: any[]): number | string[] {
    return unFlatArrs.reduce((unFlatArrA, unFlatArrB) => {
      if (Array.isArray(unFlatArrB)) {
        const flatArr = [...unFlatArrA, ...unFlatArrB];
        return flatten(flatArr);
      } else {
        return [...unFlatArrA, unFlatArrB];
      }
    }, []);
  }

  function removeDuplicate(string: string) {
    const stringSplit = string.split(' ').join('').split('');

    return stringSplit
      .filter((s) => {
        const noOfMatches = string.match(new RegExp(s, 'g'));

        return noOfMatches.length === 1;
      })
      .join('');
  }

  // equal stack question

  function equalStacks(stacks: number[][]) {
    let equalStackHeight = 0;

    const totalLength = stacks.reduce((stackA, stackB) => {
      return stackA + stackB.length;
    }, 0);

    const stacksValue = stacks.map((stack) => {
      return stack.reduce((stack1, stack2) => stack1 + stack2, 0);
    });

    Array(totalLength)
      .fill(0)
      .find(() => {
        const stackHeight = isStacksEqual(stacks, stacksValue);
        const isEqual = typeof stackHeight === 'number';

        if (isEqual) {
          equalStackHeight = stackHeight;
        }

        return isEqual;
      });

    return equalStackHeight;
  }

  function isStacksEqual(stacks: number[][], stacksValue: number[]) {
    const isEqual = allEqual(stacksValue);

    if (isEqual) {
      return stacksValue[0];
    } else {
      const maxStackValue = Math.max(...stacksValue);
      const maxStackIndex = stacksValue.indexOf(maxStackValue);
      const maxStack = stacks[maxStackIndex];
      const slicedValue = maxStack.splice(0, 1);
      stacksValue[maxStackIndex] -= slicedValue[0];
    }
  }

  function allEqual(arr: number[]) {
    return arr.every((val) => val === arr[0]);
  }

  return <div />;
}
