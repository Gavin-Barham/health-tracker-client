import 'rsuite/dist/rsuite.min.css';
import { DatePicker } from 'rsuite';
import { useContext } from 'react'
import { HealthContext } from './AppContext';
import addDays from 'date-fns/addDays';


export default function ModifyDatePicker() {
    const {modifyDate, setModifyDate} = useContext(HealthContext)
    const predefinedRanges = [
        {
          label: 'Today',
          value: addDays(new Date(), 0),
        },
        {
          label: 'Yesterday',
          value: addDays(new Date(), -1),
        }
    ]
    return (
        <DatePicker 
            size='md'
            format="MM / dd / yyyy"
            ranges={predefinedRanges}
            value={modifyDate} 
            onChange={setModifyDate}
            cleanable={false}
            shouldDisableDate={date => date >= new Date()}
            />
    )
}