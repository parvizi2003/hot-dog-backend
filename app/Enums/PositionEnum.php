<?php


namespace App\Enums;

enum PositionEnum: string
{
    case COOK = 'COOK';
    case CASHIER = 'CASHIER';
    case COURIER = 'COURIER';

    public static function values(): array
    {
        return array_map(fn($role) => $role->value, self::cases());
    }
}
