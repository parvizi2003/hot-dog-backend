<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::paginate(10);
        return Inertia::render('categories/index', ['data' => $categories]);
    }

    public function create()
    {
        return Inertia::render('categories/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = $request->file('image')->store('categories', 'public');

        $category = Category::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'image_url' => $imagePath,
        ]);

        return redirect()
            ->route('categories.edit', $category->id)
            ->with('success', 'Category created successfully.');
    }

    public function show(Category $category)
    {
        return Inertia::render('categories/show', ['category' => $category]);
    }

    public function edit(Category $category)
    {
        return Inertia::render('categories/edit', ['category' => $category]);
    }

    public function update(Request $request, Category $category)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $category->name = $validated['name'];
        $category->slug = Str::slug($validated['name']);

        // Обработка нового изображения
        if ($request->hasFile('image')) {
            // Удаляем старое, если есть
            if ($category->image_url && Storage::disk('public')->exists($category->image_url)) {
                Storage::disk('public')->delete($category->image_url);
            }

            // Сохраняем новое изображение
            $imagePath = $request->file('image')->store('categories', 'public');
            $category->image_url = $imagePath;
        }

        $category->save();

        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }



    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }
}
