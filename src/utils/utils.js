import { sortBy, keyBy } from 'lodash';
import moment from 'moment';

export const formatData = data => {
  const { overall_budget: overallBudget, income, spending } = data;

  if (income.length !== spending.length) {
    throw Error('Length of income does not equal to the length of spending');
  }

  const sortedIncome = sortBy(income, 'month');
  const incomeMap = keyBy(income, 'month');
  const spendingMap = keyBy(spending, 'month');

  const amounts = sortedIncome.map(({ month }) => ({
    income: incomeMap[month].income,
    spending: spendingMap[month].spending,
    month
  }));

  return {
    overallBudget,
    amounts,
    lastMonth: sortedIncome[sortedIncome.length - 1].month,
    incomeMap,
    spendingMap
  };
};

export const formatMonth = (month, format = 'MMMM') => {
  return moment()
    .month(month - 1)
    .format(format);
};

export const formatCurrency = (value, locale = 'en-US') => {
  switch (locale) {
    case 'en-US':
      return `$${value}`;
    default:
      return value;
  }
};
