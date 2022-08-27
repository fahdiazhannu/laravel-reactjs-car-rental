<?php

namespace App\Http\Controllers\API;

use App\Models\Order;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Sewa;


class CheckoutController extends Controller
{
    public function placeorder(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $validator = Validator::make($request->all(), [
                'namadepan' => 'required|max:191',
                'namabelakang' => 'required|max:191',
                'email' => 'required|max:191',
                'alamat' => 'required|max:191',
                'notelp' => 'required|max:191',
                'kota' => 'required|max:191',
                'provinsi' => 'required|max:191',
            ]);

            if($validator->fails())
            {
                return response()->json([
                    'status'=>422,
                    'errors'=> $validator->messages(),
                
                ]);
            }
        else
        {


            $user_id = auth('sanctum')->user()->id;
            $order = new Order;
            $order->user_id = auth('sanctum')->user()->id;
            $order->namadepan = $request->namadepan;
            $order->namabelakang = $request->namabelakang;
            $order->notelp = $request->notelp;
            $order->email = $request->email;
            $order->alamat = $request->alamat;
            $order->kota = $request->kota;
            $order->provinsi = $request->provinsi;

            $order->payment_mode = "COD";
            $order->tracking_no = 'SEMHAS'.rand(1111,9999);
            $order->save();

            $sewa = Sewa::where('user_id', $user_id)->get();
            $orderitems = [];
            foreach($sewa as $item)
            {
                $orderitems[] = [
                    'mobil_id'=>$item->mobil_id,
                    'qty'=>$item->mobil_qty,
                    'harga'=>$item->mobil->hargasewa_asli,
                ];
                $item->mobil->update([
                    'qty'=>$item->mobil->qty - $item->qty
                ]);

            }
            
            $order->orderitems()->createMany($orderitems);
            Sewa::destroy($sewa);

            return response()->json([
                'status'=>200,
                'message'=> 'Transaksi Sewa Berhasil',
            
            ]);
        }
    }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=> 'Login Untuk Melanjutkan'
            
        
            ]);    
        }

    }

}