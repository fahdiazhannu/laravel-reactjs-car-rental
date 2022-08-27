import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert';

function EditMobil(props)
{
    const history = useHistory();
    const [loading, setLoading]= useState(true);
    const [categorylist, setCategorylist] = useState([]);
    const [mobilInput, setMobil] = useState({
        category_id:'',
        slug:'',
        nama:'',
        deskripsi:'',

        meta_title:'',
        meta_keyword:'',
        meta_deskripsi:'',

        hargasewa_disk:'',
        hargasewa_asli:'',
        qty:'',
        merk:'',
        tahunmobil:'',
        kapasitas:'',
    });
    const [gambar, setGambar] = useState([]);
    const [errorlist, setError] = useState([]);
        
    const handleInput = (e) => {
        e.persist();
        setMobil({...mobilInput, [e.target.name]:e.target.value });
    }

 
    
    const handleImage = (e) => {
        e.persist();
        setGambar({image: e.target.files[0] });
    }

    const [allcheckbox, setCheckboxes] = useState([]);
    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({...allcheckbox, [e.target.name]:e.target.checked });
    }
    

    useEffect(()=> {
        
        axios.get(`/api/all-category`).then(res=>{
            if(res.data.status == 200)
            {
                setCategorylist(res.data.category);
            }

        });
 
        const mobil_id = props.match.params.id
        axios.get(`api/edit-mobil/${mobil_id}`).then(res=>{
            if(res.data.status === 200)
            {
                setMobil(res.data.mobil);
                setCheckboxes(res.data.mobil);
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-mobil');
            }
            setLoading(false);
        });


    }, [props.match.params.id, history]);    

    const editMobil = (e) => {
        e.preventDefault();

        const mobil_id = props.match.params.id
        const formData = new FormData();
        formData.append('image', gambar.image);
        formData.append('category_id', mobilInput.category_id);
        formData.append('slug', mobilInput.slug);
        formData.append('nama', mobilInput.nama);
        formData.append('deskripsi', mobilInput.deskripsi);


        formData.append('hargasewa_disk', mobilInput.hargasewa_disk);
        formData.append('hargasewa_asli', mobilInput.hargasewa_asli);
        formData.append('qty', mobilInput.qty);
        formData.append('merk', mobilInput.merk);
        formData.append('tahunmobil', mobilInput.tahunmobil);
        formData.append('kapasitas', mobilInput.kapasitas);
        formData.append('featured', allcheckbox.featured ? '1':'0');
        formData.append('status', allcheckbox.status ? '1':'0');
        formData.append('popular', allcheckbox.popular ? '1':'0');



        axios.post(`/api/update-mobil/${mobil_id}`, formData).then(res=>{
            if(res.data.status === 200)
            {
                swal('Success', res.data.message, "success");
                setError([]);
            }
            else if(res.data.status === 422)
            {
                swal("Semua Field Wajib Diisi", "", "error");
                setError(res.data.errors);
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-mobil');
            }

        });
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                <h4>Edit Data Mobil
                    <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">Lihat Data Mobil</Link>
                </h4>
            </div>
            <div className="card-body">
                <form onSubmit={editMobil} encType="multipart/form-data">
                    
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Edit Data</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Detail Informasi</button>
                    </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                    <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        
                    <div className="form-group mb-3">
                        <label>Pilih Kategori</label>
                        <select name="category_id" onChange={handleInput} value={mobilInput.category_id} className="form-control">
                        <option>Pilih Kategori</option>
                            {
                                categorylist.map( (item) => {
                                    return(
                                        <option value={item.id} key={item.id}>{item.nama}</option>

                                    )
                                })
                            }
                           
                        </select>
                        <small className="text-danger">{errorlist.category_id}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label>Slug</label>
                        <input type="text" name="slug" onChange={handleInput} value={mobilInput.slug} className="form-control" />
                        <small className="text-danger">{errorlist.slug} </small>
                    </div>
                    
                    <div className="form-group mb-3">
                        <label>Nama</label>
                        <input type="text" name="nama" onChange={handleInput} value={mobilInput.nama} className="form-control" />
                        <small className="text-danger">{errorlist.nama}</small>
                    </div>
                    
                    <div className="form-group mb-3">
                        <label>Deskripsi</label>
                        <textarea name="deskripsi" onChange={handleInput} value={mobilInput.deskripsi} className="form-control"></textarea>
                        <small className="text-danger">{errorlist.deskripsi}</small>
                    </div>

                    </div>
                  
                    <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                        <div className="row">

                            <div className="col-md-4 form-group mb-3">
                                <label>Harga Sewa Diskon</label>
                                <input type="text" name="hargasewa_disk" onChange={handleInput} value={mobilInput.hargasewa_disk} className="form-control" />
                                <small className="text-danger">{errorlist.deskripsi} </small>
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Harga Sewa Base</label>
                                <input type="text" name="hargasewa_asli" onChange={handleInput} value={mobilInput.hargasewa_asli} className="form-control" />
                                <small className="text-danger">{errorlist.hargasewa_asli} </small>
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Quantity</label>
                                <input type="text" name="qty" onChange={handleInput} value={mobilInput.qty} className="form-control" />
                                <small className="text-danger">{errorlist.qty} </small>
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Merk</label>
                                <input type="text" name="merk" onChange={handleInput} value={mobilInput.merk} className="form-control" />
                                <small className="text-danger">{errorlist.merk} </small>
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Kapasitas</label>
                                <input type="text" name="kapasitas" onChange={handleInput} value={mobilInput.kapasitas} className="form-control" />
                                <small className="text-danger">{errorlist.kapasitas} </small>
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Tahun Mobil</label>
                                <input type="text" name="tahunmobil" onChange={handleInput} value={mobilInput.tahunmobil} className="form-control" />
                                <small className="text-danger">{errorlist.tahunmobil} </small>
                            </div>
                            <div className="col-md-8 form-group mb-3">
                                <label>Gambar</label>
                                <input type="file" name="image" onChange={handleImage} className="form-control" />
                                <img src={`http://127.0.0.1:8000/${mobilInput.image}`} width="100px"/>
                                <small className="text-danger">{errorlist.image} </small>
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Featured (checked=shown)</label>
                                <input type="checkbox" name="featured" onChange={handleCheckbox} defaultChecked={allcheckbox.featured === 1 ? true:false } className="w-50 h-50" />
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Popular (checked=shown)</label>
                                <input type="checkbox" name="popular" onChange={handleCheckbox} defaultChecked={allcheckbox.popular === 1 ? true:false } className="w-50 h-50" />
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Status (checked=hidden)</label>
                                <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true:false } className="w-50 h-50" />
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary px-4 mt-2">Submit</button>
                </form>
            </div>
        </div>
    </div>
                        
   
    )
}

export default EditMobil;