import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

function ViewMobil()
{

    const [loading, setLoading] = useState(true);
    const [viewMobil, setMobil] = useState([]);
    useEffect(() => {

        document.title = "Views Mobil";

        axios.get(`/api/view-mobil`).then(res=>{
            if(res.data.status === 200)
            {
                setMobil(res.data.mobil);
                setLoading(false);
            }

        });

    }, []);


    var display_Mobildata = "";
    if(loading)
    {
        return <h4>Loading View Mobil Loading ...</h4>
    }
    else
    {
        var ProdStatus = '';
        display_Mobildata = viewMobil.map( (item) => {
            if(item.status == '0')
            {
                ProdStatus = 'Shown';
            }else if(item.status == '1'){
                ProdStatus = 'Hidden';
            
            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category.nama}</td>
                    <td>{item.nama}</td>
                    <td>{item.hargasewa_asli}</td>
                    <td><img src={`http://127.0.0.1:8000/${item.image}`} width="50px" alt="img" /></td>
                    <td>
                        <Link to={`edit-mobil/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        {ProdStatus}
                    </td>
                </tr>
            )
        });
    }




    return (
        <div className="card px-4 mt-3">
            <div className="card-header">
                <h4>List Data Mobil
                    <Link to="/admin/add-mobil" className="btn btn-primary btn-sm float-end">Add Mobil</Link>
                </h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Kategori</th>
                                <th>Nama Mobil</th>
                                <th>Harga Sewa</th>
                                <th>Gambar</th>
                                <th>Edit</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {display_Mobildata}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
    )
}
export default ViewMobil;