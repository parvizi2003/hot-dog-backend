<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::paginate(10);
        return Inertia::render('products/index', ['data' => $products]);
    }
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('products/create', ['categories' => $categories]);
    }
}
