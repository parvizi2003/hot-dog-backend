<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth'])->group(function () {
    Route::get('/', function () {
        return redirect()->route('dashboard');
    })->name('home');

    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::controller(UserController::class)->prefix('users')->name('users.')->group(function () {
        Route::get('/',              'index')->name('index');
        Route::get('/create',        'create')->name('create');
        Route::post('/',             'store')->name('store');
        Route::get('/{user}',       'show')->name('show');
        Route::get('/{user}/edit',  'edit')->name('edit');
        Route::put('/{user}',       'update')->name('update');
        Route::delete('/{user}',    'destroy')->name('destroy');
    });

    Route::controller(OrderController::class)->prefix('orders')->name('orders.')->group(function () {
        Route::get('/',              'index')->name('index');
        Route::get('/create',        'create')->name('create');
        Route::post('/',             'store')->name('store');
        Route::get('/{order}',       'show')->name('show');
        Route::get('/{order}/edit',  'edit')->name('edit');
        Route::put('/{order}',       'update')->name('update');
        Route::delete('/{order}',    'destroy')->name('destroy');
    });

    Route::controller(CategoryController::class)->prefix('categories')->name('categories.')->group(function () {
        Route::get('/',              'index')->name('index');
        Route::get('/create',        'create')->name('create');
        Route::post('/',             'store')->name('store');
        Route::get('/{category}',       'show')->name('show');
        Route::get('/{category}/edit',  'edit')->name('edit');
        Route::post('/{category}/update',       'update')->name('update');
        Route::delete('/{category}',    'destroy')->name('destroy');
    });

    Route::controller(ProductController::class)->prefix('products')->name('products.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{product}', 'show')->name('show');
        Route::get('/{product}/edit', 'edit')->name('edit');
        Route::post('/{product}/update', 'update')->name('update');
        Route::delete('/{product}', 'destroy')->name('destroy');
    });
});

Route::middleware(['auth', 'verified'])->prefix('cashier')->group(function () {
    Route::get('/', function () {
        return Inertia::render('cashier/main');
    })->name('cashier.main');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
