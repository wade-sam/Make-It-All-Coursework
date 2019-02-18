<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Caller extends Model
{
    //Each caller may have one or more queries
    public function display_queries(){
        return $this->hasMany(problem_query::class);
    }
}
