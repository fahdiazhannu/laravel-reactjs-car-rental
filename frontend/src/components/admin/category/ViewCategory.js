import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function ViewCategory(){

    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);

    useEffect(() => {
        
        axios.get('/api/view-category').then(res=>{
            console.log(res.data.category);
            if(res.status === 200)
            {
                setCategorylist(res.data.category)
            }
            setLoading(false);
        });

    }, []);


    const deleteCategory = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Menghapus";

        axios.delete(`/api/delete-category/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Succes", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Succes", res.data.message, "success");
                thisClicked.innerText = "Delete";
            }

        });
    }

    var viewcategory_HTMLTABLE = "";
    if(loading)
    {
        return <div className="center">Loading ...</div>
    }
    else
    {
        viewcategory_HTMLTABLE =
        categorylist.map( (item) => {
            return (
                <tr key={item.id}>
                    <td className="text-center">{item.id}</td>
                    <td className="text-center">{item.nama}</td>
                    <td className="text-center">{item.slug}</td>
                    <td className="text-center">{item.status}</td>
                    <td>
                        <Link to={`edit-category/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                        </td>
                        <td>
                    <button type="button" onClick={ (e) => deleteCategory(e, item.id) } className="btn btn-danger btn-sm">Hapus</button>    
                    </td>
                </tr>
            )
        } )
    }


    return (
        <div className="container px-4">
        <div className="card">
            <div className="card-header">
                <h4>Category List
                <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">Add Category</Link>
                </h4>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">Nama</th>
                            <th className="text-center">Slug</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewcategory_HTMLTABLE}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
        )
    }

export default ViewCategory;
