import React, { useState } from 'react'
import { useHistory } from 'react-router'
import Page from '../components/Page'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { Helmet } from 'react-helmet'

export default function Signin({ token, setToken, notifyMessage }) {
    const [formState, setFormState] = useState({
        "username": "",
        "password": ""
    });
    const history = useHistory();

    const onInputChange = (e) => {
        const name = e.currentTarget.name;
        setFormState({ ...formState, [name]: e.currentTarget.value })
    }

    if (token !== "") {
        history.push("/dashboard");
        return null;
    }

    const requestLogin = (evt) => {
        evt.preventDefault();
        if (formState["username"] === "" || formState["password"] === "") {
            notifyMessage('warning', 'Empty username or password')
            return;
        }

        fetch("http://localhost:4000/v1/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formState["username"],
                password: formState["password"]
            })
        })
            .then(async (response) => {
                if (response.status !== 200) {
                    const message = (await response.json()).error.message;
                    notifyMessage('error', message)
                    return
                }

                return response.json()
            }).then((json) => {
                if (json) {
                    notifyMessage('success', 'Success')
                    console.log(json);
                    window.localStorage.setItem("jwt", json.token);
                    setToken(json.token);
                    history.push('/dashboard');
                }
            })
    }

    return (
        <Page title="Login" className="flex flex-col">
            <Helmet>
                <title>Bookstore - Login</title>
            </Helmet>
            <InputField name="Username" onEnter={requestLogin} onChange={onInputChange} type="text" placeholder="Enter a username"></InputField>
            <InputField name="Password" onEnter={requestLogin} onChange={onInputChange} type="password" placeholder="Enter a password"></InputField>
            <Button name="Go" onClick={requestLogin}></Button>
        </Page>
    )
}
