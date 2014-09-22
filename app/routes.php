<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', ['as'=> 'home', 'uses'=> 'HomeController@showWelcome']);

Route::group(['before' => 'guest'], function()
{
    Route::get('login', ['as'=>'login' ,'uses'=>'UserController@showLoginPage']);

    Route::post('login', ['as'=>'login' ,'uses'=>'UserController@login']);
});


Route::group(['before' => 'auth'], function()
{
    Route::get('b/{id}', ['as'=>'board' ,'uses'=>'BoardController@index']);

    Route::get('boards', ['as'=>'boards' ,'uses'=>'BoardController@listBoards']);

    Route::post('addboard', ['as'=>'addboard' ,'uses'=>'BoardController@addBoard']);
    
    // Access api routes
    Route::group(['prefix' => '/api'], function(){
        
        Route::post('b/view_model', ['as'=>'api_get_view_model' ,'uses'=>'BoardController@getViewModel']);
        
        Route::post('b/list/add_list', ['as'=>'api_add_list' ,'uses'=>'ListController@addList']);
        
        Route::post('b/list/card/add_card', ['as'=>'api_get_add_card' ,'uses'=>'CardController@addCard']);
                
        Route::post('b/list/card/update', ['as'=>'api_get_update_card' ,'uses'=>'CardController@updateCard']);
        
        Route::post('b/list/updatePosition', 'ListController@updatePosition');
        
        // only for development
        // Route::get('b/view_model', ['as'=>'api_get_view_model' ,'uses'=>'BoardController@getViewModel']);
        
    });
});

