<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('dashboard');
})->name('home');

Route::get('/test', function () {
    return Inertia::render('test', ['data' => Category::paginate(10)]);
})->name('test');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

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
        Route::put('/{category}',       'update')->name('update');
        Route::delete('/{category}',    'destroy')->name('destroy');
    });

    Route::controller(ProductController::class)->prefix('products')->name('products.')->group(function () {
        Route::get('/',              'index')->name('index');
        Route::get('/create',        'create')->name('create');
        Route::post('/',             'store')->name('store');
        Route::get('/{product}',       'show')->name('show');
        Route::get('/{product}/edit',  'edit')->name('edit');
        Route::put('/{product}',       'update')->name('update');
        Route::delete('/{product}',    'destroy')->name('destroy');
    });
});

Route::middleware(['auth', 'verified'])->prefix('cashier')->group(function () {
    Route::get('/', function () {
        return Inertia::render('cashier/main');
    })->name('cashier.main');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
