<?php

use App\Enums\OrderStatusEnum;
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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(User::class)->nullable()->constrained()->nullOnDelete();
            $table->string('user_name')->nullable();
            $table->string('address')->nullable();
            $table->string('phone_number')->nullable();

            $table->decimal('total', 10, 2)->default(0);
            $table->unsignedInteger('items_count')->default(0);
            $table->enum('status', OrderStatusEnum::values())->default(OrderStatusEnum::PENDING->value);

            $table->timestamps();
            $table->index(['user_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
