<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sewa;
use App\Models\Mobil;


class SewaController extends Controller
{
    public function sewamobil(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $mobil_id = $request->mobil_id;
            $tgl_sewa = $request->tgl_sewa;
            $mobil_qty = $request->mobil_qty;

            $mobilCheck = Mobil::where('id', $mobil_id)->first();
            if($mobilCheck)
            {
                if(Sewa::where('user_id', $user_id)->exists())
                {
                    return response()->json([
                        'status'=> 409,
                        'message'=> ' 1 Akun Hanya dapat Menyewa 1 Mobil ',
                    ]);
                }
                else
                {
                    $sewaitem = new Sewa;
                    $sewaitem->user_id = $user_id;
                    $sewaitem->tgl_sewa = $tgl_sewa;
                    $sewaitem->mobil_id = $mobil_id;
                    $sewaitem->mobil_qty = $mobil_qty;
                    $sewaitem->save();

                    return response()->json([
                        'status'=> 201,
                        'message'=> 'Ditambahkan Ke Transaksi Sewa',
                    ]);
                }
                return response()->json([
                    'status'=> 201,
                    'message'=> 'Halaman Sewa',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=> 404,
                    'message'=> 'Mobil Tidak Ditemukan',
                ]);
            }

        }
        else{
                return response()->json([
                    'status'=> 401,
                    'message'=> 'Login Untuk Melakukan Transaksi Sewa',
                ]);
        }
    }
    public function detailsewa()
    {
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $sewaitem = Sewa::where('user_id', $user_id)->get();
            return response()->json([
                'status'=> 200,
                'sewa'=> $sewaitem,
            ]);       
        }
        else
        {
            
            return response()->json([
                'status'=> 401,
                'message'=> 'Login Untuk Melakukan Transaksi Sewa',
            ]);
        }

    }

    public function updateqty($sewa_id, $scope)
    {
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $sewaitem = Sewa::where('id', $sewa_id)->where('user_id', $user_id)->first();
            if($scope == "inc"){
                $sewaitem->mobil_qty += 1 ;
            }else if($scope == "dec"){
                $sewaitem->mobil_qty -= 1 ;
            }
            $sewaitem->update();
            return response()->json([
                'status'=> 200,
                'message'=> 'Durasi Sewa Diperbaharui',
            ]);
            
        }
        else
        {
            return response()->json([
                'status'=> 401,
                'message'=> 'Login Untuk Melakukan Transaksi Sewa',
            ]);
        }
    }

    public function delete($sewa_id)
    {
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $sewaitem = Sewa::where('id', $sewa_id)->where('user_id', $user_id)->first();
            if($sewaitem)
            {
               $sewaitem->delete();    
               return response()->json([
                'status'=> 200,
                'message'=> 'Transaksi Berhasil Dihapus' ,
            ]);   
  
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message'=> 'Transaksi Sewa Tidak Ditemukan' ,
            ]);    
        }   
        }
        else
        {
            return response()->json([
                'status'=> 200,
                'message'=> 'Login Untuk Melanjutkan',
            ]);  
        }
    }
}
