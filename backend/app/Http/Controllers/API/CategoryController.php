<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $category = Category::all();
        return response()->json([
            'status'=>200,
            'category'=>$category,
        ]);
    }

    public function edit($id)
    {
        $category = Category::find($id);
        if($category)
        {
            return response()->json([
                'status'=>200,
                'category'=>$category
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'Id Kategori tidak ditemukan'

            ]);
        }
    }



    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'slug' => 'required|max:191',
            'nama' => 'required|max:191',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages(),
                ]);
        }
        else
        {
        $category = Category::find($id);
        if($category)
        {
        $category->slug = $request->input('slug');
        $category->nama = $request->input('nama');
        $category->deskripsi = $request->input('deskripsi');
        if($request->hasFile('image'))
        {
            $path = $category->image;
            if(File::exists($path))
            {
                File::delete($path);
            }
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time().'.'.$extension;
            $file->move('uploads/category/', $filename);
            $category->image = 'uploads/category/'.$filename;
        }
        $category->status = $request->input('status') == true ? '1' : '0';
        $category->save();
        return response()->json([
        'status' => 200,
        'message' => 'category berhasil ditambahkan',
        ]);

        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'Id tidak ditemukan',
                ]);
        }
    }

    }
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'slug' => 'required|max:191',
            'nama' => 'required|max:191',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'message' => $validator->messages(),
                ]);
        }
        else
        {
        $category = new Category;
        $category->slug = $request->input('slug');
        $category->nama = $request->input('nama');
        $category->deskripsi = $request->input('deskripsi');
   

        if($request->hasFile('image'))
        {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time().'.'.$extension;
            $file->move('uploads/category/', $filename);
            $category->image = 'uploads/category/'.$filename;
        }
        $category->status = $request->input('status') == true ? '1' : '0';
        $category->save();
        return response()->json([
        'status' => 200,
        'message' => 'Category berhasil ditambahkan',
        ]);

        }
      }
      public function destroy($id)
      {
          $category = Category::find($id);
          if($category)
          {
              $category->delete();
              return response()->json([
                  'status' => 200,
                  'message' => 'Category berhasil dihapus',
                  ]);
          }
          else
          {
              return response()->json([
                  'status' => 404,
                  'message' => 'ID Kategori tidak ditemukan',
                  ]);
          }
      }

      public function allcategory()
      {
          $category = Category::where('status', '0')->get();
          return response()->json([
              'status'=>200,
              'category'=>$category,
          ]);
      }
    }

  
