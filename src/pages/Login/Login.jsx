import styles from './login.module.css'
import {useNavigate} from 'react-router-dom'
import {useState, useContext} from 'react'
import { HealthContext } from '../../components/AppContext';

export default function Login() {
    const navigate = useNavigate();
    const {setIsAuthenticated, setUserId} = useContext(HealthContext)
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })
    
    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues(prevState => ({ ...prevState, [name]: value }));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:3030/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            })
            const data = await res.json()
            if (data.message === 'OK') {
                setFormValues({
                    email: '',
                    password: ''
                })
                localStorage.setItem('access_token',`Bearer ${data.accessToken}`)
                localStorage.setItem('user_id', data.userId)
                setIsAuthenticated(true)
                setUserId(data.userId)
                navigate("/");
            }
            else {
                window.alert(data.message)
            }
        } catch(err) {
            console.error(err)
    
        }
    }
    
    return (
        <div className={styles.container}>
            <h1>Health Tracker Login</h1>
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <input
                    className={styles.input_field}
                    name='email'
                    type="email"
                    placeholder="email"
                    value={formValues.email}
                    onChange={handleChange}
                />
                <input
                    className={styles.input_field}
                    name='password'
                    type="password"
                    placeholder="password"
                    value={formValues.password}
                    onChange={handleChange}
                />
                <button className={styles.button}>Login</button>
            </form>
            <p>Don't have an account? Sign up <a href='./register'>HERE</a></p>
        </div>
    )
}
