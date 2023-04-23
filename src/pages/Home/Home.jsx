import { useContext, useEffect, useState } from 'react'
import { HealthContext } from '../../components/AppContext'
import RowContainer from '../../components/RowContainer'
import DatePicker from '../../components/DatePicker'
import formatData from '../../utils/formatData'
import styles from './home.module.css'

export default function Home() {
    const { userId, timeSpan } = useContext(HealthContext)
    const [daysHtml, setDaysHtml] = useState('')
    
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        fetch(`http://localhost:3030/users/all/${userId}?startDate=${timeSpan[0]}&endDate=${timeSpan[1]}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(res => res.json())
        .then(data => {
            const newDaysHtml = formatData(data.rows).map(day => {
                return (
                    <div key={day.date} className={styles.container}>
                        <h3>{day.date}</h3>
                        <h4>MEDICAL</h4>
                        <div className={styles.day_container}>
                            <RowContainer medical={day.medical} />
                        </div>
                        <hr></hr>
                        <h4>NUTRITION</h4>
                        <div className={styles.day_container}>
                            <RowContainer nutrition={day.nutrition} />
                        </div>
                    </div>
                )
            })
            setDaysHtml(newDaysHtml)
        })
    }, [timeSpan])
    
    return (
        <div>
            <h1>Home</h1>
            <div className={styles.date_container}>
                <DatePicker />
            </div>
            <div className={styles.full_container}>
                {daysHtml}
            </div>
        </div>
    )
}
