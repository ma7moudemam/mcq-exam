import React, { useState , Fragment } from 'react'
import classes from './Register.module.css'
import {Link} from 'react-router-dom'
import { TextField } from "@mui/material";

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nameIsvalid, setNameIsvalid] = useState(true);
  const [emailIsvalid, setEmailIsvalid] = useState(true);
  const [passwordIsvalid, setPasswordIsvalid] = useState(true);
  const [passwordConfirmIsvalid, setPasswordConfirmIsvalid] = useState(true);
  const [emailIsExist, setEmailIsExist] = useState(false);


  const emailHandler = (event) => {
    setEmail(event.target.value);
    if (email.trim().length > 0) {
      setEmailIsvalid(true);
    }
  }

  const emailBlurHandler = () => {
    if(email.trim().length === 0) {
      setEmailIsvalid(false);
    }
  }

  const nameHandler =(event)=>{
    setName(event.target.value);
    if(name.trim().length > 0){
      setNameIsvalid(true);
    }
  }

  const nameBlurHandler = () => {
    if(name.trim().length === 0){
      setNameIsvalid(false);
    }
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    if (password.trim().length > 6) {
      setPasswordIsvalid(true);
    }
  }

  const passwordBlurHandler = () => {
    if(password.trim().length < 6){
      setPasswordIsvalid(false);
    }
  }

  const passwordConfirmHandler = (event) => {
    setPasswordConfirm(event.target.value);
    if (passwordConfirm.trim().length > 6 && passwordConfirm === password) {
      setPasswordConfirmIsvalid(true);
    }
  }

  const passwordConfirmBlurHandler = () => {
    if(passwordConfirm.trim().length < 6 && passwordConfirm !== password){
      setPasswordConfirmIsvalid(false);
    }
  }

  async function getStudents(){
    const response = await fetch('https://mcq-quiz-862ae-default-rtdb.firebaseio.com/students.json');
    const data = await response.json();
    const objArray = [];
    Object.keys(data).forEach(key => objArray.push({
      name: key,
      data: data[key]
   }));
    return objArray;
  }

  async function setStudent(){
    const response = await fetch("https://mcq-quiz-862ae-default-rtdb.firebaseio.com/students.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        usermail: email,
        password: password,
        id: Math.floor(Math.random() * 100)
      })
    });
    const data = await response.json();
    return data;
  }


  const submitHandler=(event)=>{
    event.preventDefault();
  

    if(nameIsvalid && emailIsvalid && passwordIsvalid && passwordConfirmIsvalid){
      getStudents().then((objArray)=>{
          const isExist = objArray.some(student => student.data.email === email);
          if(isExist){
            alert("User already exists");
            setEmailIsvalid(false);
            setEmailIsExist(true);
          }
          else{
            setStudent().then((data)=>{
              window.location.href = "/home";
            }).catch((err)=>{
              alert("Error");
            }).finally(()=>{
              setName('');
              setEmail('');
              setPassword('');
              setPasswordConfirm('');
              setNameIsvalid(true);
              setEmailIsvalid(true);
              setPasswordIsvalid(true);
              setPasswordConfirmIsvalid(true);
              setEmailIsExist(false);
            }
            )
          }
      }
      )
  }
}



  return (
    <Fragment>
      <div className={classes.login}>
        <h1 className="bg-danger text-white">Register</h1>
        <form onSubmit={submitHandler}>
          <div className="m-1 d-flex-column w-100 justify-content-between">
            <div className="d-flex mt-4"> 
            <TextField
              id="outlined-basic"
              label="الايميل"
              variant="outlined"
              value={email}
              type="email"
              onChange={emailHandler}
              onBlur={emailBlurHandler}
              className="w-50 m-1 col-6"
            />
            <TextField
              id="outlined-basic"
              label="الاسم"
              variant="outlined"
              value={name}
              type="text"
              onChange={nameHandler}
              onBlur={nameBlurHandler}
              className="w-50 m-1 col-6"
            />
            </div>
            <div className="d-flex mt-1 text-danger">
              {
                emailIsExist ? <span>الايميل مستخدم من قبل </span> :   <span className={`w-50 m-1 col-6 ${!emailIsvalid ? 'opacity-100' :'opacity-0'}`}>خطاء فى الايميل</span>
              }
            
              <span className={`w-50 m-1 col-6 ${!nameIsvalid ? 'opacity-100' :'opacity-0'}`}>خطاء فى الاسم</span>
            </div>
            <div className="d-flex mt-4">
            <TextField
              id="outlined-basic"
              label="تاكيد الرقم السرى"
              variant="outlined"
              type="password"
              value={passwordConfirm}
              onChange={passwordConfirmHandler}
              onBlur={passwordConfirmBlurHandler}
              className="w-50 m-1 col-6"
            />
            <TextField
              id="outlined-basic"
              label="الرقم السرى"
              type="password"
              variant="outlined"
              value={password} 
              onChange={passwordHandler}
              onBlur={passwordBlurHandler}
              className="w-50 m-1 col-6"
            />
            </div>

            <div className="d-flex mt-1 text-danger">
              <span className={`w-50 m-1 col-6 ${!passwordConfirmIsvalid ? 'opacity-100' :'opacity-0'}`}> الرقم السرى غير متطابق </span>
              <span className={`w-50 m-1 col-6 ${!passwordIsvalid ? 'opacity-100' :'opacity-0'}`}> خطاء فى الرقم السرى  </span>
            </div>

          </div>

          <div className="d-flex w-100 justify-content-between mt-5">
            <button className="btn btn-danger" type="submit">
              انشاء حساب
            </button>
            <Link to="/login">امتلك حساب بالفعل ؟</Link>
          </div>
        </form>
      </div>
    </Fragment>
  )
}

export default Register