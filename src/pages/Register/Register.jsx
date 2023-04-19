import styles from './register.module.css'
import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: ''
    })
    
    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues(prevState => ({ ...prevState, [name]: value }));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3030/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formValues)
        })
          .then(res => res.json())
          .then(data => {
            if (data.message === 'user created successfully') {
              setFormValues({
                username: '',
                email: '',
                password: ''
              });
              navigate("/login");
            } else {
              window.alert(data.message);
            }
          })
          .catch(err => console.error(err));
      };
      
    return (
        <div className={styles.container}>
            <h1>Health Tracker Register</h1>
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <input
                    className={styles.input_field}
                    name='username'
                    placeholder="username"
                    value={formValues.username}
                    onChange={handleChange}
                />
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
                <button className={styles.button}>Register</button>
            </form>
            <p>Already have an account? Login <a href='./login'>HERE</a></p>
        </div>
    )
}
