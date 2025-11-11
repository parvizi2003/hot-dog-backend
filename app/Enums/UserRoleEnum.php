<?php

namespace App\Enums;

enum UserRoleEnum: string
{
    case ADMIN = 'ADMIN';
    case USER = 'USER';
    case CASHIER = 'CASHIER';
    case COOK = 'COOK';
    case COURIER = 'COURIER';

    public static function values(): array
    {
        return array_map(fn($role) => $role->value, self::cases());
    }
}
