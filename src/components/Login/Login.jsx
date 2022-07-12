import React, { Fragment, useState } from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("students");
  const [emailIsvalid, setemailIsvalid] = useState(true);
  const [passwordIsvalid, setpasswordIsvalid] = useState(true);

  console.log(role)
  const roleHandler = (event) => {
    setRole(event.target.id);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
    if (email.trim().length > 0) {
      setemailIsvalid(true);
    }
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    if (password.trim().length > 0) {
      setpasswordIsvalid(true);
    }
  };

  async function getUser(role) {
    const user = await fetch(`https://mcq-quiz-862ae-default-rtdb.firebaseio.com/${role}.json`);
    const userData = await user.json();
    const objArray = [];
    Object.keys(userData).forEach((key) =>
      objArray.push({
        name: key,
        data: userData[key],
      })
    );
    return objArray;
  }

  // async function getTeacher() {
  //   const response = await fetch(
  //     "https://mcq-quiz-862ae-default-rtdb.firebaseio.com/teacher.json"
  //   );
  //   const data = await response.json();
  //   const objArray = [];
  //   Object.keys(data).forEach((key) =>
  //     objArray.push({
  //       name: key,
  //       data: data[key],
  //     })
  //   );
  //   return objArray;
  // }

  // async function getStudents() {
  //   const response = await fetch(
  //     "https://mcq-quiz-862ae-default-rtdb.firebaseio.com/students.json"
  //   );
  //   const data = await response.json();
  //   const objArray = [];
  //   Object.keys(data).forEach((key) =>
  //   objArray.push({
  //     name: key,
  //     data: data[key],
  //   })
  // );
  // return objArray;
  // }

  const submitHandler = (event) => {
    event.preventDefault();
    if (email.length === 0 && password.length === 0) {
      setemailIsvalid(false);
      setpasswordIsvalid(false);
    }
    if (emailIsvalid && passwordIsvalid) {
      // if (role === "teacher") {
      //   getTeacher().then((data) => {

      //     const isExist = data.find((item) => {
      //       return item.data.username === email && item.data.password === password;
      //     }
      //     );
      //     if (isExist) {
      //       window.location.href = "/home";
      //     } else {
      //       setemailIsvalid(false);
      //       setpasswordIsvalid(false);
      //     }
      //   });
      // }
      // if (role === "student") {
      //   getStudents().then((data) => {

      //     const isExist = data.find((item) => {
      //       return item.data.email === email && item.data.password === password;
      //     }
      //     );
      //     if (isExist) {
      //       window.location.href = "/home";
      //     } else {
      //       setemailIsvalid(false);
      //       setpasswordIsvalid(false);
      //     }
      //   });
      // }
      
      getUser(role).then((data) => {
        const isExist = data.find((item) => {
          return item.data.email === email && item.data.password === password;
        } 
        );
        if (isExist) {
          window.location.href = "/home";
        } else {
          setemailIsvalid(false);
          setpasswordIsvalid(false);
        }
      });

    }
  };

  const passwordBlurHandler = () => {
    if (password.trim().length === 0) {
      setpasswordIsvalid(false);
    }
  };

  const emailBlurHandler = () => {
    if (email.trim().length === 0) {
      setemailIsvalid(false);
    }
  };
  return (
    <Fragment>
      <div className={classes.login}>
        <h1 className="bg-danger text-white">Login</h1>
        <form onSubmit={submitHandler}>
          <div className="d-flex m-0">

          <div className={classes.radioItem}>
              <span>مدرس</span>
              <input
                type="radio"
                name="positon"
                id="teacher"
                onChange={roleHandler}
              />
            </div>
            <div className={classes.radioItem}>
              <span>طالب</span>
              <input
                type="radio"
                name="positon"
                id="students"
                checked
                onChange={roleHandler}
              />
            </div>
           
          </div>
          <div className="mt-4 d-flex w-100 justify-content-between">
            <TextField
              id="outlined-basic"
              label="الباسورد"
              variant="outlined"
              type="password"
              className={`w-50 m-1`}
              value={password}
              onChange={passwordHandler}
              onBlur={passwordBlurHandler}
            />
            <TextField
              id="outlined-basic"
              label="الايميل"
              variant="outlined"
              type="text"
              className="w-50 m-1"
              value={email}
              onChange={emailHandler}
              onBlur={emailBlurHandler}
            />
          </div>
          <div className="mt-2 d-flex w-100 justify-content-between text-danger">
            <span
              className={`w-50 m-1 ${
                !passwordIsvalid ? `opacity-100 ` : `opacity-0`
              }`}
            >
              خطاء فى الباسورد
            </span>
            <span
              className={`w-50 m-1 ${
                !emailIsvalid ? `opacity-100 ` : `opacity-0`
              }`}
            >
              خطاء فى الايميل
            </span>
          </div>
          <div className="d-flex w-100 justify-content-between mt-5">
            <button className="btn btn-danger" type="submit">
              تسجيل الدخول
            </button>
            <Link to="/register">انشاء حساب ؟</Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
