import styles from './css/columncontainer.module.css'
import convertKeyName from '../utils/convertKeyName';


export default function ColumnContainer(props) {
    const {value, name} = props;
    const iconObject = {
        oxygen:  <i className="fa-thin fa-lungs"></i>,
        heart_rate:  <i className="fa-light fa-wave-pulse"></i>,
        blood_pressure:  <i className="fa-light fa-droplet"></i>,
        blood_glucose:  <i className="fa-sharp fa-light fa-candy"></i>,
        weight: <i className="fa-regular fa-weight-scale"></i>,
        morning_meds: <i className="fa-solid fa-prescription-bottle-medical"></i>,
        noon_meds:  <i className="fa-solid fa-prescription-bottle-medical"></i>,
        evening_meds:  <i className="fa-solid fa-prescription-bottle-medical"></i>,
        daily_steps:  <i className="fa-regular fa-shoe-prints"></i>,
        first_meal_cal:  <i className="fa-duotone fa-burger-soda"></i>,
        first_meal_time:  <i className="fa-solid fa-timer"></i>,
        second_meal_cal:  <i className="fa-duotone fa-burger-soda"></i>,
        second_meal_time:  <i className="fa-solid fa-timer"></i>,
        snack_cal:  <i className="fa-duotone fa-burger-soda"></i>,
        exercise_cal:  <i className="fa-solid fa-person-walking"></i>,
        exercise_time: <i className="fa-solid fa-timer"></i>
    }
    return (
        <div className={styles.container}>
            <div>{iconObject[name]}</div>
            <p className={styles.name}>{convertKeyName(name)}</p>
            <p className={styles.value}>{value}</p>
        </div>
    )
}