<?php

namespace Mejili\Core\Models;

use Toddish\Verify\Models\User as VerifyUser;

class User extends VerifyUser {
    
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	public function boards(){
        return $this->belongsToMany('Board', 'board_members', 'member_id', 'board_id')->withPivot('admin');
    }
    
    public function boardActivities(){
        return $this->hasMany('BoardActivity', 'member_id'); 
    }
    
    public function cards(){
        return $this->belongsToMany('Card', 'card_members', 'member_id', 'card_id');
    }
}
