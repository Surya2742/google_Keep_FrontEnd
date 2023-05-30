import React, { useState } from 'react'
import axios from 'axios'
import './Practice.css'
const Practice = () => {
    const [user, setUser] = useState({ email: "", password: "" })

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(value)
    }

    const submitHandler = (event) => {
        event.preventDefault();
            axios.post("http://localhost:8080/login", user)
                .then((Response) => {
                    alert(Response.data.message)
                })
                .catch((err) => { console.log(err.response.data) })
    }

    return (
        <div className="contain">
            <div>
                <h4>Login</h4>
                <label>Email</label>
                <input onChange={onChangeHandler} name="email" type="text"></input>
                <label>Password</label>
                <input onChange={onChangeHandler} name="password" type="password"></input>
                <button onClick={submitHandler}>Login</button>
            </div>
        </div>
    )
}
export default Practice