<?php

class UserController extends BaseController {

    /*
	|--------------------------------------------------------------------------
	| User Controller
	|--------------------------------------------------------------------------
	|
	| This is a users controller responsible for creating, signing in and
	| managing users
	|
	*/

    public function showLoginPage() {

        return View::make('users.login');
    }

    public function login(){

        $username = Input::get('username');
        $pass = Input::get('password');

        try{
            Auth::attempt(array(
                'username' => $username,
                'password' => $pass
            ));
        }
        catch(UserNotFoundException $e){

        }
        catch(UserPasswordIncorrectException $e){

        }
        
        return Redirect::route('boards');
    }

}