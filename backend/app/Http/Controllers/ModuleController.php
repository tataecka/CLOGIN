<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\System;

class ModuleController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $submoduleIds = $user->submodules()->pluck('submodules.id');

        $systems = System::with(['modules.submodules' => function ($query) use ($submoduleIds) {
            $query->whereIn('submodules.id', $submoduleIds);
        }])->get()->filter(fn ($sys) => $sys->modules->isNotEmpty());

        return response()->json($systems->map(function ($sys) {
            return [
                'system_id' => $sys->id,
                'system_name' => $sys->name,
                'modules' => $sys->modules->map(function ($mod) {
                    return [
                        'module_id' => $mod->id,
                        'module_name' => $mod->name,
                        'submodules' => $mod->submodules->map(fn ($sub) => [
                            'id' => $sub->id,
                            'name' => $sub->name,
                            'route' => $sub->route
                        ])->values()
                    ];
                })->values()
            ];
        })->values());
    }
}