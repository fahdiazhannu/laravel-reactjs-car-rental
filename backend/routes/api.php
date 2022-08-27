<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\MobilController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\SewaController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\OrderController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('search/{key}', [MobilController::class, 'search']);

Route::middleware(['auth:sanctum'])->group(function() {

    Route::get('/checkingAuthenticated', function() {
        return response()->json(['message' => 'You are in', 'status' => 200], 200);

       
    });


    Route::post('logout', [AuthController::class, 'logout']);



//Kategori
Route::post('store-category', [CategoryController::class, 'store']);
Route::get('view-category', [CategoryController::class, 'index']);
Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
Route::put('update-category/{id}', [CategoryController::class, 'update']);
Route::delete('delete-category/{id}', [CategoryController::class, 'destroy']);
Route::get('all-category', [CategoryController::class, 'allcategory']);


//Order API
Route::get('admin/orders', [OrderController::class, 'index']);
Route::get('riwayat', [OrderController::class, 'history']);

Route::get('getCategory', [FrontendController::class, 'index']);
Route::get('fetchmobil/{slug}', [FrontendController::class, 'mobil']);
Route::get('mobildetail/{category_slug}/{mobil_slug}', [FrontendController::class, 'detailmobil']);
Route::post('sewa-mobil', [SewaController::class, 'sewamobil']);
Route::get('detail-sewa', [SewaController::class, 'detailsewa']);
Route::put('sewa-update/{sewa_id}/{scope}', [SewaController::class, 'updateqty']);
Route::delete('delete-sewaitem/{sewa_id}', [SewaController::class, 'delete']);
Route::post('place-order', [CheckoutController::class, 'placeorder']);

//Routes Mobil
Route::post('store-mobil', [MobilController::class, 'store']);
Route::get('all-category', [CategoryController::class, 'allcategory']);
Route::get('view-mobil', [MobilController::class, 'index']);
Route::get('edit-mobil/{id}', [MobilController::class, 'edit']);
Route::post('update-mobil/{id}', [MobilController::class, 'update']);



});


// Route::middleware(['auth:sanctum'])->group(function() {

//     Route::post('logout', [AuthController::class, 'logout']);
// });

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
