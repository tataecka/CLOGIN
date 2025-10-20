<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable = [
        'system_id',
        'name',
        'code',
        'icon',
    ];

    // A module belongs to one system
    public function system()
    {
        return $this->belongsTo(System::class);
    }

    // A module has many submodules
    public function submodules()
    {
        return $this->hasMany(Submodule::class);
    }
}