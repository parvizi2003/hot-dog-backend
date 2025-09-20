<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected function getCart(Request $request)
    {
        return $request->user()->cart ?? $request->user()->cart()->create([
            'items_count' => 0,
            'total' => 0,
        ]);
    }

    public function show(Request $request)
    {
        return $this->getCart($request)->load('items.product');
    }

    public function addToCart(Product $product, Request $request)
    {
        $cart = $this->getCart($request);

        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if (!$cartItem) {
            $cartItem = $cart->items()->create([
                'product_id' => $product->id,
                'count' => 1,
                'total' => $product->price,
            ]);
        } else {
            $cartItem->count++;
            $cartItem->total = $cartItem->count * $product->price;
            $cartItem->save();
        }

        $cart->recalculateTotals();

        return ['message' => 'Product added to cart successfully'];
    }

    public function clear(Request $request)
    {
        $cart = $this->getCart($request);
        $cart->items()->delete();
        return ['message' => 'Cart cleared successfully'];
    }

    public function itemAction(Request $request, CartItem $cartItem, string $action)
    {
        $cart = $this->getCart($request);

        // 🔐 Проверка на принадлежность
        if ($cartItem->cart_id !== $cart->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if (!in_array($action, ['increment', 'decrement'])) {
            return response()->json(['message' => 'Invalid action'], 400);
        }

        if ($action === 'increment') {
            $cartItem->count++;
        } elseif ($action === 'decrement') {
            $cartItem->count--;
        }

        if ($cartItem->count < 1) {
            $cartItem->delete();
        } else {
            $cartItem->total = $cartItem->count * $cartItem->product->price;
            $cartItem->save();
        }

        $cart->recalculateTotals();

        return ['message' => 'Cart item updated successfully'];
    }

    public function destroyItem(Request $request, CartItem $cartItem)
    {
        $cart = $this->getCart($request);

        // 🔐 Проверка на принадлежность
        if ($cartItem->cart_id !== $cart->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cartItem->delete();
        $cart->recalculateTotals();

        return ['message' => 'Cart item deleted successfully'];
    }

    // Неиспользуемые методы — можно удалить или реализовать позже
    public function index() {}
    public function store(Request $request) {}
    public function update(Request $request, string $id) {}
    public function destroy(string $id) {}
}
