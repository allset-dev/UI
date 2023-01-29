import { API } from 'utils';

export const FactsApi = {
  getRandomFact(abortSignal: AbortSignal): Promise<Fact> {
    return API.get<Fact>('https://api.chucknorris.io/jokes/random', {
      signal: abortSignal,
    });
  },
  fetchSearchResult(abortSignal: AbortSignal, props: { query: string }) {
    const { query } = props;

    return API.get<{ result: Fact[] }>(`https://api.chucknorris.io/jokes/search?query=${query}`, {
      signal: abortSignal,
    });
  },
};

export interface Fact {
  value: string;
}
