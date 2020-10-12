import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
// import { Button, FormGroup, FormControl } from "react-bootstrap"
import { authLoginCustomerCreator, authLoginSellerCreator } from '../../redux/actions/auth'
import corpName from '../../assets/img/logo.png'
import classname from "../../helpers/classJoiner";
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {
    const dispatch = useDispatch()
    const [userType, setUserType] = useState(false)
    // const [errMsgCust, setErrMsgCust] = useState(null)
    // const [errMsgSllr, setErrMsgSllr] = useState(null)


    const loginCustomer = useSelector((state) => state.auth.customer)
    const loginSeller = useSelector((state) => state.auth.seller)

    const { handleSubmit, register, errors } = useForm();

    useEffect(() => {
        if (loginCustomer.msg === 'Login Success') {
            return console.log('customer dah login')
        } 
        
    }, [loginCustomer.msg])

    useEffect(() => {
        if (loginSeller.msg === 'Login Success') {
            return console.log('seller dah login')
        } 
        
    }, [loginCustomer.msg])

    const onSubmitCustomer = (data) => {
        dispatch(authLoginCustomerCreator(data))
        // console.log('customer')
    };
    const onSubmitSeller = (data) => {
        dispatch(authLoginSellerCreator(data))
        // console.log('seller')
    };

    return (
        <div className={classname(styles.body)}>
            {/* <p>FORM YANG INI PUNYA CUSTOMER</p> */}
            {userType === false ? (<div><form className={classname(styles.login)} onSubmit={handleSubmit(onSubmitCustomer)}>
                <img
                    alt='logo'
                    className={classname(styles.logo)}
                    src={corpName}
                />
                <p className={classname(styles.desc)}>Please login with your account</p>

                {/* {errMsgCust === null ? null : (<p className={classname(styles.errMsg)}>{errMsgCust}</p>)} */}
                <div className={classname(styles.userType)}>
                    {userType === false ? (
                        <button className={classname(styles.userTypeBtnCustomerActive)} >Customer</button>

                    ) : (
                            <button className={classname(styles.userTypeBtnCustomer)} >Customer</button>
                        )}
                    <button className={classname(styles.userTypeBtnSeller)} onClick={(e) => {
                        e.preventDefault()
                        setUserType(true)
                    }}>Seller</button>
                </div>

                <form className={classname(styles.formContainer)} >

                    <p className={classname(styles.errMsg)}>
                        {errors.email && errors.email.message}
                    </p>
                    <div>
                        <input
                            className={classname(styles.emailInput)}
                            placeholder="Email"
                            name="email"
                            ref={register({
                                required: "Required",
                                pattern: {
                                    value: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                                    message: "bukan email"
                                }
                            })}
                        />
                    </div>

                    <p className={classname(styles.errMsg)}>
                        {errors.password && errors.password.message}
                    </p>
                    <div>
                        <input
                            className={classname(styles.passwordInput)}
                            placeholder="Password"
                            name="password"
                            ref={register({
                                required: "Required",
                                pattern: {
                                    value: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
                                    message: 'bukan password'
                                },
                                validate: value => value !== "admin" || "Nice try!"
                            })}
                        />
                    </div>
                    <p className={classname(styles.forgot)}>Forgot password?</p>
                    <button
                        className={classname(styles.loginSubmit)}
                        type="submit">
                        Submit
                    </button>
                </form>
            </form>
                <div className={classname(styles.signUpBtn)}>
                    <p>Don't have a Tokopedia account?   <span
                        onClick={() => {

                        }}>
                        <Link
                            className={classname(styles.bla)}
                            to='/Register'
                        >
                            Register
                            </Link>
                    </span></p>
                </div>
            </div>

            )
                :
                // <p>FORM DIBAWAH PUNYA SELLER, YANG ATAS PUNYA CUSTOMER</p>
                (<div><form className={classname(styles.login)} onSubmit={handleSubmit(onSubmitSeller)}>
                    <img
                        alt='logo'
                        className={classname(styles.logo)}
                        src={corpName}
                    />
                    <p className={classname(styles.desc)}>Please login with your seller account</p>

                    {/* {errMsgSllr === null ? null : (<p className={classname(styles.errMsg)}>{errMsgSllr}</p>)} */}
                    <div className={classname(styles.userType)}>
                        <button className={classname(styles.userTypeBtnCustomer)} onClick={(e) => {
                            e.preventDefault()
                            setUserType(false)
                        }}>Customer</button>
                        {userType === true ? (
                            <button className={classname(styles.userTypeBtnSellerActive)} >Seller</button>

                        ) : (
                                <button className={classname(styles.userTypeBtnSeller)} >Seller</button>

                            )}
                    </div>

                    <form className={classname(styles.formContainer)}>

                        <p className={classname(styles.errMsg)}>
                            {errors.email && errors.email.message}
                        </p>
                        <div>
                            <input
                                className={classname(styles.emailInput)}
                                placeholder="Email"
                                name="email"
                                ref={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                                        message: "bukan email"
                                    }
                                })}
                            />
                        </div>

                        <p className={classname(styles.errMsg)}>
                            {errors.password && errors.password.message}
                        </p>
                        <div>
                            <input
                                className={classname(styles.passwordInput)}
                                placeholder="Password"
                                name="password"
                                ref={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
                                        message: 'bukan password'
                                    },
                                    // validate: value => value !== "admin" || "Nice try!"
                                })}
                            />
                        </div>
                        <p className={classname(styles.forgot)}>Forgot password?</p>
                        <button
                            className={classname(styles.loginSubmit)}
                            type="submit"
                        >
                            Submit
                </button>
                    </form>
                </form>
                    <div className={classname(styles.signUpBtn)}>
                        <p>Don't have a Tokopedia account?   <span
                            onClick={() => {

                            }}>
                            <Link
                                className={classname(styles.bla)}
                                to='/Register'>
                                Register
                        </Link>
                        </span></p>
                    </div>
                </div>

                )}
        </div>

    )
}

export default Login
