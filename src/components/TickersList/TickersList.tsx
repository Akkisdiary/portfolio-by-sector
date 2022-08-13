import React from 'react';

import { usePortfolio } from '../../Portfolio';
import TickersListItem from './TickersListItem';

const TickersList: React.FC<{}> = () => {
  const { tickers } = usePortfolio();

  return (
    <div className="grid gap-1">
      {tickers.map((tik) => (
        <TickersListItem key={tik.symbol} ticker={tik} />
      ))}
    </div>
  );
};

export default TickersList;