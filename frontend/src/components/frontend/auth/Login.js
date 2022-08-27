import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function Login(){

const history = useHistory();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error_list, setErrorList] = useState([]);



const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
        email: email,
        password: password,
        error_list : error_list,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
    axios.post('api/login', data).then(res=> {
        if(res.data.status === 200)
        {
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('auth_name', res.data.username);
            localStorage.setItem('role', res.data.role);
            swal("Login Berhasil", res.data.message, "success");

            if(res.data.role === 'admin')
            {
                history.push('/admin/dashboard');
            }
            else
            {
                history.push('/');
            }
        }
        else if(res.data.status === 401) 
        {
            swal("Warning", res.data.message, "Warning");
        }
        else
        { 
        
        }

    });
});
}


    return (
        <div>
    
            <div>

        <div className="container py-5">
            <div className="row justify-content-center">
                <div class="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Login</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={loginSubmit}>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control" value={email} />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Password</label>
                                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" value={password}/>
                                </div>
                                <div className="form-group mb-3">
                                    <button type="submit" name="name" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                         </div>
                   </div>
                </div>
            </div>
         </div>
    </div>
        </div>
    )

}

export default Login;