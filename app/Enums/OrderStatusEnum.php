<?php

namespace App\Enums;

enum OrderStatusEnum: string
{
    case PENDING = 'PENDING';
    case PREPARING = 'PREPARING';
    case READY = 'READY';
    case DELIVERING = 'DELIVERING';
    case COMPLETED = 'COMPLETED';
    case CANCELLED = 'CANCELLED';
}
