<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submodule extends Model
{
    protected $fillable = [
        'module_id',
        'name',
        'code',
        'route',
    ];

    // A submodule belongs to one module
    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    // Users who have access to this submodule (optional, for reverse lookup)
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_submodule');
    }
}