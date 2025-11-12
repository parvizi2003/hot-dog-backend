<?php

use App\Models\Employee;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cook_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Employee::class, 'cook_id')->nullable()->constrained('employees')->nullOnDelete();
            $table->foreignIdFor(Order::class)->constrained('orders');
            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cook_order');
    }
};
