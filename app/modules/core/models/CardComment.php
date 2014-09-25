<?php

class CardComment extends Eloquent {
    
    protected $table = 'card_comments';
    
    public function commenter(){
        return $this->belongsTo('User', 'commenter_id');
    }
    
    public function card(){
        return $this->belongsTo('Card', 'card_id');
    }
}