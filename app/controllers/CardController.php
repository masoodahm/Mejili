<?php

class CardController extends BaseController {
    
    public function addCard(){        
        $listId = Input::get('l');
        $title = Input::get('t');
        
        $list = CardList::find($listId);
        $card = new Card();
        $card->title = $title;
        
        $list->cards()->save($card);
        
        // Todo: first make sure the card was added.
        $response['success'] = true;
        $response['id'] = $card->id;
        
        return Response::json($response);
    }
    
    public function updateCard(){
        $cardId = Input::get('cid');        
        $card = Card::find($cardId);
                
        $newListId = Input::get('nl');
        $previousList = $card->cardList;
        
        $list = CardList::find($newListId);
        
        $newPos = Input::get('np');
        
        $this->makeSpaceInlistAt($list, $newPos);
        $card->position = $newPos;
        $list->cards()->save($card);
        
        $this->reorganizeList($previousList);        
    }
    
    private function makeSpaceInlistAt($list, $pos){
        foreach($list->cards()->get() as $card){
            if($card->position >= $pos){
                $card->position = $card->position + 1;
                $card->save();
            }
        }
    }
    
    private function reorganizeList($list){
        $position=0;
        foreach ($list->cards()->orderby('position')->get() as $card ){
            $card->position = $position;            
            $card->save();
            $position++;
        }        
    }
    
    
}