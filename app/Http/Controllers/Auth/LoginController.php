<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Dotenv\Validator;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Zend\Diactoros\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    public function doLogout(){
        Auth::logout();
    }
/*
    public function login(Request $request){
        $rules = array(
            'username' =>'required',
            'password'=>'required'
        );
        $validator = Validator::make(Input::all(),$rules);
        if ($validator->fails()){
            return ('Failed');
            ->withErrors($validator)
            ->withInput(Input::except('password'));
        }
        else{
            //create our user data for the authentication
            $userdata = array(
                'username' => Input::get('username'),
                'password'=> Input::get('password')
            );
        }
    }
*/

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
