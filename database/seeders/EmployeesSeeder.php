<?php

namespace Database\Seeders;

use App\Enums\UserRoleEnum;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EmployeesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Cashier',
                'email' => 'cashier@gmail.com',
                'password' => '123123123',
                'role' => UserRoleEnum::CASHIER->value,
            ],
            [
                'name' => 'Cook',
                'email' => 'cook@gmail.com',
                'password' => '123123123',
                'role' => UserRoleEnum::COOK->value,
            ],
            [
                'name' => 'Courier',
                'email' => 'courier@gmail.com',
                'password' => '123123123',
                'role' => UserRoleEnum::COURIER->value,
            ],
        ];

        foreach ($users as $user) {
            $newUser = User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make($user['password']),
            ]);

            Employee::create([
                'user_id' => $newUser->id,
                'position' => $user['role'],
            ]);


            $newUser->syncRoles($user['role']);
        }
    }
}
