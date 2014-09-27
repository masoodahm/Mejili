<?php

namespace Mejili\Core\Models;

use Eloquent;

class CardAttachment extends Eloquent {
    
    protected $table = 'card_attachments';
    
    public function card() {
        return $this->belongsTo('Mejili\Core\Models\Card');        
    }
    
    public function user() {
        return $this->belongsTo('Mejili\Core\Models\User');        
    }
}