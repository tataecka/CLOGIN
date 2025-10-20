<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Company;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
            'company_code' => 'required|string'
        ]);

        $user = User::where('username', $request->username)->first();
        $company = Company::where('code', $request->company_code)->first();

        if (!$user || !$company || !$user->is_active || $user->company_id !== $company->id) {
            return response()->json(['error' => 'Invalid credentials or company'], 401);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid password'], 401);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
            'company' => $company
        ]);
    }

    public function getCompanies()
    {
        return Company::select('id', 'name', 'code')->get();
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}