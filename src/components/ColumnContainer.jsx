import styles from './css/columncontainer.module.css'
import convertKeyName from '../utils/convertKeyName';
import {useState, useEffect, useContext} from 'react'
import { HealthContext } from './AppContext';

export default function ColumnContainer(props) {
    const {value, name} = props;
    const {selectedDay} = useContext(HealthContext)
    const [arrHtml, setArrHtml] = useState([])
    let hasTwoProps = ["blood_pressure","blood_glucose","breakfast","lunch","dinner","snacks", "medication", "sleep"]
    let meals = ["breakfast", "lunch", "dinner", "snacks"]
    useEffect( () => {
        if (Array.isArray(value)) {
        const arraysHtml = value.map((col, ind) => {
            if (hasTwoProps.includes(name)) {
                if ( name === "blood_pressure") {
                    const formattedValue = `${col.sys}/${col.dias}`
                    return (
                        <div key={ind} className={`${styles.value_container} ${styles.large}`}>
                            {!props.withInputs ? 
                                <p className={styles.value}>{formattedValue}</p>
                                :
                                <p></p>
                            }
                        </div>
                    )
                }
                if ( name === "blood_glucose") {
                    return (
                        <div className={styles.glucose}>
                            <div>
                            <label htmlFor="time">time</label>
                                <div className={`${styles.value_container} ${styles.large}`}>
                                    {!props.withInputs ? 
                                        <div>
                                            <p name="time" className={styles.value}>{col.time}</p>
                                        </div>
                                        :
                                        <p></p>
                                    }
                                </div>
                            </div>
                            <div>
                                <label htmlFor="wake">reading</label>
                                <div className={`${styles.value_container} ${styles.large}`}>
                                    {!props.withInputs ? 
                                        <div>
                                            <p name="reading" className={styles.value}>{col.reading}</p>
                                        </div>
                                        :
                                        <p></p>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
                else if ( name === "sleep") {
                    return (
                        <div key={ind} className={styles.sleep}>
                            <div>
                                <label htmlFor="wake">woke up</label>
                                <div className={`${styles.value_container} ${styles.large}`}>
                                    {!props.withInputs ? 
                                        <p name="wake" className={styles.value}>{col.wake}</p>
                                        :
                                        <p></p>
                                    }
                                </div>
                            </div>

                            <div>
                                <label htmlFor="bed">to bed</label>
                                <div key={ind} className={`${styles.value_container} ${styles.large}`}>
                                    {!props.withInputs ? 
                                        <p name="bed" className={styles.value}>{col.sleep}</p>
                                        :
                                        <p></p>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
                else if (name === 'medication') {
                    return (
                        <div key={ind}>
                            <label htmlFor="time">{ind === 0 ? "Morning" : "Evening"}</label>
                            <div className={`${styles.value_container} ${styles.large}`}>
                                {!props.withInputs ?
                                    <>
                                        <p name='time' className={styles.value}>{col}</p>
                                    </>
                                    :
                                    <p></p>
                                }
                            </div>
                        </div>
                    )
                }
                else if ( meals.includes(name)) {
                    return (
                        <div className={styles.food_container} key={ind}>
                            <div className={`${styles.value_container} ${styles.large}`}>
                                {!props.withInputs ? 
                                    <>
                                        <p name='food' className={styles.value}>{col.food}</p>
                                    </>
                                    :
                                    <p></p>
                                }
                            </div>
                            <div className={`${styles.value_container} ${styles.large}`}>
                                {!props.withInputs ? 
                                    <>
                                        <p name='calorie' className={styles.value}>{col.calories}</p>
                                    </>
                                    :
                                    <p></p>
                                }
                            </div>
                        </div>
                    )
                }
            }
        })
        setArrHtml(arraysHtml)
    }
    }, [selectedDay])
    return (
        <div className={Array.isArray(value) ? styles.array_container : styles.container}>
            <p className={styles.name}>{convertKeyName(name)}</p>
                {Array.isArray(value) ? 
                    <div className={styles.array_div}>
                        {arrHtml}
                    </div>
                    : 
                    <div className={`${styles.value_container} ${styles.small}`}>
                        { !props.withInputs ? 
                        <p className={styles.value}>{value || 'N/A'}</p>
                         :
                            <>
                                <p></p>
                                {/* {name === 'oxygen' &&  input}
                                {name === 'heart_rate' &&  input}
                                {name === 'blood_pressure' &&  input}
                                {name === 'blood_glucose' &&  input}
                                {name === 'weight' && input}
                                {name === 'medication' &&  input}
                                {name === 'daily_steps' &&  input}
                                {name === 'breakfast' &&  input}
                                {name === 'lunch' &&  input}
                                {name === 'dinner' &&  input}
                                {name === 'snacks' &&  input}*/}
                            </>
                        }
                    </div>
                }
            <div className={styles.icon_container}>
                {name === 'oxygen' &&  
                        <i className="fa-solid fa-lungs fa-xl red" ></i>
                }
                {name === 'heart_rate' &&  
                        <i className="fa-solid fa-heart-pulse fa-xl red"></i>
                }
                {name === 'blood_pressure' &&  
                        <i className="fa-solid fa-droplet fa-xl red"></i>
                }
                {name === 'blood_glucose' &&  
                        <i className="fa-solid fa-cookie-bite fa-xl brown"></i>
                }
                {name === 'weight' && 
                        <i className="fa-solid fa-weight-scale fa-xl blue"></i>
                }
                {name === 'medication' && 
                        <i className="fa-solid fa-prescription-bottle-medical fa-xl yellow"></i>
                }
                {name === 'daily_steps' &&   
                        <i className="fa-solid fa-shoe-prints fa-xl blue"></i>
                }
                {name === 'miles' &&   
                        <i className="fa-solid fa-road fa-xl silver"></i>
                }
                {name === 'calories_burned' &&   
                    <i className="fa-solid fa-fire fa-xl red"></i>                
                }
                {name === 'sleep' &&   
                    <>
                        <i className="fa-solid fa-sun fa-xl yellow"></i>    
                        <i className="fa-solid fa-bed fa-xl blue"></i>          
                    </>
                }
                {meals.includes(name) && 
                    <>
                        <i className="fa-solid fa-utensils fa-xl silver"></i>
                        <i className="fa-solid fa-clock fa-xl blue"></i>
                    </>
                }
            </div>
        </div>
    )
}