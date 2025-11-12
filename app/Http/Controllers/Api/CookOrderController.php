<?php

namespace App\Http\Controllers\Api;

use App\Enums\OrderStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\CookOrder;
use App\Models\Order;
use Illuminate\Http\Request;

class CookOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $employee = $request->user()->employee;

        if (!$employee) {
            return response()->json(['message' => 'Employee record not found'], 404);
        }

        // Получаем заказы через pivot таблицу cook_order
        $cookOrders = $employee->orders()->with('items')->get();
        $cookOrders->makeHidden('pivot');
        return $cookOrders;
    }


    public function pendingOrder()
    {
        $oldestPendingOrder = Order::where('status', OrderStatusEnum::PENDING)
            ->orderBy('created_at')
            ->first();
        if ($oldestPendingOrder) {
            return $oldestPendingOrder->load('items');
        } else {
            return ["message" => "No pending orders yet."];
        }
    }

    public function acceptedOrder(Request $request)
    {
        $employee = $request->user()->employee;

        if (!$employee) {
            return response()->json(['message' => 'Employee record not found'], 404);
        }

        // Получаем заказы через pivot таблицу cook_order
        $acceptedOrder = $employee->orders()
            ->where('status', OrderStatusEnum::PREPARING->value)->with('items')
            ->first();

        if ($acceptedOrder === null) {
            return response()->json(['message' => 'No accepted orders found']);
        }

        $acceptedOrder->makeHidden('pivot');
        return $acceptedOrder;
    }

    public function acceptOrder(Request $request, Order $order)
    {
        $employee = $request->user()->employee;

        if (!$employee) {
            return response()->json(['message' => 'Employee record not found'], 404);
        }

        if ($order->status !== OrderStatusEnum::PENDING->value) {
            return response()->json(['message' => 'Order is not pending'], 400);
        }



        $order->status = OrderStatusEnum::PREPARING;
        $order->save();

        $employee->orders()->syncWithoutDetaching([
            $order->id => ['accepted_at' => now()]
        ]);

        return ['message' => 'Order accepted for preparation'];
    }

    public function finishOrder(Request $request, Order $order)
    {
        $employee = $request->user()->employee;

        if (!$employee) {
            return response()->json(['message' => 'Employee record not found'], 404);
        }

        if ($order->status !== OrderStatusEnum::PREPARING->value) {
            return response()->json(['message' => 'Order is not in preparing status'], 400);
        }

        // обновляем статус заказа
        $order->update([
            'status' => OrderStatusEnum::READY->value,
        ]);

        // фиксируем время завершения в pivot-таблице
        $employee->orders()->syncWithoutDetaching([
            $order->id => ['completed_at' => now()],
        ]);

        return response()->json([
            'message' => 'Order marked as ready',
            'order' => $order,
        ]);
    }
}
