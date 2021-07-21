import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { formatCurrency, formatMonth } from '../../utils/utils';
import './styles.scss';

const Graph = ({ overallBudget, amounts, selectedMonth, onMonthSelect }) => {
  const [budgetY, setBudgetY] = useState('0%');
  const overallBudgetLabel = formatCurrency(overallBudget);
  const maxAmount = amounts.reduce(
    (acc, { income, spending }) => Math.max(acc, income, spending),
    0.0
  );

  useEffect(() => {
    const ratio = (overallBudget / maxAmount) * 100 + '%';

    setBudgetY(ratio);
  }, [overallBudget, maxAmount]);

  return (
    <div className="graph">
      <div className="graph__bars">
        {amounts.map(({ month, income, spending }) => {
          const incomeHeight = `${(income / maxAmount) * 100}%`;
          const spendingHeight = `${(spending / maxAmount) * 100}%`;

          return (
            <div
              className="graph__bar-w"
              onClick={() => onMonthSelect(month)}
              key={`${month}-bar`}
            >
              <div
                className="graph__bar spending"
                style={{ height: spendingHeight }}
              ></div>
              <div
                className="graph__bar income"
                style={{ height: incomeHeight }}
              ></div>
            </div>
          );
        })}
        <div className="graph__budget" style={{ bottom: budgetY }}>
          <div className="graph__budget__labels">
            <div className="graph__budget__label top">Budget</div>
            <div className="graph__budget__label bottom">
              {overallBudgetLabel}
            </div>
          </div>
          <hr className="graph__budget__line" />
        </div>
      </div>
      <div className="graph__labels">
        {amounts.map(({ month }) => {
          const monthLabel = formatMonth(month, 'MMM').toUpperCase();

          return (
            <div
              className={classnames({
                graph__label: true,
                selected: month === selectedMonth
              })}
              onClick={() => onMonthSelect(month)}
              key={`${month}-label`}
            >
              {monthLabel}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Graph.propTypes = {
  overallBudget: PropTypes.number,
  amounts: PropTypes.array,
  selectedMonth: PropTypes.number,
  onMonthSelect: PropTypes.func
};

export default Graph;
