import React, { useEffect, useState } from 'react';
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import { db,auth } from "../firebase";
import { useStateValue } from '../StateProvider';
// import db from "../firebase";
function Login() {
    const [{user},dispatch]= useStateValue();
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const vendor = ()=>{
      history('/vendorlogin');
    }
    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
               db.collection('Items').onSnapshot((snapshot)=>{
                snapshot.docs.map((doc) => {
                  // console.log(doc.data());
                  if(doc.data().email == email && doc.data().pass == password)
                  {
                    console.log(doc.data());
                    dispatch({
                      type :'SIGN_IN',
                      details : {
                        id: doc.id,
                        userinfo: doc.data(),
                      }, 
                    })
                  }
                })
                // console.log(temp);
               })
                history('/');
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user with email and password
                if (auth) {
                db.collection('Items').add({
                    email: email,
                    pass: password,
                  }).then((docRef)=>{console.log(docRef.id);
                            db.collection('Items').doc(docRef.id).update({email:"WHy this email", id: docRef.id})
                            dispatch({
                              type: 'SIGN_IN',
                              details:{
                                id: docRef.id,
                                userinfo: {
                                  email: email,
                                  pass: password,
                                }
                              }
                            })
                  }).catch((err) => {console.error(err);});
                    history('/');
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className='login__registerButton'>Create your Amazon Account</button>
                <button onClick={vendor} className='login__registerButton'>I am a Vendor</button>
            </div>
        </div>
    )
}

export default Login
