<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->paginate(10);
        return Inertia::render('products/index', ['data' => $products]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('products/create', ['categories' => $categories]);
    }

    public function show(Product $product)
    {
        return Inertia::render('products/show', ['product' => $product]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        // Handle the image upload
        $imagePath = $request->file('image')->store('products', 'public');

        // Create the product
        Product::create([
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'image_url' => $imagePath,
            'price' => $validated['price'],
            'description' => $validated['description'],
        ]);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product)
    {

        return Inertia::render('products/edit', ['product' => $product, 'categories' => Category::all()]);
    }

    public function update(Request $request, Product $product)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Image is optional during update
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        // If an image is provided, store the new image and delete the old one
        if ($request->hasFile('image')) {
            // Delete the old image
            if ($product->image_url && file_exists(storage_path('app/public/' . $product->image_url))) {
                unlink(storage_path('app/public/' . $product->image_url));
            }

            // Store the new image
            $imagePath = $request->file('image')->store('products', 'public');
        } else {
            // If no new image is uploaded, retain the old one
            $imagePath = $product->image_url;
        }

        // Update the product
        $product->update([
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'image_url' => $imagePath,
            'price' => $validated['price'],
            'description' => $validated['description'],
        ]);

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        if ($product->image_url && file_exists(storage_path('app/public/' . $product->image_url))) {
            unlink(storage_path('app/public/' . $product->image_url));
        }

        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
