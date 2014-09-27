<?php

namespace Mejili\Core\Models;

use Eloquent;

class CardComment extends Eloquent {
    
    protected $table = 'card_comments';
    
    public function commenter(){
        return $this->belongsTo('Mejili\Core\Models\User', 'commenter_id');
    }
    
    public function card(){
        return $this->belongsTo('Mejili\Core\Models\Card', 'card_id');
    }
}