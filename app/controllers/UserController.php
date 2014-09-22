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
            //Todo: show an error on the screen for user not found
        }
        catch(UserPasswordIncorrectException $e){
            //Todo: show an error on the screen for incorrect password
        }
        
        return Redirect::route('boards');
    }

}