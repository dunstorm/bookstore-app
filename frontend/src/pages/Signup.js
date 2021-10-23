import React from 'react'
import Page from '../components/Page'
import InputField from '../components/InputField'
import Button from '../components/Button'

export default function Signup() {
    const handleClick = () => {
        alert("I am clicked! Props handler works")
    }
    
    return (
        <Page title="Register" className="flex flex-col">
            <InputField name="Username" type="text" placeholder="Enter a username"></InputField>
            <InputField name="Email" type="text" placeholder="Enter an email"></InputField>
            <InputField name="Password" type="password" placeholder="Enter a password"></InputField>
            <Button name="Go" onClick={handleClick}></Button>
        </Page>
    )
}
