<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class problem_specialist extends Model
{
    //
    protected $fillable = array_add()
    public function query(){
        return $this->belongsTo('problem_query');
    }
}
