<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;


class OrderController extends Controller
{
    public function index()
    {
    $orders = Order::all();
    return response()->json([
        'status'=> 200,
        'orders'=> $orders,
    ]);
    }

    public function history()
    {
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $orders = Order::where('user_id', $user_id)->get();
            return response()->json([
                'status'=> 200,
                'orders'=> $orders,
            ]);       
        }


    }

}
