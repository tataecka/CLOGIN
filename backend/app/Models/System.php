<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class System extends Model
{
    protected $fillable = [
        'name',
        'code',
    ];

    // A system has many modules
    public function modules()
    {
        return $this->hasMany(Module::class);
    }
}