import { createContext } from 'react';

import type { Ticker } from '../../api';
import type { TickerHolding } from './types';

export interface IPortfolioCtx {
  tickers: TickerHolding[];
  updateTicker: (symbol: string, newValue: TickerHolding) => void;
  addTicker: (tik: Ticker) => void;
  availableTickers: () => TickerHolding[];
  removeTicker: (symbolToRemove: string) => void;
}

const PortfolioCtx = createContext<IPortfolioCtx>({
  tickers: [],
  updateTicker: () => {},
  addTicker: () => {},
  availableTickers: () => [],
  removeTicker: () => {}
});

export default PortfolioCtx;
