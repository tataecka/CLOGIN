<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Company;

class UserSeeder extends Seeder
{
    public function run()
    {
        $acme = Company::where('code', 'ACME')->first();
        $beta = Company::where('code', 'BETA')->first();

        User::firstOrCreate(
            ['username' => 'alice'],
            [
                'full_name' => 'Alice Smith',
                'password' => bcrypt('Passw0rd!'),
                'company_id' => $acme->id,
                'is_active' => true,
            ]
        );

        User::firstOrCreate(
            ['username' => 'bob'],
            [
                'full_name' => 'Bob Johnson',
                'password' => bcrypt('Passw0rd!'),
                'company_id' => $beta->id,
                'is_active' => true,
            ]
        );
    }
}