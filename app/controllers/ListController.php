<?php

class ListController extends BaseController {
    
    public function addList(){
        $boardid = Input::get('b');
        $title = Input::get('t');
        $board = Board::find($boardid);
        
        $list = new CardList();
        $list->title = $title;
        
        $maxPos = $board->lists()->max('position');
        $list->position = $maxPos;
        $board->lists()->save($list);
        $response['id'] = $list->id;
        
        // Todo: first make sure the list was added.
        $response['success'] = true;
        return Response::json($response);
    }
    
    public function updatePosition(){
        $boardid = Input::get('b');
        $board = Board::find($boardid);
        $newPos = Input::get('np');
        $list = CardList::find(Input::get('lid'));
        $this->makeSpaceInBoardAt($board, $newPos);
        $list->position = $newPos;
        $list->save();
        $this->reorganizeBoard($board);
    }
    
    private function makeSpaceInBoardAt($board, $pos){
        foreach($board->lists()->get() as $list){
            if($list->position >= $pos){
                $list->position = $list->position + 1;
                $list->save();
            }
        }
    }
    
    private function reorganizeBoard($board){
        $position=0;
        foreach ($board->lists()->orderby('position')->get() as $list ){
            $list->position = $position;            
            $list->save();
            $position++;
        }        
    }
}