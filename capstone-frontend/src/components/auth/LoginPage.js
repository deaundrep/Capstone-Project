import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import { useForm } from '../../helpers/Form';
import { startLogin, startRegister } from "../../actions/auth";
import "./login.css";



const LoginPage = () => {
    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        Email: "1@gmail.com",
        Password: "123",
    });

    const { Email, Password } = formLoginValues;

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        Name: "Dre",
        Email: "1@gmail.com",
        Password1: "123",
    });

    const { Name, Password1, Password2 } = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(Email, Password));
    };
    const handleRegister = (e) => {
        e.preventDefault();
        if (Password1 !== Password2) {
            return Swal.fire(
                "Error",
                "check login",
                "error"
            );
        }
        dispatch(startRegister(Email, Password1, Name));
    };

	return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>LOGIN</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="Email"
                                value={Email}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Co"
                                name="Password"
                                value={Password}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>REGISTER</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="Name"
                                value={Name}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="Email"
                                value={Email}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="Password1"
                                value={Password1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Re-Enter"
                                name="Password2"
                                value={Password2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Create Account"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
