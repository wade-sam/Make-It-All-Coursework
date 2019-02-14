<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class problem_query extends Model
{

    protected $primaryKey = 'query_id';
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

    public function caller()
    {
        return $this->belongsTo(caller::class);
    }

    public function equipment_query_relationship(){
        return $this->hasOne(equipment::class);
    }

    public function software_query_relationship(){
        return $this->hasOne(software_details::class);
    }

    public function os_query_relationship(){
        return $this->hasOne(operating_system::class);
    }
}
