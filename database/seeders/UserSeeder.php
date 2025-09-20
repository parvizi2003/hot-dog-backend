<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Qurbon',
            'email' => 'qurbon@gmail.com',
            'password' => Hash::make('123123123'),
        ]);
        Cart::create([
            'user_id' => $user->id,
        ]);
    }
}
