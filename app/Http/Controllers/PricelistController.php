<?php

namespace App\Http\Controllers;


use App\Services\Request\GetRequest;


class PricelistController extends Controller
{
    protected $GetRequest;


    public function __construct(GetRequest $GetRequest)
    {
        $this->GetRequest = $GetRequest;
    }


    public function index()
    {

        $idx = $_GET['id'];
        return $this->GetRequest->product_irs($idx);


    }
}
