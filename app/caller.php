<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class caller extends Model
{
    public function display_queries(){
        return $this->hasMany(problem_query::class);
    }
}
