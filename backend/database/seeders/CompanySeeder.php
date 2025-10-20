<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        Company::create([
            'name' => 'ACME Corp',
            'code' => 'ACME',
            'primary_color' => '#3490dc',
            'accent_color' => '#ffcc00',
            'logo_url' => null,
        ]);

        Company::create([
            'name' => 'Beta Inc',
            'code' => 'BETA',
            'primary_color' => '#e3342f',
            'accent_color' => '#38c172',
            'logo_url' => null,
        ]);
    }
}