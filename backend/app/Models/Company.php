<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'code', 'primary_color', 'accent_color', 'logo_url'
    ];

    protected $visible = [
        'id', 'name', 'code', 'primary_color', 'accent_color', 'logo_url',
        'created_at', 'updated_at'
    ];
}