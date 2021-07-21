import { useState } from 'react';
import Graph from '../graph';
import { data } from '../../constants/data';
import { formatData, formatCurrency, formatMonth } from '../../utils/utils';
import './styles.scss';

/**
 * TODO:
 *  1. light/dark mode or multiple colour schemes
 *  2. scalability
 *  3. y-axis labels (0, min, max, etc)
 *  4. average spending/income line or text for past x months
 */

const Chart = () => {
  const { overallBudget, amounts, lastMonth, incomeMap, spendingMap } =
    formatData(data);

  const [selectedMonth, setSelectedMonth] = useState(lastMonth);
  const selectedMonthLabel = formatMonth(selectedMonth);
  const { income: selectedIncome } = incomeMap[selectedMonth];
  const { spending: selectedSpending } = spendingMap[selectedMonth];
  const incomeLabel = formatCurrency(selectedIncome);
  const spendingLabel = formatCurrency(selectedSpending);

  return (
    <div className="background">
      <div className="month">{selectedMonthLabel}</div>
      <div className="detail">
        <div className="legend">
          <div className="legend__row">
            <div className="legend__left spending"></div>
            <div className="legend__label">Spending</div>
          </div>
          <div className="legend__row">
            <div className="legend__left"></div>
            <div className="legend__label bold">{spendingLabel}</div>
          </div>
        </div>
        <div className="legend">
          <div className="legend__row">
            <div className="legend__left income"></div>
            <div className="legend__label">Income</div>
          </div>
          <div className="legend__row">
            <div className="legend__left"></div>
            <div className="legend__label bold">{incomeLabel}</div>
          </div>
        </div>
      </div>
      <Graph
        overallBudget={overallBudget}
        amounts={amounts}
        selectedMonth={selectedMonth}
        onMonthSelect={setSelectedMonth}
      />
    </div>
  );
};

export default Chart;
