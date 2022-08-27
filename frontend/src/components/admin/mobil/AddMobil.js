import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert';

function AddMobil()
{

    const history = useHistory();
    const [categorylist, setCategorylist] = useState([]);
    const [mobilInput, setMobil] = useState({
        category_id:'',
        slug:'',
        nama:'',
        deskripsi:'',
        hargasewa_disk:'',
        hargasewa_asli:'',
        qty:'',
        bobot_harga:'',
        bobot_kapasitas:'',
        bobot_fitur:'',
        bobot_bbm:'',
        merk:'',
        tahunmobil:'',
        featured:'',
        popular:'',
        status:'',
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
    

    useEffect(()=> {
        
        axios.get(`/api/all-category`).then(res=>{
            if(res.data.status == 200)
            {
                setCategorylist(res.data.category);
            }

        });
    }, []);    

    const submitMobil = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', gambar.image);
        formData.append('category_id', mobilInput.category_id);
        formData.append('slug', mobilInput.slug);
        formData.append('nama', mobilInput.nama);
        formData.append('deskripsi', mobilInput.deskripsi);

        formData.append('bobot_harga', mobilInput.bobot_harga);
        formData.append('bobot_kapasitas', mobilInput.bobot_kapasitas);
        formData.append('bobot_fitur', mobilInput.bobot_fitur);
        formData.append('bobot_bbm', mobilInput.bobot_bbm);
        formData.append('hargasewa_disk', mobilInput.hargasewa_disk);
        formData.append('hargasewa_asli', mobilInput.hargasewa_asli);
        formData.append('qty', mobilInput.qty);
        formData.append('merk', mobilInput.merk);
        formData.append('tahunmobil', mobilInput.tahunmobil);
        formData.append('kapasitas', mobilInput.kapasitas);
        formData.append('featured', mobilInput.featured);
        formData.append('status', mobilInput.status);
        formData.append('popular', mobilInput.popular);



        axios.post(`/api/store-mobil`, formData).then(res=>{
            if(res.data.status === 200)
            {
                swal('Success', res.data.message, "success");
                history.push('/admin/view-mobil');
                setError([]);
            }
            else if(res.data.status === 422)
            {
                swal("Semua Field Wajib Diisi", "", "error");
                setError(res.data.errors);
            }

        });
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                <h4>Tambah Data Mobil
                    <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">Lihat Data Mobil</Link>
                </h4>
            </div>
            <div className="card-body">
                <form onSubmit={submitMobil} encType="multipart/form-data">
                    
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Input</button>
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
                        {errorlist.slug}
                    </div>
                    
                    <div className="form-group mb-3">
                        <label>Nama</label>
                        <input type="text" name="nama" onChange={handleInput} value={mobilInput.nama} className="form-control" />
                        {errorlist.nama}
                    </div>
                    
                    <div className="form-group mb-3">
                        <label>Deskripsi</label>
                        <textarea name="deskripsi" onChange={handleInput} value={mobilInput.deskripsi} className="form-control"></textarea>
                        {errorlist.deskripsi}
                    </div>

                    </div>

                    <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                        <div className="row">

                            <div className="col-md-4 form-group mb-3">
                                <label>Harga Sewa Diskon</label>
                                <input type="text" name="hargasewa_disk" onChange={handleInput} value={mobilInput.hargasewa_disk} className="form-control" />
                                {errorlist.deskripsi}
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Harga Sewa Base</label>
                                <input type="text" name="hargasewa_asli" onChange={handleInput} value={mobilInput.hargasewa_asli} className="form-control" />
                                {errorlist.hargasewa_asli}
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Quantity</label>
                                <input type="text" name="qty" onChange={handleInput} value={mobilInput.qty} className="form-control" />
                                {errorlist.qty}
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Merk</label>
                                <input type="text" name="merk" onChange={handleInput} value={mobilInput.merk} className="form-control" />
                                {errorlist.merk}
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Kapasitas</label>
                                <input type="text" name="kapasitas" onChange={handleInput} value={mobilInput.kapasitas} className="form-control" />
                                {errorlist.kapasitas}
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Tahun Mobil</label>
                                <input type="text" name="tahunmobil" onChange={handleInput} value={mobilInput.tahunmobil} className="form-control" />
                                {errorlist.tahunmobil}
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Bobot Harga</label>
                                <input type="text" name="bobot_harga" onChange={handleInput} value={mobilInput.bobot_harga} className="form-control" />
                                {errorlist.bobot_harga}
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Bobot Fitur</label>
                                <input type="text" name="bobot_fitur" onChange={handleInput} value={mobilInput.bobot_fitur} className="form-control" />
                                {errorlist.bobot_fitur}
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Bobot Kapasitas</label>
                                <input type="text" name="bobot_kapasitas" onChange={handleInput} value={mobilInput.bobot_kapasitas} className="form-control" />
                                {errorlist.bobot_kapasitas}
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Bobot BBM</label>
                                <input type="text" name="bobot_bbm" onChange={handleInput} value={mobilInput.bobot_bbm} className="form-control" />
                                {errorlist.bbm}
                            </div>
                            <div className="col-md-8 form-group mb-3">
                                <label>Gambar</label>
                                <input type="file" name="image" onChange={handleImage} className="form-control" />
                                {errorlist.image}
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Featured (checked=shown)</label>
                                <input type="checkbox" name="featured" onChange={handleInput} value={mobilInput.featured} className="w-50 h-50" />
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Popular (checked=shown)</label>
                                <input type="checkbox" name="popular" onChange={handleInput} value={mobilInput.popular} className="w-50 h-50" />
                            </div>
                            <div className="col-md-4 form-group mb-3">
                                <label>Status (checked=shown)</label>
                                <input type="checkbox" name="status" onChange={handleInput} value={mobilInput.status} className="w-50 h-50" />
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

export default AddMobil;