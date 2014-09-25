<?php

class CardAttachment extends Eloquent {
    
    protected $table = 'card_attachments';
    
    public function card() {
        return $this->belongsTo('Card');        
    }
    
    public function user() {
        return $this->belongsTo('User');        
    }
}