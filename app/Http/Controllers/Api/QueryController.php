<?php

namespace App\Http\Controllers\Api;

use function GuzzleHttp\Psr7\get_message_body_summary;
use Illuminate\Support\Facades\DB;
use App\problem_query;
use App\system;
use function GuzzleHttp\Promise\all;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class QueryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    //This is used to list the queries on the Queries page
    public function index()
    {
        problem_query::all();
        $queries = problem_query::all();
        return response()->json($queries);

    }

    public function queriesOverview(){
        $queryPriority = DB::table('problem_queries')
            ->select('problem_queries.query_id','problem_queries.priority')
            ->get();
        return response()->json($queryPriority);
    }

    public function specialistsStatus(){

        $specialists = DB::table('problem_queries')
            ->join('personel','personel.name','=','problem_queries.specialist_name')
            ->select('problem_queries.query_id','problem_queries.status','problem_queries.due_date','personel.name',
                'personel.tel_number','personel.email','personel.personel_status')
            ->get();
        return response()->json($specialists);
        }

    public function operatorStatus(){

        $operators = DB::table('problem_queries')
            ->join('personel','personel.name','=','problem_queries.operator_name')
            ->select('problem_queries.query_id','problem_queries.status','problem_queries.due_date','personel.name',
                'personel.tel_number','personel.personel_status')
            ->get();
        return response()->json($operators);
    }



    public function assetsHardware(){
        $hardware = DB::table('equipment')
            ->select('equipment.type','equipment.make', 'equipment.serial_number')
            ->get();
        return response()->json($hardware);
        }

        public function assetsSoftware(){
        $software = DB::table('software_details')
            ->select('software_details.software_name','software_details.software_licence')
            ->get();

        return response()->json($software);
        }

        public function assetsOS(){
        $os = DB::table('operating_systems')
            ->select('operating_systems.os_name')
            ->get();
            return response()->json($os);
        }



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //$query = problem_query::created($request->all());
        $query = new \App\problem_query;
       // $decode = json_decode($request,true);
        /*
        $query ->title = $request->get('title');
        $query ->description = $request->get('desc');
        $query ->notes = $request->get('notes');
        $query ->type = $request->get('type');
        $query ->priority = $request->get('priority');
        $query ->system_component = $request->get('hardware');
        $query ->software_name = $request->get('software');
        $query ->os_name = $request->get('OS');
        $query->operator_name = $request->get('operator');
        $query-> specialist_name = $request->get('specialist');
        $query ->caller_name = $request->get('caller');

        */
        $query->title = $request->input('title');
        $query->description = $request->input('desc');
        $query->notes = $request ->input('notes');
        $query->type = 'Hardware';//$request ->input('type');
        $query->priority = $request ->input('priority');
        $query->system_component = $request->input('hardware');
        $query->system_name = 'PC-01';
        $query->software_name = $request->input('software');
        $query->os_name = $request->input('OS');
        $query->operator_name = $request->input('operator');
        $query->specialist_name = $request->input('specialist');
        $query->caller_name = 'sam';
        $query->due_date = '2019/03/04';
        $query->status = 'open';
        $query->save();

        return 'hello';
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    //This is used to show the individual query. Will be used in the ExpandedQuery.js file
    public function show($id)
    {
        $ShowQuery=problem_query::find($id);

        return response()->json($ShowQuery);
    }

    public function showOperatorsQuery(){
        $operator = DB::table('personel')->where('type','Operator')->get();
        return response()->json($operator);
    }

    public function showSpecialistsQuery(){
        $specialist = DB::table('personel')->where('type','Specialist')->get();
        return  response()->json($specialist);
    }

    public function showSystemQuery(){
        $system = DB::table('workstations')->select('system_name')->get();
        return response()->json($system);
    }

    public function showEquipmentQuery($id){
        $equipment = DB::table('systems')
            ->join('equipment','equipment.serial_number',
                '=','systems.equipment_serial_number')
            ->select('equipment.serial_number','equipment.type','equipment.make')
            ->where('systems.system_name','=',$id)
            ->get();
        return response()->json($equipment);
    }

    public function showOSQuery($id){
        $OS = DB::table('systems')
            ->select('operating_system_name')
            ->where('systems.system_name', '=',$id)
            ->first();
        return response()->json($OS);
    }

    public function showSoftware($id){
        $software = DB::table('systems')
            ->select('software_name')
            ->where('systems.system_name','=',$id)
            ->get();
        return response()->json($software);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $ShowQuery = problem_query::find($id);
        return response()->json($ShowQuery);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate(request(),[
           'title'=> 'required',
            'desc'=>'required',
            'notes'=>'required',
            'type'=>'required',
            'priority'=>'required',
            'hardware'=>'required',
            'operator'=>'required',
            'specialist'=>'required',
            'due'=>'required',
            'caller'=>'required',
            'system'=>'required',

        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
