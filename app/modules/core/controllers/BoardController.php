<?php

namespace Mejili\Core\Controllers;

use View, Auth, Redirect, Input, Board, Response;
class BoardController extends \BaseController {

    public function index($id){
        $data['id'] = $id;
        return View::make('core::users.board', $data);
    }

    public function listBoards(){

        $user = Auth::user();
        $boards = $user->boards;
        $data['boards'] = $boards;
        return View::make('core::users.boards-list', $data);
    }

    public function addBoard(){

        $name = Input::get('boardName');
        if($name!=''){
            $user = Auth::user();
            $board = new Board(['name' => $name, 'open' => true, 'board_visibility' => 0, 'description' => 'n']);
            $board = $user->boards()->save($board);
            $user->boards()->updateExistingPivot($board->id, ['admin'=> true]);
        }
        return Redirect::route('boards');
    }

    public function getViewModel(){
        $boardId = Input::get('b');
        $board = Board::find($boardId);
        $lists = $board->lists()->with('cards')->orderby('position')->get();
        $data['lists'] = $lists;

        return Response::json($data);
    }

}
