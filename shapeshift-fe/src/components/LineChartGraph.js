import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { data } from 'react-router-dom';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from 'date-fns'


const aggregateData = (rawData, period) => {
  if (!rawData.length) return [];

  // Find the date range of the raw data
  const sortedDates = rawData.map(d => d.periodStart).sort();
  const minDate = sortedDates[0];
  const maxDate = sortedDates[sortedDates.length - 1];

  // Fill in any missing dates with null values
  const filledData = fillMissingData(rawData, period, minDate, maxDate);

  if (period === 'day') {
    return filledData.map(item => ({
      ...item,
      date: format(new Date(item.date), 'MM/dd'),
    }));
  }

  const aggregated = filledData.reduce((acc, item) => {
    if (item.value === 0) return acc; // Skip null values during aggregation

    const itemDate = new Date(item.date);
    let key;

    if (period === 'week') {
      key = format(startOfWeek(itemDate, { weekStartsOn: 0 }), 'MMM dd');
    } else if (period === 'month') {
      key = format(startOfMonth(itemDate), 'MMM yyyy');
    }

    if (!acc[key]) {
      acc[key] = { date: key, value: 0, count: 0 };
    }
    acc[key].value += item.value;
    acc[key].count += 1;

    return acc;
  }, {});

  return Object.values(aggregated).map(item => ({
    ...item,
    value: Math.round(item.value / item.count),
  }));
};

  // Helper to fill missing time points with null values
const fillMissingData = (rawData, period, minDate, maxDate) => {
  const dataMap = rawData.reduce((map, item) => {
    map[item.periodStart] = item.totalCalories;
    return map;
  }, {});

  let intervalDates = [];
  const start = new Date(minDate);
  const end = new Date(maxDate);

  // Generate a complete series of dates for the chosen period
  if (period === 'day') {
    intervalDates = eachDayOfInterval({ start, end });
  } else if (period === 'week') {
    intervalDates = eachWeekOfInterval({ start: startOfWeek(start), end: endOfWeek(end) });
  } else if (period === 'month') {
    intervalDates = eachMonthOfInterval({ start: startOfMonth(start), end: endOfMonth(end) });
  }

  // Create the complete data array, using null for missing values
  return intervalDates.map(date => {
    const formattedDateKey = format(date, 'yyyy-MM-dd');
    const value = dataMap[formattedDateKey] ?? 0; // Use null for dates not in rawData
    return { date: formattedDateKey, value };
  });
};

export default function LineChartGraph(props) {
  const {dataSummary, period} = props


const aggregated = aggregateData(dataSummary, period)


  return (
<div>
<LineChart
      height={200}
      width={600}
      series={[
        { data: aggregated.map(d => d.value),
          area: true,
          curve: "linear",
          showMark: true,
        },
      ]}
      xAxis={[
        {
          data: aggregated.map(d => d.date),
          scaleType: 'point',
        },
      ]}
      yAxis={[{ width: 50 }]}
      margin={{right: 24}}
      sx={{
            '.MuiMarkElement-series-id-0': { // Target specific series marks
              fill: 'red',
              // Add other SVG properties like stroke, strokeWidth, etc.
            },
          }}
    />
    </div>
  );
}