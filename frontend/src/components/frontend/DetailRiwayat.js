import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

function DetailRiwayat(props)
{
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    
    if(!localStorage.getItem('auth_token')){
        history.push('/');
        swal("Warning", "Login Untuk Pergi Ke Halaman List Sewa", "error");
    }


       useEffect(() => {
        
        let isMounted = true
        const id = props.match.params.id;
        axios.get(`/api/detail-riwayat/${id}`).then(res => {
            if(isMounted )
            {
                if(res.data.status === 200)
                {
                    setOrders(res.data.orders);
                    setLoading(false);
                }
                else if (res.data.status === 401)
                {
                    history.push('/');
                    swal("Warning", res.data.message, "error");
                }
            }
        });

        return() => {
        let isMounted = false

        };

    }, [history]); 

    var display_orders="";
    if(loading)
    {
        return <h4>Loading Riwayat Transaksi ...</h4>
    }
    else
    {
        display_orders = orders.map((item) => {
            
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.tracking_no}</td>
                    <td>{item.email}</td>
                    <td>{item.notelp}</td>
                    <td>{item.created_at}</td>
                    <td>
                        <Link to={`view-order/${item.id}`} className="btn btn-success btn-sm">View</Link>
                    </td>
                </tr>
            )
        });
    }




    return (
        <div className="container">
            <br/>
            <br />
        <div className="card mt-3">
            <div className="card-header">
                <h4>Riwayat Transaksi
                    
                </h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Kode Transaksi</th>
                                <th>Email</th>
                                <th>Nomor Telepon</th>
                                <th>Tanggal Transaksi</th>
                                <th>Action</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {display_orders}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            </div>
            )


}

export default DetailRiwayat;