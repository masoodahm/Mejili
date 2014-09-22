<?php

class CardList extends Eloquent {
    
    protected $table = 'lists';
    
    protected $hidden = ['board_id'];
    
    protected $fillable = ['title', 'position', 'archived'];
    
    public function board(){
        return $this->belongsTo('Board', 'board_id');
    }
    
    public function cards(){
        return $this->hasMany('Card', 'list_id');
    }
}