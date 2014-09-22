<?php

class CardActivity extends Eloquent {
    
    protected $table = 'card_activities';
    
    public function member(){
        return $this->belongsTo('User', 'member_id');
    }
    
    public function card(){
        return $this->belongsTo('Card', 'card_id');
    }
}