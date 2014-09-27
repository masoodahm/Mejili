<?php

namespace Mejili\Auth\Controllers;

use Redirect, View, Input, Auth;
use Mejili\Core\Controllers\BaseController;

/**
 * Auth Controller: Responisble for all operations
 * associated with user authentication
 * @author Masood Ahmed <masoodahm@live.com>
 */


class AuthController extends BaseController {

    public function showLoginPage() {

        return View::make('auth::users.login');
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
    
    public function logout(){
        Auth::logout();
        return Redirect::route('home');
    }

}
