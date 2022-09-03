<?php


namespace App\Services\Request;


use Ixudra\Curl\Facades\Curl;

class GetRequest
{


    public function product_irs($idx)
    {


        switch ($idx)
        {
//PP CPT//
            case "Ly9Db2hnNWtVQWRiekNZSzBTNlc0Zz09":
                $user = "F8168A";
                $id = "PP0002";
                $pass = "688476";
                $pin = "B74931";
                break;
//PP TESTING//
            case "cnV0YWR2UnRRVWo2U0Rib2pFQkhxUT09":
                $user = "2B3E59";
                $id = "PP0001";
                $pass = "817A21";
                $pin = "9D71J2";
                break;
//PP SSS//
            case "WWJvb3R0eUV6WERtQzJQZzMwakNlZz09":
                $user = "90C5E2";
                $id = "PP0008";
                $pass = "7A0DAB";
                $pin = "FEGH56";
                break;
//PP KDF//
            case "K1d2Zks4ZVRmcFh6ZmxpaUQ3SStIUT09":
                $user = "DEB31C";
                $id = "PP0010";
                $pass = "322074";
                $pin = "0B7329";
                break;
//PP KDU//
            case "NnZGOGo1alRUWC9OMitvdFlHclh0dz09":
                $user = "07B6B0";
                $id = "PP0012";
                $pass = "79AAF7";
                $pin = "BJ6I4F";
                break;
//PP LUTA//
            case "SEY4OHRZRWVSUzN0aWM2b1Jab3RoQT09":
                $user = "4DC28B";
                $id = "PP0006";
                $pass = "D1A6EA";
                $pin = "9H5G23";
                break;
//PP PTN//
            case "MGN3WmxkMm43WUU5ZlZtTHppZDUzZz09":
                $user = "72C30E";
                $id = "PP0005";
                $pass = "E155AD";
                $pin = "C3D8B6";
                break;
//PP NEW AGENT//
            case "0926C443D6D6C9517079DCA49672AA5C":
                $user = "67A3E6";
                $id = "PP0016";
                $pass = "D42C40";
                $pin = "IDJE4H";
                break;
//PP GAMES//
            case "tCEXL61GmZyfHOdrfbyF9b0zOByEw075":
                $user = "031353";
                $id = "PP0017";
                $pass = "E5B0BF";
                $pin = "018D76";
                break;
//PP CAN//
            case "B9WKEYV2QTQ8XDX67S895G5TXVPU54D2":
                $user = "9AF15E";
                $id = "PP0011";
                $pass = "117009";
                $pin = "03CJEH";
                break;
//PP NON_NTB//
            case "PA5TLYL4ADCWTRGRC89VAG6FNWBVXGTU":
                $user = "73329B";
                $id = "PP0009";
                $pass = "631641";
                $pin = "G40F5D";
                break;
//PP MIHARO//
            case "8BCPTH0Q3DQMTEY2O1S4DZB9J09EGGLU":
                $user = "643A40";
                $id = "PP0010";
                $pass = "3E1610";
                $pin = "0B7329";
                break;

//PP KEY//
            case "jXLAK7hNJFFA0bh8ELmgVpqNOuSAV5Sn":
                $user = "32A4D4";
                $id = "PP0014";
                $pass = "FEDDE5";
                $pin = "HA53E0";
                break;
        }

        $data = array('id' => $id, 'user' => $user, 'pass' => $pass, 'pin' => $pin);
        $response = Curl::to('http://112.78.139.26:2222/api/cekhargah2h')
            ->withData($data)
            ->asJsonResponse(TRUE)
            ->get();



        return view('product_irs_v1')->with('response', $response);


    }


    public function get_data($idx)
    {



        return view('product_irs_v2')->with('idx', $idx);


    }
    
    
        public function get_data_dev($idx)
    {



        return view('product_irs_v3')->with('idx', $idx);


    }


    public function data_price($idx)
    {
        switch ($idx)
        {
//PP CPT//
            case "Ly9Db2hnNWtVQWRiekNZSzBTNlc0Zz09":
                $id = "PP0002";
                break;
//PP TESTING//
            case "cnV0YWR2UnRRVWo2U0Rib2pFQkhxUT09":
                $id = "PP0001";
                break;
//PP SSS//
            case "WWJvb3R0eUV6WERtQzJQZzMwakNlZz09":
                $id = "PP0008";
                break;
//PP KDF//
            case "K1d2Zks4ZVRmcFh6ZmxpaUQ3SStIUT09":
                $id = "PP0010";
                break;
//PP KDU//
            case "NnZGOGo1alRUWC9OMitvdFlHclh0dz09":
                $id = "PP0012";
                break;
//PP LUTA//
            case "SEY4OHRZRWVSUzN0aWM2b1Jab3RoQT09":
                $id = "PP0006";
                break;
//PP PTN//
            case "MGN3WmxkMm43WUU5ZlZtTHppZDUzZz09":
                $id = "PP0005";
                break;
//PP NEW AGENT//
            case "0926C443D6D6C9517079DCA49672AA5C":
                $id = "PP0016";
                break;
//PP GAMES//
            case "tCEXL61GmZyfHOdrfbyF9b0zOByEw075":
                $id = "PP0017";
                break;
//PP CAN//
            case "B9WKEYV2QTQ8XDX67S895G5TXVPU54D2":
                $id = "PP0011";
                break;
//PP NON_NTB//
            case "PA5TLYL4ADCWTRGRC89VAG6FNWBVXGTU":
                $id = "PP0009";
                break;
//PP MIHARO//
            case "8BCPTH0Q3DQMTEY2O1S4DZB9J09EGGLU":
                $id = "PP0010";
                break;

//PP KEY//
            case "jXLAK7hNJFFA0bh8ELmgVpqNOuSAV5Sn":
             
                $id = "PP0014";
            
                break;
                
                case "t5lhcrGVztKyanHoEuh2UfblHJzPI6Z":
                $id="NI0638";
                
                break;
                
        }


   
        $response = Curl::to('http://112.78.139.26:2222/api/pricelistdev?id='.$id)
            ->asJsonResponse(TRUE)
            ->get();

 return $response;


    }

}
