<?php

namespace Mejili\Core\Models;

use Eloquent;

class CardList extends Eloquent {
    
    protected $table = 'lists';
    
    protected $hidden = ['board_id'];
    
    protected $fillable = ['title', 'position', 'archived'];
    
    public function board(){
        return $this->belongsTo('Mejili\Core\Models\Board', 'board_id');
    }
    
    public function cards(){
        return $this->hasMany('Mejili\Core\Models\Card', 'list_id');
    }
}