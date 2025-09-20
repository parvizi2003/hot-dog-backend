<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items')->paginate(10);
        return inertia('orders/index', ['data' => $orders]);
    }

    public function create()
    {
        // Logic to show form for creating a new order
    }

    public function store(Request $request)
    {
        // Logic to store a new order
    }

    public function show(Order $order)
    {
        return inertia('orders/show', ['order' => $order]);
    }

    public function edit($id)
    {
        // Logic to show form for editing an order
    }

    public function update(Request $request, $id)
    {
        // Logic to update a specific order
    }

    public function destroy($id)
    {
        // Logic to delete a specific order
    }
}
