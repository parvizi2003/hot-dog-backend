<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Order;

class Employee extends Model
{
    protected $fillable = [
        'user_id',
        'position',
    ];

    /**
     * Связь с пользователем
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Заказы, которые выполнял этот сотрудник
     */
    public function orders()
    {
        return $this->belongsToMany(
            Order::class,
            'cook_orders',    // Имя pivot таблицы
            'cook_id',        // pivot колонка, указывающая на employee (this)
            'order_id'        // pivot колонка, указывающая на order
        )
            ->withPivot('accepted_at', 'completed_at')
            ->withTimestamps();
    }
}
