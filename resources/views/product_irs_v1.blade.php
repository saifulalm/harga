<!doctype html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('/vendor/fonts/icomoon/style.css')}}">
    <link rel="stylesheet" href="{{asset('/vendor/bootstrap/css/owl.carousel.min.css')}}">
    <link rel="stylesheet" href="{{asset('/vendor/bootstrap/css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('/vendor/bootstrap/css/style.css')}}">
    <title>Price List</title>

</head>
<body>


<div class="content">

    <div class="container">
        <h2 class="mb-5"><center>Price List</center></h2>


        <div class="table-responsive">

            <table class="table table-striped custom-table">
                <thead>
                <tr>

                    <th scope="col">No</th>
                    <th scope="col">Nama Product</th>
                    <th scope="col">Kode Product</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Status</th>

                </tr>
                </thead>
                <tbody>
                @php $i=1 @endphp
                @foreach($response['data'] as $s)
                    <tr scope="row">


                        <td>
                            {{$i++}}
                        </td>
                        <td><a href="#">{{$s['namaproduk']}}</a></td>
                        <td>
                            {{$s['kode']}}

                        </td>
                        <td>{{$s['harga']}}</td>
                        @if($s{'status'} == 1)
                            <td><a href="#" class="Open">Open</a></td>
                        @else
                            <td><a href="#" class="Alert">Close</a></td>

                        @endif


                    </tr>
                @endforeach

                </tbody>
            </table>
        </div>


    </div>

</div>


<script src="{{asset('/vendor/bootstrap/js/jquery-3.3.1.min.js')}}"></script>
<script src="{{asset('/vendor/bootstrap/js/popper.min.js')}}"></script>
<script src="{{asset('/vendor/bootstrap/js/bootstrap.min.js')}}"></script>
<script src="{{asset('/vendor/bootstrap/js/main.js')}}"></script>
</body>
</html>
