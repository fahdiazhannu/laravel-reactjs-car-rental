<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Mobil;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function index()
    {
        $category = Category::where('status', '0')->get();
        return response()->json([
            'status' => 200,
            'category' => $category
        ]);
    }
    public function mobil($slug)
    {
        $category = Category::where('slug', $slug)->where('status', '0')->first();
        if($category)
        {
            $mobil = Mobil::where('category_id', $category->id)->where('status', '0')->get();
            if($mobil)
            {
                return response()->json([
                    'status'=>200,
                    'mobil_data'=> [
                        'mobil'=>$mobil,
                        'category'=>$category,
                    ]
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=> 'Produk Tidak Ditemukan'
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=> 'Kategori Tidak Ditemukan'
            ]);
        }
    }
    public function detailmobil($category_slug, $mobil_slug)
    {
        $category = Category::where('slug', $category_slug)->where('status', '0')->first();
        if($category)
        {
            $mobil = Mobil::where('category_id', $category->id)
                            ->where('slug', $mobil_slug)
                            ->where('status', '0')->first();
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
                    'message'=> 'Produk Tidak Ditemukan'
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=> 'Kategori Tidak Ditemukan'
            ]);
        }
    }
}
