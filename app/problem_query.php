<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class problem_query extends Model
{

    //was changed so that the $id field in the controller was always the query_id
    protected $primaryKey = 'query_id';

    //These columns in the table are allowed to be written to. The query_id is missing as this has to be unique and can't be changed
    protected $fillable = array('operator_name','operator_id','specialist_name','specialist_id','caller_name','title', 'description', 'notes',
        'type','system_name','system_component','software_name','os_name','status','priority','due_date');

    //defining the relationships

    //Each Query has one Caller
    public function caller()
    {
        return $this->belongsTo(caller::class);
    }
    //Each hardware type query has one piece of equipment associated with it
    public function equipment_query_relationship(){
        return $this->hasOne(equipment::class);
    }
    //Each software type query has one piece of software associated with it
    public function software_query_relationship(){
        return $this->hasOne(software_details::class);
    }
    //Each software type query has one OS associated with it
    public function os_query_relationship(){
        return $this->hasOne(operating_system ::class);
    }

    //Each query is is associated to a system
    public function system_query_relationship(){
        return $this->hasOne(system::class);
    }

    //Each query has 2 personel associated with it: Operator and Specialist
    public function personel_query_relationship(){
        return $this->belongsToMany(personel::class);
    }
}
