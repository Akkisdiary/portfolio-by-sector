import './theme.css';

import cx from 'classnames';
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

import TickerApi from '../../api';
import { SearchIcon } from '../../components';
import { usePortfolio } from '../Manager/hooks';
import Suggestion from './Suggestion';

import type { SuggestionSelectedEventData, RenderInputComponentProps } from 'react-autosuggest';

import type { TickerDetail } from '../../api';

const SearchInput: React.FC<RenderInputComponentProps> = ({ className, ...props }) => (
  <div className="relative z-50 w-full text-slate-500">
    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
      <SearchIcon />
    </span>
    <input
      type="search"
      className="w-full rounded-md border border-slate-500 bg-slate-100 py-2 pl-10 text-sm text-slate-700 placeholder-slate-500 shadow-sm transition hover:border-slate-500  focus:rounded-b-none focus:border-slate-500 focus:bg-white focus:outline-none"
      autoComplete="off"
      {...props}
    />
  </div>
);

const Search: React.FC = (_) => {
  const [value, setValue] = useState('');
  const [suggs, setSuggs] = useState<TickerDetail[]>([]);

  const { addTicker } = usePortfolio();

  const changeHandler = (
    _: React.FormEvent<HTMLElement>,
    { newValue }: Autosuggest.ChangeEvent
  ) => {
    setValue(newValue);
  };

  const clearSuggs = () => setSuggs([]);
  const fetchSuggs = ({ value: newValue }: Autosuggest.SuggestionsFetchRequestedParams) => {
    if (newValue) {
      setValue(newValue);
      TickerApi.search(newValue).then((d) => {
        setSuggs(d);
      });
    }
  };

  const handleAddTicker = (
    _: React.FormEvent<HTMLElement>,
    { suggestion }: SuggestionSelectedEventData<TickerDetail>
  ) => {
    addTicker(suggestion);
    setValue('');
  };

  return (
    <Autosuggest<TickerDetail>
      suggestions={suggs}
      onSuggestionsFetchRequested={fetchSuggs}
      onSuggestionsClearRequested={clearSuggs}
      getSuggestionValue={(tik) => tik.symbol}
      renderSuggestion={(s, p) => <Suggestion suggestion={s} params={p} />}
      onSuggestionSelected={handleAddTicker}
      inputProps={{
        placeholder: 'Search Stocks',
        value: value,
        onChange: changeHandler,
      }}
      renderInputComponent={SearchInput}
    />
  );
};

export default Search;
