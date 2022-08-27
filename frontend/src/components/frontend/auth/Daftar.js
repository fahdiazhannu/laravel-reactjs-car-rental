import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';


function Daftar() {

    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const registerSubmit = (e) => {
        e.preventDefault();

        const data =  {
            name: name,
            email: email,
            password: password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(`/api/register`, data).then(res => {
            if(res.data.status === 200) 
            {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.username);
                swal("Succes", res.data.message, "success");
                history.push('/');
            }
            else
            {
                // setRegister({...registerInput, error_list: res.data.validation_errors})
            }

        });
    });
    }

    return(
        <div>

        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Daftar</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={registerSubmit}>
                                <div className="form-group mb-3">
                                    <label>Full Name</label>
                                    <input type="" onChange={(e) => setName(e.target.value)} value={name} className="form-control" />
                                    {/* <span>{registerInput.error_list.name}</span> */}
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" />
                                    {/* <span>{registerInput.error_list.email}</span> */}
                                </div>
                                <div className="form-group mb-3">
                                    <label>Password</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" />
                                    {/* <span>{registerInput.error_list.password}</span> */}
                                </div>
                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary">Daftar</button>
                                </div>
                            </form>
                         </div>
                   </div>
                </div>
            </div>
         </div>
    </div>
    )
}
export default Daftar;