<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use Illuminate\Support\Facades\Route;



Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'store']);
    Route::post('/logout', [AuthController::class, 'destroy'])->middleware('auth:sanctum');
    Route::get('/user', [AuthController::class, 'show'])->middleware('auth:sanctum');
});

Route::controller(CategoryController::class)->prefix('categories')->group(function () {
    Route::get('/', 'index');
    Route::get('/{category}', 'show');
});

Route::controller(CartController::class)->middleware('auth:sanctum')->prefix('carts')->group(function () {
    Route::get('/', 'show');
    Route::post('/clear', 'clear');
    Route::post('/addToCart/{product}', 'addToCart');
    Route::post('/items/{cartItem}/{action}', 'itemAction');
    Route::delete('/items/{cartItem}', 'destroyItem');
});

Route::controller(OrderController::class)->middleware('auth:sanctum')->prefix('orders')->group(function () {
    Route::get('/', 'index');
    Route::post('/store', 'store');
    Route::get('/cook', 'cookOrders');
    Route::post('/{order}/accept', 'cookAcceptOrder');
    Route::get('/{order}', 'show');
});
