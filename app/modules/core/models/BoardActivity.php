<?php

namespace Mejili\Core\Models;

use Eloquent;

class BoardActivity extends Eloquent{
    
    protected $table = 'board_activities';
    
    public function board(){
        return $this->belongsTo('Board', 'board_id');
    }
    
    public function user(){
        return $this->belongsTo('User', 'member_id');
    }
    
    
}
