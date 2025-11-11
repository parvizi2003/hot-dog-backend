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
        return $this->belongsToMany(Order::class, 'employee_order')
            ->withTimestamps()
            ->withPivot('status'); // если нужно хранить статус выполнения конкретного заказа
    }
}
