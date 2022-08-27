import React, {useEffect, useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory, Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

function ListSewa(props)
{
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [sewa, setSewa] = useState([]);
    var totalSewaPrice = 0;


    if(!localStorage.getItem('auth_token')){
        history.push('/');
        swal("Warning", "Login Untuk Pergi Ke Halaman List Sewa", "error");
    }


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

    const handleDecrement = (sewa_id) => {
        setSewa(sewa =>
            sewa.map( (item) => 
                sewa_id === item.id ? {...item, mobil_qty: item.mobil_qty - (item.mobil_qty > 1 ? 1:0) } : item
                )
        );
        updateSewaQuantity(sewa_id,"dec")

    }
    const handleIncrement = (sewa_id) => {
        setSewa(sewa =>
            sewa.map( (item) => 
                sewa_id === item.id ? {...item, mobil_qty: item.mobil_qty + (item.mobil_qty < 10 ? 1:0)} : item
                )
        );
        updateSewaQuantity(sewa_id,"inc")
    }
    function updateSewaQuantity(sewa_id, scope){
        axios.put(`/api/sewa-update/${sewa_id}/${scope}`).then(res=>{
            if(res.data.status === 200){
                // swal("Succes", res.data.message, "success");
            }

        });
    }
    
    const deleteSewaItem = (e, sewa_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Menghapus";

        axios.delete(`/api/delete-sewaitem/${sewa_id}`).then(res => {
            if(res.data.status === 200)
            {
                history.push('/');
                swal("Sucess", res.data.message, "success");

                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Remove";
            }
        });
    }
    
if(loading)
{
    return <div className="center">Loading Detail Sewa ...</div>
}

var sewa_HTML = '';
if(sewa.length > 0)
{
    sewa_HTML =  
    
       <div className="card mt-3">
            <div className="card-header">
                <h4>List Transaksi
                    
                </h4>
            </div>
            <div className="card-body">
    <div className="table-responsive">
    <table className="table table-striped">
    <thead>
        <tr>
            <th>Gambar</th>
            <th className="text-center">Mobil</th>
            <th className="text-center">Harga Sewa</th>
            <th className="text-center">Durasi Sewa / Hari</th>
            <th className="text-center">Tanggal</th>
            <th className="text-center">Total Harga Sewa</th>
            <th className="text-center">Action</th>
            <th className="text-center">Checkout</th>
        </tr>
    </thead>
    <tbody>

        {sewa.map((item)=> {

            totalSewaPrice += item.mobil.hargasewa_asli * item.mobil_qty;
            return (

            
        <tr>
            <td width="10%">
                <img src={`http://127.0.0.1:8000/${item.mobil.image}`} width="100px" height="70px"/>  
            </td>
            <td>
                {item.mobil.nama}
            </td>
            <td width="15%" className="text-center">Rp {item.mobil.hargasewa_asli}</td>
            <td width="15%">
                <div className="input-group">
                    <button onClick={() => handleDecrement(item.id)} type="buton" className="input-group-text">-</button>
                    <div className="form-control text-center">{item.mobil_qty} / Hari</div>
                    <button type="button" onClick={() => handleIncrement(item.id)} className="input-group-text">+</button>
                    </div>
                </td>
                <td width="15%" className="text-center" min={new Date().toISOString().split('T')[0]}>{item.tgl_sewa}</td>
                    <td width="15%" className="text-center">Rp {item.mobil.hargasewa_asli * item.mobil_qty}</td>
                    <td width="10%">
                        <button type="button" onClick={ (e)=> deleteSewaItem(e, item.id) } className="btn btn-danger btn-sm">Hapus</button>
                        </td>
                        <td>
                        <Link to="/checkout" className="btn btn-success btn-sm">Checkout</Link>
                            </td>
                
        </tr>
        )
    })}
    </tbody>
    </table>
                </div>
                    </div>
         
</div>

}
else
 {
     sewa_HTML = <div>
    <div className="card card-body py-5 text-center shadow-sm">
        <h4>Anda Belum Melakukan Transaksi Sewa</h4>
        </div>
        </div>
}

return (
            <div>
        <div className="py-3">
            <div className="container">
                <Breadcrumb>
  <Breadcrumb.Item href="/">Beranda</Breadcrumb.Item>
  <Breadcrumb.Item active>Detail Sewa</Breadcrumb.Item>
</Breadcrumb>
            </div>
        </div>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                               {sewa_HTML}
                            </div>
                            
                        </div>
                    </div>
                </div>
                </div>
  
                        
            )
                }

export default ListSewa;
                
