<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\System;

class SystemModuleSeeder extends Seeder
{
    public function run(): void
    {
        // Create Systems
        $admin = System::create(['name' => 'Admin', 'code' => 'ADMIN']);
        $hr = System::create(['name' => 'Human Resources', 'code' => 'HR']);

        // Admin System Modules
        $userMgmt = $admin->modules()->create(['name' => 'User Management', 'code' => 'UM', 'icon' => 'users']);
        $settings = $admin->modules()->create(['name' => 'Settings', 'code' => 'SETTINGS', 'icon' => 'settings']);

        // HR System Modules
        $payroll = $hr->modules()->create(['name' => 'Payroll', 'code' => 'PAYROLL', 'icon' => 'money']);
        $recruitment = $hr->modules()->create(['name' => 'Recruitment', 'code' => 'RECRUIT', 'icon' => 'briefcase']);

        // Submodules
        $userMgmt->submodules()->create(['name' => 'Users', 'code' => 'USERS', 'route' => '/users']);
        $userMgmt->submodules()->create(['name' => 'Roles', 'code' => 'ROLES', 'route' => '/roles']);
        $userMgmt->submodules()->create(['name' => 'Permissions', 'code' => 'PERMS', 'route' => '/permissions']);

        $settings->submodules()->create(['name' => 'General', 'code' => 'GEN', 'route' => '/settings/general']);
        $settings->submodules()->create(['name' => 'Company', 'code' => 'COMP', 'route' => '/settings/company']);

        $payroll->submodules()->create(['name' => 'Salaries', 'code' => 'SAL', 'route' => '/payroll/salaries']);
        $payroll->submodules()->create(['name' => 'Bonuses', 'code' => 'BONUS', 'route' => '/payroll/bonuses']);

        $recruitment->submodules()->create(['name' => 'Job Postings', 'code' => 'JOBS', 'route' => '/recruit/jobs']);
        $recruitment->submodules()->create(['name' => 'Applicants', 'code' => 'APPS', 'route' => '/recruit/applicants']);
    }
}