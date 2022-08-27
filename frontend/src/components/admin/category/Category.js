import React, {useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

function Category(){

const [categoryInput, setCategory] = useState({
    slug: '',
    nama:'',
    deskripsi:'',
    status:'',
    error_list: [],

});
const [gambar, setGambar] = useState([]);

const handleInput = (e) => {
    e.persist();
    setCategory({...categoryInput, [e.target.name]: e.target.value })
}

const handleImage = (e) => {
    e.persist();
    setGambar({image: e.target.files[0] });
}



const submitCategory = (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    formData.append('image', gambar.image);
    formData.append('slug', categoryInput.slug);
    formData.append('nama', categoryInput.nama);
    formData.append('deskripsi', categoryInput.deskripsi);
    formData.append('status', categoryInput.status);
    
    axios.post('/api/store-category', formData).then(res=> {
        if(res.data.status === 200)
        {
            swal("Success", res.data.message, "success");
        }
        else if(res.data.status === 400)
        {
            setCategory({...categoryInput, error_list:res.data.errors})
        }
    });
}

var display_errors = [];
if(categoryInput.error_list)
{
    display_errors = [
        categoryInput.error_list.slug,
        categoryInput.error_list.nama,
        categoryInput.error_list.meta_title,
    ]
}

    return(
        <div className="container-fluid px-4">
            <h1 className="mt-4">Kategori</h1>
                {
                    display_errors.map( (item) => {
                        return( <p className="mb-1" key={item}> {item}</p> )
                    })
                }
        <form onSubmit={submitCategory} encType="multipart/form-data">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Input</button>
            </li>
  
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
               
                    <div className="form-group mb-3">
                        <label>Slug</label>
                        <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                        <span>{categoryInput.error_list.slug}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Nama</label>
                        <input type="text" name="nama" onChange={handleInput} value={categoryInput.nama} className="form-control" />
                        <span>{categoryInput.error_list.nama}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Deskripsi</label>
                        <textarea name="deskripsi" onChange={handleInput} value={categoryInput.deskripsi} className="form-control"></textarea>
                    </div>
                    <div className="form-group mb-3">
                                <label>Gambar</label>
                                <input type="file" name="image" onChange={handleImage} className="form-control" />
                                {categoryInput.error_list.image}
                            </div>
                    <div className="form-group mb-3">
                        <label>Status</label>
                        <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status} />Status 0=shown/1=hidden
                    </div>

                </div>
             
                <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
            </div>
            </form>
        </div>
    )
}

export default Category;