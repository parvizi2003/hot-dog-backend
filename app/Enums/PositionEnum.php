<?php


namespace App\Enums;

enum PositionEnum: string
{
    case COOK = 'cook';
    case CASHIER = 'cashier';
    case COURIER = 'courier';

    public static function values(): array
    {
        return array_map(fn($role) => $role->value, self::cases());
    }
}
