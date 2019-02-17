<?php

namespace App\Http\Controllers\Api;

use function GuzzleHttp\Psr7\get_message_body_summary;
use Illuminate\Support\Facades\DB;
use App\problem_query;
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
            ->join('specialists','specialists.specialist_id','=','problem_queries.specialist_id')
            ->select('problem_queries.query_id','problem_queries.status','problem_queries.due_date','specialists.first_name',
                'specialists.last_name','specialists.specialist_status')
            ->get();
        return response()->json($specialists);
        }

    public function operatorStatus(){

        $operators = DB::table('problem_queries')
            ->join('operators','operators.operator_id','=','problem_queries.operator_id')
            ->select('problem_queries.query_id','problem_queries.status','problem_queries.due_date','operators.first_name',
                'operators.last_name','operators.operator_status')
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
        $query = new problem_query();
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
        problem_query::created($request->all());
        return $query;
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
        /*
        //$ShowQuery = problem_query::find($id);
        $displayQuery=DB::table('problem_queries')
            ->join('specialists','specialists.specialist_id','=','problem_queries.specialist_id')
            ->join('operators','operators.operator_id','=','problem_queries.operator_id')
            ->where('problem_queries.query_id','=',$id)
            ->select('problem_queries.query_id','specialists.first_name','specialists.last_name','operators.First_Name',
                'operators.Last_Name','problem_queries.caller_name','problem_queries.system_name','problem_queries.serial_number','problem_queries.title',
                'problem_queries.description','problem_queries.notes','problem_queries.type','problem_queries.priority','problem_queries.created_at','problem_queries.status',
                'problem_queries.updated_at')

            ->get();
        return response()->json($displayQuery);

        $query_specialists =
            DB::table('problem_queries')->where('problem_queries.query_id','=',$id)
                ->join('specialists','specialists.specialist_id', '=', 'problem_queries.specialist_id')
                ->select('problem_queries.query_id','problem_queries.title','problem_queries.description',
                    'specialists.first_name','specialists.last_name')
                ->get();
        $query_operators =
            DB::table('problem_queries') ->where('problem_queries.query_id','=',$id)
                ->join('systems','systems.system_name','=','problem_queries.system_name')
                ->select(
                    'operators.first_name','operators.last_name')
            ->get();
        /*
        $combined =
            $query_specialists
                ->union($query_operators)
                ->get();
        return response()->json($query_specialists);
       */
        $ShowQuery=problem_query::find($id);

        return response()->json($ShowQuery);
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
