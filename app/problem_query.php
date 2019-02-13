<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class problem_query extends Model
{
    //only these 3 attributes are able to be filled
    protected $fillable = array('operator_id','specialist_id','caller_name','title', 'description', 'notes', 'type', 'due_date');

    //defining the relationships
    //Each Query has one Operator
    public function operators(){
        return $this->belongsTo(operator::class);

    }
    //Each Query has one Specialists
    public function GetSpecialists(){
        return $this->belongsTo(specialist::class);
    }
    //Each Query has one Caller
    public function caller(){
        return $this->belongsTo(caller::class);
    }
}
