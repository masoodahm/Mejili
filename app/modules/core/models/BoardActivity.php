<?php

namespace Mejili\Core\Models;

use Eloquent;

class BoardActivity extends Eloquent{
    
    protected $table = 'board_activities';
    
    public function board(){
        return $this->belongsTo('Mejili\Core\Models\Board', 'board_id');
    }
    
    public function user(){
        return $this->belongsTo('Mejili\Core\Models\User', 'member_id');
    }
    
    
}
