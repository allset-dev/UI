import { AxiosPromise } from 'axios';
import { render, act, RenderResult } from '@testing-library/react';
import { expect } from '@jest/globals';

import { Facts } from './index';
import { FactsApi } from './api';

const fact = 'Funny fact chucknorris API Failed';

describe('<Facts />', function () {
  let mockedGetRandomFact: AxiosPromise<any>;
  let component: RenderResult;

  beforeEach(async () => {
    // @ts-ignore
    mockedGetRandomFact = jest.spyOn(FactsApi, 'getRandomFact').mockImplementationOnce(() => {
      return new Promise((resolve) => {
        return resolve({
          data: { value: fact },
          status: 0,
          statusText: '',
          headers: {},
          config: {},
        });
      });
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
