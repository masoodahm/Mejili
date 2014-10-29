<?php


namespace Mejili\Content\Controllers;

use Redirect, Response;
use Mejili\Core\Controllers\BaseController;

class HomeController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function showWelcome()
	{		
        return Redirect::route('boards');
	}        
    
    public function dummy(){
        return Response::json(['done'=>'done']);
    }
}
