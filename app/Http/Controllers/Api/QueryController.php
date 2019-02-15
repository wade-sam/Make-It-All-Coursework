<?php

namespace App\Http\Controllers\Api;

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
        /*
        //$queries = problem_query::all();
        $queries = problem_query::orderBy('due_date','asc')->paginate(10);
        return response()->json($queries);
        */
        $data = DB::table('problem_queries')
            ->join('specialists','specialists.specialist_id','=','problem_queries.specialist_id')
            ->join('operators','operators.operator_id','=','problem_queries.operator_id')
            ->select('problem_queries.query_id','specialists.first_name','specialists.last_name','operators.First_Name',
                'operators.Last_Name','problem_queries.system_name','problem_queries.serial_number','problem_queries.title',
                'problem_queries.description','problem_queries.notes','problem_queries.type','problem_queries.priority','problem_queries.created_at',
                'problem_queries.updated_at')
            ->get();
        return response()->json($data);


    }

    public function QueriesOverview(){
        $queryPriority = DB::table('problem_queries')
            ->select(problem_queries.priority)
            ->get();
        return response()->json($queryPriority);
    }

    public function specialists_status(){
        $specialists = DB::table('problem_queries')
            ->join('specialists','specialists.specialist_id','=','problem_queries.specialist_id')
            ->select('specialists.first_name','specialists.last_name','');
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
        problem_query::created($request->all());
        return (['message' => 'task was succesful']);


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    //This is used to show the individual query. Will be used in the Query.js file
    public function show($id)
    {
        //$ShowQuery = problem_query::find($id);
        $displayQuery=DB::table('problem_queries')
            ->join('specialists','specialists.specialist_id','=','problem_queries.specialist_id')
            ->join('operators','operators.operator_id','=','problem_queries.operator_id')
            ->where('problem_queries.query_id','=',$id)
            ->select('problem_queries.query_id','specialists.first_name','specialists.last_name','operators.First_Name',
                'operators.Last_Name','problem_queries.system_name','problem_queries.serial_number','problem_queries.title',
                'problem_queries.description','problem_queries.notes','problem_queries.type','problem_queries.priority','problem_queries.created_at',
                'problem_queries.updated_at')

            ->get();
        return response()->json($displayQuery);
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
        //
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
