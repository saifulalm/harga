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

    public function data_price(){
        $idx = $_GET['id'];
        return $this->GetRequest->data_price($idx);
    }


    public function get_data()
    {
        $idx = $_GET['id'];
        return $this->GetRequest->get_data($idx);


    }

    public function get_data_dev()
    {
        $idx = $_GET['id'];
        return $this->GetRequest->get_data_dev($idx);


    }
}
