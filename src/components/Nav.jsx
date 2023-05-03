import { NavLink } from 'react-router-dom'
import styles from './css/nav.module.css'

export default function Nav() {
    return (
        <div className={styles.container}>
            <NavLink to='/'> <i className="fa-2xl fa-solid fa-house"></i> </NavLink>
            <NavLink to='/medical'> <i className="fa-2xl fa-solid fa-staff-snake"></i> </NavLink>
            <NavLink to='/nutrition'> <i className="fa-2xl fa-solid fa-utensils"></i> </NavLink>
            <NavLink to='/settings'> <i className="fa-2xl fa-solid fa-gear"></i> </NavLink>
        </div>
    )
}