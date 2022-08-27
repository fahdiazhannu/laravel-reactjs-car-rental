import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

function EditCategory(props)
{
    const history = useHistory();
    const[loading, setLoading]= useState(true);
    const[categoryInput, setCategory]= useState([]);
    const[error, setError] = useState([]);
    const[gambar, setGambar] = useState([]);

   

    useEffect(()=> {
        const category_id = props.match.params.id;
        axios.get(`/api/edit-category/${category_id}`).then(res=>{
            if(res.data.status === 200)
            {
                setCategory(res.data.category);
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-category');
            }
            setLoading(false);
        });
    }, [props.match.params.id, history]);

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value});
    }

    const handleImage = (e) => {
        e.persist();
        setGambar({image: e.target.files[0] });
    }

    const updateCategory = (e) => {
        e.preventDefault();

        const category_id = props.match.params.id;
        const formData = new FormData();
        formData.append('image', gambar.image);
        formData.append('slug', categoryInput.slug);
        formData.append('nama', categoryInput.nama);
        formData.append('deskripsi', categoryInput.deskripsi);
        formData.append('meta_title', categoryInput.meta_title);
        formData.append('meta_keyword', categoryInput.meta_keyword);
        formData.append('meta_deskripsi', categoryInput.meta_deskripsi);
        formData.append('status', categoryInput.status);
        axios.put(`/api/update-category/${category_id}`, formData).then(res=>{
            if(res.data.status === 200)
            {
                swal("Succes", res.data.message, "success");
                setError([]);
            }
            else if(res.data.status === 422)
            {
                swal("Semua field wajib diisi", res.data.message,"", "error");
                setError(res.data.errors);
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message, "error");
                history.push('admin/view-category');
            }
        });
    }




    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Category
                        <Link to="admin/view-category" className="btn btn-primary btn-sm float-end">Kembali</Link>
                    </h4>
                    </div>
                    <div class="card-body">
         <form onSubmit={updateCategory}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
            </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
               
                    <div className="form-group mb-3">
                        <label>Slug</label>
                        <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                        <small className="text-danger">{error.slug}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label>Nama</label>
                        <input type="text" name="nama" onChange={handleInput} value={categoryInput.nama} className="form-control" />
                        <small className="text-danger">{error.nama}</small>
               
                    </div>
                    <div className="form-group mb-3">
                        <label>Deskripsi</label>
                        <textarea name="deskripsi" onChange={handleInput} value={categoryInput.deskripsi} className="form-control"></textarea>
                    </div>
                    <div className="form-group mb-3">
                        <label>Status</label>
                        <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status} />Status 0=shown/1=hidden
                    </div>

                </div>
                <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                    <div className="form-group mb-3">
                            <label>Meta Keywords</label>
                            <textarea name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className="form-control"></textarea>
                    
                    </div> 
                    <div className="form-group mb-3">
                            <label>Meta Deskripsi</label>
                            <textarea name="meta_deskripsi" onChange={handleInput} value={categoryInput.meta_deskripsi}  className="form-control"></textarea>
                    </div> 
                    <div className="form-group mb-3">
                            <label>Meta Title</label>
                            <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control"/>
                            <small className="text-danger">{error.meta_title}</small>
                     
                    </div>
                </div>
                <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
            </div>
            </form>
            </div>
            </div>
        </div>    
        
    )
}
export default EditCategory;