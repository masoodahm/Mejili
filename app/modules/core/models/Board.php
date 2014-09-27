<?php

namespace Mejili\Core\Models;

use Eloquent;

class Board extends Eloquent{
    
    protected $table = 'boards';
    
    protected $hidden = array('id', 'description');
    
    protected $fillable = array('name', 'open', 'board_visibility', 'description');
    
    public function members(){
        return $this->belongsToMany('Mejili\Core\Models\User', 'board_members', 'board_id', 'member_id')->withPivot('admin');
    }
    
    public function activities(){
        return $this->hasMany('Mejili\Core\Models\BoardActivity', 'board_id'); 
    }
    
    public function lists(){
        return $this->hasMany('Mejili\Core\Models\CardList', 'board_id');
    }
}