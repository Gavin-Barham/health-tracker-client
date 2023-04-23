import { DateRangePicker, Stack } from 'rsuite';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import {useContext} from 'react'
import { HealthContext } from './AppContext';
import 'rsuite/dist/rsuite.min.css';

export default function DatePicker () {
    const {timeSpan, setTimeSpan} = useContext(HealthContext);


const predefinedRanges = [
  {
    label: 'Today',
    value: [addDays(new Date(), 0), addDays(new Date(), 0)],
  },
  {
    label: 'Yesterday',
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
  },
  {
    label: 'This week',
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
  },
  {
    label: 'Last 7 days',
    value: [subDays(new Date(), 6), new Date()],
  },
  {
    label: 'Last 30 days',
    value: [subDays(new Date(), 29), new Date()],
  },
  {
    label: 'This month',
    value: [startOfMonth(new Date()), new Date()],
  },
  {
    label: 'Last month',
    value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
  },
  {
    label: 'This year',
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
  },
  {
    label: 'Last year',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
  },
  {
    label: 'All time',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
  },
];



    return (
      <Stack direction="column" spacing={8} alignItems="flex-start">
        <DateRangePicker
          position="auto"
          ranges={predefinedRanges}
          value={timeSpan}
          onChange={setTimeSpan}
          showOneCalendar
          format='dd / MM / yyyy'
          style={{ width: 256}}
          cleanable={false}
          shouldDisableDate={date => date >= new Date()}
          
        />
    </Stack>
      );
}
