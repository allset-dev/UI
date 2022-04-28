import { API } from 'utils';

export const FactsApi = {
  getRandomFact(abortSignal: AbortSignal) {
    return API.get('https://api.chucknorris.io/jokes/random', {
      signal: abortSignal,
    });
  },
  fetchSearchResult(abortSignal: AbortSignal, props: { query: string }) {
    const { query } = props;

    return API.get(`https://api.chucknorris.io/jokes/search?query=${query}`, {
      signal: abortSignal,
    });
  },
};
