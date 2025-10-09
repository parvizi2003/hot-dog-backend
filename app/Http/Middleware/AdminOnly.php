<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminOnly
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && Auth::user()->role === 'ADMIN') {
            return $next($request);
        }

        // Если не админ — разлогиниваем и кидаем обратно
        Auth::logout();

        return redirect()->route('login')->withErrors([
            'email' => 'Access denied. Admins only.',
        ]);
    }
}
