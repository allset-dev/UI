import { expect } from '@jest/globals';
import { RenderResult, act, render } from '@testing-library/react';

import { Fact, FactsApi } from './api';
import { Facts } from './index';

const fact = 'Funny fact chucknorris API Failed';

describe('<Facts />', function () {
  let mockedGetRandomFact: jest.SpyInstance<Promise<Fact>>;
  let component: RenderResult;

  beforeEach(async () => {
    mockedGetRandomFact = jest.spyOn(FactsApi, 'getRandomFact').mockImplementationOnce(() => {
      return Promise.resolve({ value: fact });
    });

    await act(async () => {
      component = render(<Facts />);
    });
  });

  it('Should call getRandomFact on page load', () => {
    expect(mockedGetRandomFact).toHaveBeenCalledTimes(1);
  });

  it('Should Fact be rendered on page load', () => {
    const value: Element = component.container.querySelector('.as-facts-main-left-fact');
    expect(value.textContent).toEqual(fact);
  });
});
