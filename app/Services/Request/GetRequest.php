<?php


namespace App\Services\Request;


use Ixudra\Curl\Facades\Curl;

class GetRequest
{


    public function product_irs($idx)
    {


        switch ($idx)
        {
            case "LPPF":
                $user = "2D256D";
                $id = "PP0002";
                $pass = "2C6734";
                $pin = "B74931";
                break;
            case "NONP":
                $user = "2B3E59";
                $id = "PP0001";
                $pass = "817A21";
                $pin = "9D71J2";
                break;
            case "SSS":
                $user = "90C5E2";
                $id = "PP0008";
                $pass = "7A0DAB";
                $pin = "FEGH56";
                break;
            case "KDF":
                $user = "DEB31C";
                $id = "PP0010";
                $pass = "322074";
                $pin = "0B7329";
                break;
            case "KDU":
                $user = "07B6B0";
                $id = "PP0012";
                $pass = "79AAF7";
                $pin = "BJ6I4F";
                break;
            case "LUTA":
                $user = "4DC28B";
                $id = "PP0006";
                $pass = "D1A6EA";
                $pin = "9H5G23";
                break;
            case "PTN":
                $user = "51C88A";
                $id = "PP0005";
                $pass = "5A2657";
                $pin = "C3D8B6";
                break;
        }

        $data = array('id' => $id, 'user' => $user, 'pass' => $pass, 'pin' => $pin);
        $response = Curl::to('http://112.78.139.26:2222/api/cekhargah2h')
            ->withData($data)
            ->asJsonResponse(TRUE)
            ->get();

        return view('product_irs_v1')->with('response', $response);


    }

}
