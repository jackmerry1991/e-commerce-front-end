import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'


const Register = () => {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handFormSubmit = () => {
        console.log(email);
        console.log(confirmEmail);
        console.log(password);
        console.log(confirmPassword);
    }

    return(
        <div>
        <Formik 
            initialValues={{ email: "", password: "", confirmPassword: "", addAddressValues: false}}
        />

        <Form>
            <Field 
                name="email"
                type="email"
                label="Email"
            />
            <Field 
                name="password"
                type="password"
                label="Password"
            />
            <Field
                name="confirmPassword"
                type="password"
                label="Confirm Password"
            />
        </Form>
        </div>
    )
}

export default Register
