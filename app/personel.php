<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class personel extends Model
{
    protected $table = 'personel';
    public $timestamps = false;
    //There are many personnel associated to may=ny queries
    public function personelQueryRelationship(){
        return $this->hasMany(problem_query::class);
    }
}
