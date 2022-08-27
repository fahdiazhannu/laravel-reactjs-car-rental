import React, {useEffect, useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory, Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

function Checkout()

{

    const history = useHistory();
    if(!localStorage.getItem('auth_token')){
        history.push('/');
        swal("Warning", "Login Untuk Pergi Ke Halaman Checkout", "error");
    }

    const [loading, setLoading] = useState(true);
    const [sewa, setSewa] = useState([]);
    var totalSewaPrice = 0;

   const [checkoutInput, setCheckoutInput] = useState({
       namadepan: '',
       namabelakang:'',
       notelp:'',
       email:'',
       alamat:'',
       kota:'',
       provinsi:'',

   });

   const [error, setError] = useState([]);
 

    useEffect(() => {
        
        let isMounted = true

        axios.get(`/api/detail-sewa/`).then(res => {
            if(isMounted )
            {
                if(res.data.status === 200)
                {
                    setSewa(res.data.sewa);
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

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value});
    }

    const submitOrder = (e) => {
        e.preventDefault();
        const data = {
            namadepan: checkoutInput.namadepan,
            namabelakang: checkoutInput.namabelakang,
            notelp:checkoutInput.notelp,
            email: checkoutInput.email,
            alamat: checkoutInput.alamat,
            kota: checkoutInput.kota,
            provinsi: checkoutInput.provinsi,
        }
    
        axios.post(`/api/place-order`, data).then(res=> {
            if(res.data.status === 200)
            {
                swal("Berhasil Transaksi Sewa Mobil", res.data.message, "success");
                setError([]);
                history.push('/thank-you');
            }else if(res.data.status === 422)
            {
                swal("Semua Kolom Wajib Diisi","", "error");
                setError(res.data.errors);
            }
        })
    }




    if(loading)
{
    return <h4>Loading Checkout ...</h4>
}
var checkOut_HTML='';
if(sewa.length > 0)
{
    checkOut_HTML =  <div>
                 <div className="row">

                    <div className="col-md-7">
                <div className="card">
                    <div className="card-header">
                        <h4>Data Penyewa</h4>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label>Nama Depan</label>
                                        <input type="text" name="namadepan" onChange={handleInput} value={checkoutInput.namadepan}className="form-control" />
                                        <small className="text-danger">{error.namadepan}</small>
                                    </div>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label>Nama Belakang</label>
                                        <input type="text" name="namabelakang" onChange={handleInput} value={checkoutInput.namabelakang} className="form-control" />
                                        <small className="text-danger">{error.namabelakang}</small>
                                    </div>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label>Email Address</label>
                                        <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                        <small className="text-danger">{error.email}</small>
                                    </div>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label>Nomor Telepon</label>
                                        <input type="text" name="notelp" onChange={handleInput} value={checkoutInput.notelp} className="form-control" />
                                        <small className="text-danger">{error.notelp}</small>
                                    </div>
                                    </div>
                                    <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <label>Alamat</label>
                                        <textarea rows="3" name="alamat" onChange={handleInput} value={checkoutInput.alamat} className="form-control"></textarea>
                                        <small className="text-danger">{error.alamat}</small>
                                    </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <label>Provinsi</label>
                                        <input type="text" name="provinsi" onChange={handleInput} value={checkoutInput.provinsi} className="form-control" />
                                        <small className="text-danger">{error.provinsi}</small>
                                    </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <label>Kota</label>
                                        <input type="text" name="kota" onChange={handleInput} value={checkoutInput.kota} className="form-control" />
                                        <small className="text-danger">{error.kota}</small>
                                    </div>
                                    </div>
                                    <div className="col-md-12">
                                    <div className="form-group text-end">

                                        <button type="button" className="btn btn-primary" onClick={submitOrder}>Place Order</button>
                                    </div>
                                    </div>

                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="50%">Mobil</th>
                                    <th>Harga</th>
                                    <th>Durasi</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {sewa.map((item, idx)=> {
                            totalSewaPrice = item.mobil.hargasewa_asli * item.mobil_qty;
                            return (
                                <tr key={idx}>
                                    <td>{item.mobil.nama}</td>
                                    <td className="text-center">{item.mobil.hargasewa_asli}</td>
                                    <td className="text-center">{item.mobil_qty} hari</td>
                                    <td className="text-center">{item.mobil.hargasewa_asli * item.mobil_qty}</td>
                                </tr>
                                
                            )
                            })}
                            <tr>
                            <td colSpan="2" className="text-end fw-bold">Total Keseluruhan</td>
                            <td colSpan="2" className="text-end fw-bold">{totalSewaPrice}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    </div>
                </div>
}
else
{
    checkOut_HTML = <div>
    <div className="card card-body py-5 text-center shadow-sm">
        <h4>Anda Belum Melakukan Transaksi Sewa. Anda Berada Di halaman Checkout</h4>
        </div>
        </div>
}


    return(
        <div>
                   <div className="py-3">
            <div className="container">
                <Breadcrumb>
  <Breadcrumb.Item href="/">Beranda</Breadcrumb.Item>
  <Breadcrumb.Item href="/collections">Sewa Mobil</Breadcrumb.Item>
  <Breadcrumb.Item active>Checkout Detail</Breadcrumb.Item>
</Breadcrumb>
            </div>
        </div>
            <div className="py-4">
                <div className="container">
                    {checkOut_HTML}
                    </div>
                </div>
        </div>
    )
}

export default Checkout;