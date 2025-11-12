<?php

namespace App\Http\Controllers\Api;

use App\Enums\OrderStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class OrderController extends Controller
{

    public function index()
    {
        $user = Auth::user();

        return Order::where('user_id', $user->id)
            ->orderBy('created_at', 'asc')
            ->get();
    }


    public function store(Request $request)
    {
        $user = $request->user();
        $cart = $user->cart->load('items.product');

        if (!$cart || $cart->items()->count() === 0) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        DB::transaction(function () use ($user, $cart, &$order) {
            // Создание заказа
            $order = Order::create([
                'user_id' => $user->id,
                'user_name' => $user->name,
                'address' => $user->address,
                'phone_number' => $user->phone_number,
                'status' => OrderStatusEnum::PENDING,
                'items_count' => $cart->items_count,
                'total' => $cart->total,
            ]);

            // Переносим товары из корзины в заказ
            foreach ($cart->items as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'product_name' => $cartItem->product->name,
                    'items_count' => $cartItem->count,
                    'price_at_add' => $cartItem->product->price,
                    'total' => $cartItem->total,
                ]);

                $cartItem->delete();
            }

            // Обновляем корзину
            $cart->recalculateTotals();
        });

        return response()->json([
            'message' => 'Order created successfully',
            'order_id' => $order->id
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return $order->load('items');
    }

    public function cookAcceptOrder(Order $order)
    {
        $updated = Order::where('id', $order->id)
            ->where('status', OrderStatusEnum::PENDING)
            ->update([
                'status' => OrderStatusEnum::PREPARING
            ]);

        if ($updated === 0) {
            // никто не обновился → значит заказ уже кем-то принят
            return response()->json(['message' => 'Order is already taken'], 400);
        }

        return response()->json(['message' => 'Order accepted successfully'], 200);
    }

    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
