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

Route::get('/', ['as'=> 'home', 'uses'=> 'Mejili\Content\Controllers\HomeController@showWelcome']);
Route::post('save', 'Mejili\Content\Controllers\HomeController@dummy');


Route::group(['before' => 'guest'], function()
{
    Route::get('login', ['as'=>'login' ,'uses'=>'Mejili\Auth\Controllers\AuthController@showLoginPage']);

    Route::post('login', ['as'=>'login' ,'uses'=>'Mejili\Auth\Controllers\AuthController@login']);
});


Route::group(['before' => 'auth'], function()
{
    Route::get('b/{id}', ['as'=>'board' ,'uses'=>'Mejili\Core\Controllers\BoardController@index']);

    Route::get('boards', ['as'=>'boards' ,'uses'=>'Mejili\Core\Controllers\BoardController@listBoards']);

    Route::post('addboard', ['as'=>'addboard' ,'uses'=>'Mejili\Core\Controllers\BoardController@addBoard']);
    
    Route::get('logout', [ 'as'=>'logout' , 'uses'=>'Mejili\Auth\Controllers\AuthController@logout']);
    
    // Access api routes
    Route::group(['prefix' => '/api'], function(){
        
        Route::post('b/view_model', ['as'=>'api_get_view_model' ,'uses'=>'Mejili\Core\Controllers\BoardController@getViewModel']);
        
        Route::post('b/list/add_list', ['as'=>'api_add_list' ,'uses'=>'Mejili\Core\Controllers\ListController@addList']);
        
        Route::post('b/list/card/add_card', ['as'=>'api_get_add_card' ,'uses'=>'Mejili\Core\Controllers\CardController@addCard']);
                
        Route::post('b/list/card/updatePosition', ['as'=>'api_get_update_card' ,'uses'=>'Mejili\Core\Controllers\CardController@updatePosition']);
        
        Route::post('b/list/updatePosition', 'Mejili\Core\Controllers\ListController@updatePosition');
        
        Route::post('b/list/delete', 'Mejili\Core\Controllers\ListController@deleteList');
        
        Route::post('b/list/card/setColor', 'Mejili\Core\Controllers\CardController@setColor');
        
        Route::post('b/list/card/delete', 'Mejili\Core\Controllers\CardController@deleteCard');
        
        Route::post('b/list/setTitle', 'Mejili\Core\Controllers\ListController@setTitle');
        
        Route::post('b/list/card/updateDescription', 'Mejili\Core\Controllers\CardController@updateDescription');
        
        Route::post('b/list/card/updateTitle', 'Mejili\Core\Controllers\CardController@updateTitle');
        
        
        // only for development
        // Route::get('b/view_model', ['as'=>'api_get_view_model' ,'uses'=>'BoardController@getViewModel']);
        
    });
});

