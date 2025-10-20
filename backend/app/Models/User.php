<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'username',
        'email',
        'password',
        'full_name',
        'company_id',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // A user belongs to one company
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    // A user has many submodule permissions (via pivot)
    public function submodules()
    {
        return $this->belongsToMany(Submodule::class, 'user_submodule');
    }
}