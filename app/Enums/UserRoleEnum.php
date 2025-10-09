<?php

namespace App\Enums;

enum UserRoleEnum: string
{
    case ADMIN = 'ADMIN';
    case USER = 'USER';
    case CASHIER = 'CASHIER';
    case COOK = 'COOK';
}
