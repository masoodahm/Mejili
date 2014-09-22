<?php

class Board extends Eloquent{
    
    protected $table = 'boards';
    
    protected $hidden = array('id', 'description');
    
    protected $fillable = array('name', 'open', 'board_visibility', 'description');
    
    public function members(){
        return $this->belongsToMany('User', 'board_members', 'board_id', 'member_id')->withPivot('admin');
    }
    
    public function activities(){
        return $this->hasMany('BoardActivity', 'board_id'); 
    }
    
    public function lists(){
        return $this->hasMany('CardList', 'board_id');
    }
}