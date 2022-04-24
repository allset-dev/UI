import { API } from 'utils';

export const FactsApi = {
  getRandomFact() {
    return API.get('https://api.chucknorris.io/jokes/random');
  },
  fetchSearchResult({ query }: { query: string }) {
    return API.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
  },
};
