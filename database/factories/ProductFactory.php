<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->words(3, true);

        return [
            'category_id' => Category::inRandomOrder()->first()?->id ?? Category::factory(),
            'name'        => ucfirst($name),
            'image_url'   => $this->faker->imageUrl(640, 480, 'products', true),
            'price'       => $this->faker->randomFloat(2, 1, 9999),
            'slug'        => Str::slug($name) . '-' . $this->faker->unique()->numberBetween(1, 9999),
            'description' => $this->faker->text(20),
        ];
    }
}
