import { ASAllInput, ASText, ASForm, ASButton } from 'components';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { FactsApi } from './api';
import './index.scss';

export function Facts() {
  const [factQuery, setFactQuery] = useState('');
  const [factQueryError, setFactQueryError] = useState('');
  const [fact, setFact] = useState('');

  useEffect(handleGetRandomFact, []);

  function handleGetRandomFact() {
    FactsApi.getRandomFact()
      .then((response) => {
        setFact(response?.data?.value);
      })
      .catch(() => {
        setFact('Funny fact chucknorris API Failed');
      });
  }

  function handleFetchSearchResult(query: string) {
    FactsApi.fetchSearchResult({ query })
      .then((response) => {
        let newFact = '';

        const result = response?.data?.result;
        const resultLength = result.length;
        if (resultLength) {
          const randomFactIndex = Math.floor(Math.random() * resultLength);
          newFact = result[randomFactIndex]?.value;
        } else {
          newFact = 'No Facts with given query';
        }

        setFact(newFact);
      })
      .catch(() => {
        setFact('Funny fact chucknorris API Failed');
      });
  }

  function handleOnFactQuerySubmit(event: FormEvent) {
    event.preventDefault();

    if (factQuery) {
      handleFetchSearchResult(factQuery);
    }

    return false;
  }

  function handleOnFactQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const updatedFactQuery = event?.target?.value || '';
    const updatedFactQueryLength = updatedFactQuery.length;

    setFactQuery(updatedFactQuery);

    if (updatedFactQueryLength > 10) {
      setFactQueryError('Max 10 characters');
    } else if (updatedFactQueryLength === 0) {
      setFactQueryError('Fact query required');
    } else {
      setFactQueryError('');
    }
  }

  return (
    <div className="as-facts">
      <header className="as-facts-header">
        <img
          className="as-facts-header-image"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AoP8Amv8Anf8Amf8AnP8Al//8///0+/8Aov/t+P/O6f/4/P/T7P/f8f/q9v+u2v93w/+Ly//E5f+23v+Qzv+93v+FyP86rv8ApP9lvP9zwf+o2P8rqv9Qtf9ju/+e1P9Ksv/H5v/b7P8/rP+Z0f+bMN5ZAAAJJklEQVR4nO2d6ZqqMAyGtYsbgqAooILLOPd/iwfcgDapjrQzep68f0Vo2rSF5mva6xEEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAKU2+xWh1nf10MV8y+U8aklExkkf/XhbkQ7NeH/FRE8cjCzSZrIXn/ChepZ+GeHQnzskhlmThnfNPZsba1eVcbIxuF7ECQs2Z5ZNLtdpHoq8jchmugTGcT4+8h40p5UvMfzKyZZmBZbe5M9KKMl/5XhEPsiq1e5Xz8uolzyMDKxJfvaCTIBb+6Ht/Clyx0A8vL01ef6EG3OzuGk74Yiob/iQJqxtEr5UH9odfLEAPL5zuYNRT/kwegZJFEyhMgN50kuRB8hxR3D/toN79A8dWnybV2zQwxsM938E1jfv4HH6yn0M85aqCLRky59gxt6l1iFvYZOC3Gd7eQUJNoldqqNNs9caE/jR/Ui/A6l9DINGncE5o252iFVdgeTndaE5aNqMwCM0O30V2619s078n1KeUAPLPxdLtz4hAa1WTcvghoZ1OND1sGAK2Mj6QVzG5HnEAOI5fti7YGr8r0kTdoVYjer6bGJuzLhV0LoalXzp+3UOqD5VfbQm24fWThyq6Fz7Rh+MltCPdDpRZ/uR9a/k6ExlJmcyyV+lha/OZY2lsB82GhXvTD+XDW6Nyqx1f87nzYy594p0nQIkn4nWZw/117eyjxfvWdpuerpQc+GF5+LxXw76aO6ODjIlS+LaA3yQ1iosS+LUbLXLJsd4R/3eNuqncRC8RPfB/CY8PL36t4I7KvLqZgBOnDb3xvAJTm9W85cMngXGcd17dQ/CiXUvYLxL6SrW4iz8CPv6dYIus0p5fv+JjhyFzeUGprba8bWM7D4Fpb1mX5rjNB2lxP5Gz++C8mEmi99E8NLIlP7L7mvcZG0acJeXtE/fs174pgvzucTofEStxitJHNuMXhDeIW1pnsD6wKPjGRJW8Se7LP1F/EsffX/Y8gCIIgCOJTGPq+999qr8pPhiQbCMYEW9tdUX8XRsVA3r9hsv/QxkV7eUJA6/R3VutTn2fF3ql4yTKaFMiw/hKPLwsZXMq5QUvyXgDrehJblF034xHZh4xL4Ho9A6IpJUXrWg6HLF4oQtB5yccEFFwr+yJUeDU8wzMbBYhzKVi27LIwaSRAFmaB0cbX3Nm8Pu0luyg2XXDmqsGUuSufj5BYpdDrFJCIAMHPG8NDJbZljzprdKthDkTLrYBFSJg2K06AwAUYHr2Q3wIhRvdr+IWjgEWABUi49jxIj6GLp+5X39tmY3p+04W4k0ZEJQh6FC+B/Bkda+qwuLERmy6kR55tsEIjlVrcbA1ZOMbqveF9hqlg2ny8ZRnNFWcW1p32jy3EvVSLv//MS2tJp7F7tbzUybI+qPk6l+u5kQbRKTS0AeYhsim8GdswSGeMWKi7zAiaLUL0xodLhTyY5hpjOaS7sQHoeyUD/VJAyMQN4+R6ILkUj/ZPLG8mutqGgE2IkG8FWiPKb+Otl1Hy+Gs6uWgkmLutJOAQqYmEz6ibQOxU+7Hgkud7G7eCmUAGMviBbXEB71sK+k0Dt9FDYMKQ2BAZNaRFrNOup18l1vZb4LqrxUlclAqSOxr6nHAct6Y6syLCi9I8S9fhJ61ElR0huWsiuMgRsd2HM9mnTAgxyDb/o+LjxswPnC2WEARBEARBEARBuCZYhNtF8DG6h58SRNlZq8+yyGkw/68YbepdOJytP2Zp68rQX8ULY8ME/ba4g3/Ulou4kGfv4xHaMnoWHvE5irNZel9ZRXczQRvE3UTYHNBWyiFKEn2Hdd8Qcn0vjmqAYwysrsJphtR8FTaJi9Nh/sRoFu7SQ2IcQPRQCLR7GdG5cFdLzcOq43Cpy2gUZtUuy/I605o+ICQTWigVSHRwaUQ86NqNa8j2keRjeus8AjfxCyq7FvDfIKFZJ5vVe42w+4Pd2XW6B4Y6Kigk0+YBNA+FI/VXHcHGS14yrMP+eNgdLLuqfJhiBrrqiHXJjT2xkdEDlWFM4A6mxIsnaHYTMPzcnbrejclhGlF/tL8gmcp4+yrcQjVzjCXqfi9NTtLIHYFmIHnOQlTm4spL7ypIaZQSNvqrwMKMiLpD1QPpefCuuFKdXHUtPDPX4L2BcN0lnCNEc2osCY9ZrdmFbb/8FBDFo04QXz7oTMliT1DBtaEXnDX7rjSYZ6bxPnziM9svhBA8McRSwRyLeo5M2E2dSaN+wiQwL6pAbgqMvHCO1oevjW8BkJgFeo+A0hYBiUXfEs0B4bfYk9bYPP+Mz8PeUPm4xb7yU6UV5acYWG22aDiqIZFNU0VWVsTuYwzsnSef64YLkRvGf+/ArgsenOWPN9i8FcN4V77sjvPowfzmz9PyBW6cJh8pxRqNnnrHHI5Gn+SeBEEQBEEQBEEQRK9KdpH2hcyKvb34ycj33ie556I++UpGdiIo4UFUCary5VtsFds0F3Fl38Li7Vd+k32hicQtEvhfZmcplMU/0Xnp6NjU3TjOkzxKxqWvyMKgSVpra9RdFUxe+47CVTr287OuiacNCadjIM7QTcE0VKOkA3dBi0aaGIZFDnT7zAqm0iukOem3fmiGlbRMEK3KRHoXfJgO3oierP7AB4Z0HvodmatF4e/Ws+CKhI+GQYNh99MEB2hf1XZYm/JsdKStgIEj9Mj5Fpib3j0QD4dDyiJH2T+UkCaYCwI5hgU8Kaii1uWh2bKgw9eAM9psoJReT9xSEiAWYi30RAaeFPIJNznNFPUOqOfCLMR0Q/XluIVQGzrK2tZ+CjigIefMoLqhWoGJSg8gdaKqK7JF+1mwKAkWvKJqUP/mpgJ93QTOC3JwBumFWTPzDDI8wgofPOne/HJPhstFZ3rSInPCmy4sG4o8RN8JZpQyCZgWfVZi0hLrg6k5QV8n7me+SPSYZui8XPiY1Rv+0TO+t/pqIxrroytxdWq6lHKDl2msn8/W0akU4Y3Tk5BKvO9oHpraZKaaiL6kP03UNPGRavAXmGXtPDYWVITLemeXOLxB3pFpdC8Ql2Mr3wH+rjpfqUp79iZakyAai/PRPuneVo1PwiRJtu+032m2WK38N3AogiAIgiAIgiAIgiAIgiAIgiAIgiAIgiCIX+QfO0xg6iPTW6gAAAAASUVORK5CYII="
        />
        <ASText className="as-facts-header-heading" tag="h1">
          Chuck Norris
        </ASText>
        <ASText className="as-facts-header-sub-text" tag="h3">
          Random Facts
        </ASText>
      </header>
      <main className="as-facts-main">
        <section className="as-facts-main-left">
          <ASText className="as-facts-main-left-label" tag="h3">
            Did you know...
          </ASText>
          <ASText className="as-facts-main-left-fact">{fact}</ASText>
        </section>
        <ASForm className="as-facts-main-form" onSubmit={handleOnFactQuerySubmit}>
          <ASAllInput
            className="as-facts-main-form-input"
            error={factQueryError}
            id="fact-query"
            inputType="input"
            label="Search for Facts"
            onChange={handleOnFactQueryChange}
          />
          <ASButton
            disabled={Boolean(!factQuery || factQueryError)}
            className="as-facts-main-form-submit"
            text="Search"
            type="submit"
          />
        </ASForm>
      </main>
      <footer className="as-facts-footer">
        <ASText className="as-facts-footer-text">Built with: https://api.chucknorris.io/</ASText>
      </footer>
    </div>
  );
}
