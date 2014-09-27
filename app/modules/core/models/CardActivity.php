<?php

namespace Mejili\Core\Models;

use Eloquent;

class CardActivity extends Eloquent {
    
    protected $table = 'card_activities';
    
    public function member(){
        return $this->belongsTo('Mejili\Core\Models\User', 'member_id');
    }
    
    public function card(){
        return $this->belongsTo('Mejili\Core\Models\Card', 'card_id');
    }
}