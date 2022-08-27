<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
   public function register(Request $request)
   {
       $validator =  Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:8',
       ]);

       if($validator->fails())
       {
           return response()->json([
               'validation_errors'=>  $validator->messages(),
           ]);
       }
       else
       {
           $user = User::create([
               'name'=>$request->name,
               'email'=>$request->email,
               'password' => Hash::make($request->password),
           ]);

           $token = $user->createToken($user->email.'_Token')->plainTextToken;
           return response()->json([
               'status'=> 200,
               'username'=>$user->name,
               'token'=>$token,
               'message'=>'Registrasi Berhasil',
           ]);
       }
   }
   
   public function login(Request $request) 
   {
        $validator = Validator::make($request->all(), [
            'email' => 'required|max:191',
            'password' => 'required'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }
        else
        {
            $user = User::where('email', $request-> email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)){
                return response()->json([
                    'status' => 401,
                    'messages' => 'Invalid Credentials',
                ]);
            }
        else
        {

            if($user->role == 1) //login utk admin
            {
                $role = 'admin';
                $token = $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
            }
            else
            {
                $role = '';
                $token = $user->createToken($user->email.'_Token', [''])->plainTextToken;
            }
            return response()->json([
                'status'=> 200,
                'username'=>$user->name,
                'role'=>$role,
                'token'=>$token,
                'message'=>'Login Berhasil',
            ]);
            }
        }
    }

    public function logout()
    {
         auth()->user()->tokens()->delete();
         return response()->json([
             'status'=> 200,
             'message' => 'Logout Berhasil',
         ]);
    }
    
}