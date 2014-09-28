<?php

namespace Mejili\Core\Controllers;

use Input, Response;
use Mejili\Core\Controllers\BaseController;
use Mejili\Core\Models\Card;
use Mejili\Core\Models\CardList;

/**
 * Card Controller: Responisble for all operations
 * associated with cards.
 * @author Masood Ahmed <masoodahm@live.com>
 */

class CardController extends BaseController {

    /**
    * Add new Card to the list and set the position 
    * of the card to the max + 1 on the list
    * return success status and the id of the new card
    * @return success:Boolean and id: int
    */

    public function addCard(){        
        $listId = Input::get('l');
        $title = Input::get('t');

        $list = CardList::find($listId);
        $card = new Card();
        $card->title = $title;

        $response['success'] = $list->cards()->save($card);
        $response['id'] = $card->id;        
        return Response::json($response);
    }
    
    /**
    * Update position of the card and 
    * return true if successful else return false
    * @return Boolean
    */
    
    public function updatePosition(){
        $cardId = Input::get('cid');        
        $card = Card::find($cardId);
        $newListId = Input::get('nl');
        $previousList = $card->cardList;
        $list = CardList::find($newListId);
        $newPos = Input::get('np');
        if($list->id == $previousList->id){
            $this->makeSpaceInListAt($list, $card, $newPos);        
        }
        else{
            $this->shiftCardsDown($list, $newPos);            
        }        
        $card->position = $newPos;
        $list->cards()->save($card);    
        $this->reorganizeList($previousList);        
    }
    
    /**
    * Make space for a card by moving rest of the cards 
    * up or down.
    * @return void
    */

    private function makeSpaceInListAt($list, $card, $newPos){
        if($card->position < $newPos){
            $this->shiftCardsUp($list, $newPos);
        }
        else{
            $this->shiftCardsDown($list, $newPos);
        }
    }

    /**
    * Push all the cards up having position less than 
    * the current by decreasing their position value.
    * @return void
    */
    
    private function shiftCardsUp($list, $pos){
        foreach($list->cards()->get() as $card){
            if($card->position <= $pos){
                $card->position = $card->position - 1;
                $card->save();
            }
        }
    }

    /**
    * Push all the cards down having position less than 
    * the current by decreasing their position value.
    * @return void
    */
    
    private function shiftCardsDown($list, $pos){
        foreach($list->cards()->get() as $card){
            if($card->position >= $pos){
                $card->position = $card->position + 1;
                $card->save();
            }
        }
    }

    /**
    * Remove all the empty card positions in the board
    * caused by moving the cards.
    * @return void
    */
    
    private function reorganizeList($list){
        $position=0;
        foreach ($list->cards()->orderby('position')->get() as $card ){
            $card->position = $position;            
            $card->save();
            $position++;
        }        
    }


}