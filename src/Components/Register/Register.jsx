import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import {Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import ReactModal from 'react-modal'
import TextInput from '../Inputs/TextInput';
import { postData } from '../../UtilityFunctions/api';
import './register.css';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {zIndex: 1000}
    
  };

const registrationSchema = yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    email: yup.string().email('Invalid Email').required('Required'),
    confirmEmail: yup.string().email('Invalid Email').required('Required')
        .when('email', (email, schema) => 
            schema.test({
                test: confirmEmail => email === confirmEmail,
     message: "Email addresses should match"
   })
    ),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Required')
    .test({
        test: password => !! /\d/.test(password) && /[a-zA-Z]/.test(password),
        message: "Passowrd must be a mix of letters and numbers"
    }),
    confirmPassword: yup.string().min(8, 'Password must be at least 8 characters').required('Required')
        .when('password', (password, schema) => 
         schema.test({
          test: confirmPassword => password === confirmPassword,
          message: "Passwords should match"
        })
    ),
    
    completeAddress: yup.bool().oneOf([true, false]).required('must click'),
    street: yup.string().nullable().when(
        'completeAddress', {
            is: (value) => value,
            then: yup.string().nullable().required('Street and house number required')
        }
    ),

    city: yup.string().nullable().when(
        'completeAddress', {
            is: (value) => value,
            then: yup.string().nullable().required('City is required')
        }
    ),

    postcode: yup.string().nullable().when(
        'completeAddress', {
            is: (value) => value,
            then: yup.string().nullable().required('Postcode is required')
        }
    )

});

const RegistrationForm = () => {
    const [completeAddress, setCompleteAddress] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [unsuccessful, setUnsuccessful] = useState(false);
    const [error, setError] = useState(null);
    const toggleAddressInput = () => {
        setCompleteAddress(!completeAddress);
    }
    const history = useHistory();
    return(
       <div>
           <h1>Register</h1>
           <Formik 
            initialValues={{
                email: '',
                confirm_email: '',
                password: '',
                confirm_password: '',
                completeAddress: false,
                street: '',
                city: '',
                postcode: ''
            }}
            validationSchema={registrationSchema}
            onSubmit={async (values) => {
                console.log('submitting')
                setProcessing(true);
                try{
                    const result = await postData('/user/register', values);
                    if(result.status === 409){
                        setUnsuccessful(true);
                        setError('Email already in use');
                        console.log(result);
                    }else if(result.status === 200){
                        setSuccess(true);
                    }else{
                        setUnsuccessful(true);
                        setError(result.response.data);
                        console.log(result);
                    }
                    setProcessing(false);
                }catch(err){
                    console.log(err);
                    setUnsuccessful(true);
                    setError(err);
                }
                
               
            }}
           >
            <Form className="registration-form">
                    <TextInput label="First Name:" name="firstName" type="text" placeholder="" />
                    <TextInput label="Last Name:" name="lastName" type="text" placeholder="" />
                    <TextInput label="Email:" name="email" type="email" placeholder=""/>
                    <TextInput label="Confirm Email:" name="confirmEmail" type="email" placeholder="" />
                    <TextInput label="Password:" name="password" placeholder="" type="password"/>
                    <TextInput label = "Confirm Password:" name="confirmPassword" type="password"/>
                    <div className='checkbox-row'>
                    <label htmlFor="completeAddress" className="form-check-label">Complete Address: <Field className="registration-form__checkbox" type="checkbox" name="completeAddress" id="completeAddress" 
                    onClick={toggleAddressInput}/></label>
                    </div>
                    {completeAddress && (
                        <>
                        <TextInput label="Street:" name="street" placeholder=""/>
                        <TextInput label="City:" name="city" placeholder=""/>
                        <TextInput label="Postcode:" name="postcode" placeholder=""/>
                        </>
                    )}
                    <button type="submit" className='register-button'>{processing ? 'Processing' : 'Register'}</button>
            </Form>
           </Formik>
           {success && (
               <ReactModal
                isOpen={success}
                onRequestClose={() => setSuccess(false)}
                style={customStyles}
                contentLabel="Registration Successful"
               >
                   <div className='registration__modal'>
                        <h1>Account Successfully Created</h1>
                        <button type='button' className='modal-button' onClick={() => history.push('/login')} >Confirm</button>
                   </div>
               </ReactModal>
           )}
           {unsuccessful && (
               <ReactModal
                isOpen={unsuccessful}
                onRequestClose={() => setUnsuccessful(true)}
                style={customStyles}
                contentLabel="Unsuccessful Registration"
               >
                   <div className="registration__modal">
                        <h2>Error Creating Account</h2>
                        <h3>{error}</h3>
                        <button type="button" className="modal-button" onClick={()=>setUnsuccessful(false)}>Close</button>
                    </div>
               </ReactModal>
           )}
        </div> 
    )
}

export default RegistrationForm
