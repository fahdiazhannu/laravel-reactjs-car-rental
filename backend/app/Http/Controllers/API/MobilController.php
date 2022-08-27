<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mobil;
use Illuminate\Support\Facades\Validator;
use \Illuminate\Support\Facades\File;

class MobilController extends Controller
{

    public function index()
    {
        $mobil = Mobil::all();
        return response()->json([
            'status' => 200,
            'mobil' => $mobil
        ]);
    }



    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|max:191',
            'slug' => 'required|max:191',
            'nama' => 'required|max:191',
         
            'merk' => 'required|max:50',
            'hargasewa_asli' => 'required|max:20',
            'hargasewa_disk' => 'required|max:20',
            'qty' => 'required|max:4',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        else 
        {
            $mobil = new Mobil;
            $mobil->category_id = $request->input('category_id');
            $mobil->slug = $request->input('slug');
            $mobil->nama = $request->input('nama');
            $mobil->deskripsi = $request->input('deskripsi');


            $mobil->merk = $request->input('merk');
            $mobil->hargasewa_asli = $request->input('hargasewa_asli');
            $mobil->hargasewa_disk = $request->input('hargasewa_disk');
            $mobil->tahunmobil = $request->input('tahunmobil');
            $mobil->kapasitas = $request->input('kapasitas');
            $mobil->qty = $request->input('qty');

            if($request->hasFile('image'))
            {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time().'.'.$extension;
                $file->move('uploads/mobil/', $filename);
                $mobil->image = 'uploads/mobil/'.$filename;
            }

            $mobil->featured = $request->input('featured') == true ? '1':'0';
            $mobil->popular = $request->input('popular') == true ? '1':'0';
            $mobil->status = $request->input('status') == true ? '1':'0';
            $mobil->save();
            return response()->json([
                'status'=>200,
                'message'=>'Data Mobil Berhasil Ditambahkan',
            ]);

        }
    }
    public function edit($id)
    {
        $mobil = Mobil::find($id);
        if($mobil)
        {
            return response()->json([
                'status'=>200,
                'mobil'=>$mobil,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'Mobil Tidak Ditemukan'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|max:191',
            'slug' => 'required|max:191',
            'nama' => 'required|max:191',
       
            'merk' => 'required|max:50',
            'hargasewa_asli' => 'required|max:20',
            'hargasewa_disk' => 'required|max:20',
            'qty' => 'required|max:4',
            
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        else 
        {
            $mobil = Mobil::find($id);
            if($mobil)
                {

            $mobil->category_id = $request->input('category_id');
            $mobil->slug = $request->input('slug');
            $mobil->nama = $request->input('nama');
            $mobil->deskripsi = $request->input('deskripsi');


            $mobil->merk = $request->input('merk');
            $mobil->hargasewa_asli = $request->input('hargasewa_asli');
            $mobil->hargasewa_disk = $request->input('hargasewa_disk');
            $mobil->tahunmobil = $request->input('tahunmobil');
            $mobil->kapasitas = $request->input('kapasitas');
            $mobil->qty = $request->input('qty');

            if($request->hasFile('image'))
            {
                $path = $mobil->image;
                if(File::exists($path))
                {
                    File::delete($path);
                }
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time().'.'.$extension;
                $file->move('uploads/mobil/', $filename);
                $mobil->image = 'uploads/mobil/'.$filename;
            }

            $mobil->featured = $request->input('featured')  == true ? '1':'0';
            $mobil->popular = $request->input('popular')  == true ? '1':'0';
            $mobil->status = $request->input('status')  == true ? '1':'0';
            $mobil->update();
            return response()->json([
                'status'=>200,
                'message'=>'Data Mobil Berhasil Diperbaharui',
            ]);

        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'Data Mobil Tidak Ditemukan',
            ]);

        }
    }
  
}
function search($key)
{
    // return Mobil::where('hargasewa_asli', 'Like', "%$hargasewa_asli%")
    // ->orWhere('kapasitas', 'Like', "%$kapasitas%")
    // ->orWhere('merk', 'Like', "%$merk%")
    // ->orWhere('tahunmobil', 'Like', "%$tahunmobil%")->get();
    return Mobil::where('nama', 'Like', "%$key%")->get();
    
}
}