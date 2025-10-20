<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Submodule;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $alice = User::where('username', 'alice')->first();
        $bob = User::where('username', 'bob')->first();

        // Alice (ACME) gets Admin modules
        $aliceSubmodules = Submodule::whereIn('code', ['USERS', 'ROLES', 'GEN', 'COMP'])->pluck('id');
        foreach ($aliceSubmodules as $subId) {
            \DB::table('user_submodule')->insert([
                'user_id' => $alice->id,
                'submodule_id' => $subId,
                'granted_at' => now(),
            ]);
        }

        // Bob (BETA) gets HR modules
        $bobSubmodules = Submodule::whereIn('code', ['SAL', 'BONUS', 'JOBS', 'APPS'])->pluck('id');
        foreach ($bobSubmodules as $subId) {
            \DB::table('user_submodule')->insert([
                'user_id' => $bob->id,
                'submodule_id' => $subId,
                'granted_at' => now(),
            ]);
        }
    }
}