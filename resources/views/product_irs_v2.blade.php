

<!DOCTYPE html>
<html lang="EN">
<head>
    <meta charset="utf-8"/>
    <title>Price List</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link href="{{asset('assets/css/bootstrapprice.min.css')}}" rel="stylesheet" id="bootstrap-css">
{{--    {{asset('js/bootstrapprice.min.js')}}--}}
    <link rel="stylesheet" href="{{asset('assets/css/ace.min.css')}}" />
    <link rel="stylesheet" href="{{asset('assets/css/ace-responsive.min.css')}}" />
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
{{--    <script src="{{asset('assets/js/jquery-1.11.1.min.js')}}"></script>--}}
    <script src=" {{asset('assets/js/bootstrapprice.min.js')}}"></script>
    <style>
        table thead tr th {
            width: 230px;
        }
        table thead tr th:first-child {
            width: 160px;
        }
        table thead tr th:last-child {
            width: 70px;
        }
        .table-header {
            height: 40px;
            line-height: 38px!important;
        }
    </style>



    <script>



        $.ajax({
            type: "GET",
            cache: false,
            dataType: 'json',
            url: '/data?id={{$idx}}',
            success: function (data) {
                for (var i = 0; i < data.pulsa.length; i++) {
                    var namaoperator = data.pulsa[i].namaoperator;
                    var rows         = data.pulsa[i].data;
                    var html         = '<div class="table-header" id="big" style="line-height:25px">'+namaoperator+'</div>';
                    html += '<div class="table-responsive">';
                    html += '<table id="tableprodukvgame1" class="table table-striped table-bordered table-hover">';
                    html += '<thead><tr><th style="padding:3px">Kode</th><th style="padding:3px">Produk</th><th style="padding:3px;text-align:center">Harga</th><th style="padding:3px;text-align: center;">Gangguan</th><th style="padding:3px;text-align: center;">Tersedia</th></tr></thead>';
                    for (var j = 0; j < rows.length; j++) {

                        html += '<tbody>';
                        html += '<tr>';
                        html += '<td style="word-wrap: break-word;min-width: 100px;max-width: 200;padding:3px">'+rows[j].kodeproduk+'</td>';
                        html += '<td style="padding:3px">'+rows[j].namaproduk+'</td>';
                        html += '<td style="padding:3px;text-align:right">'+Intl.NumberFormat().format(rows[j].harga)+'</td>';
                        if(rows[j].gangguan=="Ya"){
                            html += '<td style="padding:3px;text-align: center;"><span class="label label-danger">'+rows[j].gangguan+'</span>';
                        }else{
                            html += '<td style="padding:3px;text-align: center;"><span class="label label-success">'+rows[j].gangguan+'</span>';
                        }
                        if(rows[j].kosong=="Ya"){
                            html += '<td style="padding:3px;text-align: center;"><span class="label label-success">'+rows[j].kosong+'</span>';
                        }else{
                            html += '<td style="padding:3px;text-align: center;"><span class="label label-danger">'+rows[j].kosong+'</span>';
                        }
                        html += '</tr>';
                        html += '</tbody>';
                    }
                    html += '</table></div>';
                    $(".pulsa").append(html);
                }

                for (var i = 0; i < data.ppob.length; i++) {
                    var namaoperator = data.ppob[i].namaoperator;
                    var rows         = data.ppob[i].data;
                    var html         = '<div class="table-header" id="big" style="line-height:25px">'+namaoperator+'</div>';
                    html += '<div class="table-responsive">';
                    html += '<table id="tableprodukvgame1" class="table table-striped table-bordered table-hover">';
                    html += '<thead><tr><th style="padding:3px">Kode</th><th style="padding:3px">Produk</th><th style="padding:3px;text-align:center">Harga</th><th style="padding:3px;text-align: center;">Gangguan</th><th style="padding:3px;text-align: center;">Tersedia</th></tr></thead>';
                    for (var j = 0; j < rows.length; j++) {

                        html += '<tbody>';
                        html += '<tr>';
                        html += '<td style="word-wrap: break-word;min-width: 100px;max-width: 200;padding:3px">'+rows[j].kodeproduk+'</td>';
                        html += '<td style="padding:3px">'+rows[j].namaproduk+'</td>';
                        html += '<td style="padding:3px;text-align:right">'+Intl.NumberFormat().format(rows[j].harga)+'</td>';
                        if(rows[j].gangguan=="Ya"){
                            html += '<td style="padding:3px;text-align: center;"><span class="label label-danger">'+rows[j].gangguan+'</span>';
                        }else{
                            html += '<td style="padding:3px;text-align: center;"><span class="label label-success">'+rows[j].gangguan+'</span>';
                        }
                        if(rows[j].kosong=="Ya"){
                            html += '<td style="padding:3px;text-align: center;"><span class="label label-success">'+rows[j].kosong+'</span>';
                        }else{
                            html += '<td style="padding:3px;text-align: center;"><span class="label label-danger">'+rows[j].kosong+'</span>';
                        }
                        html += '</tr>';
                        html += '</tbody>';
                    }
                    html += '</table></div>';
                    $(".ppob").append(html);
                }

                for (var i = 0; i < data.game.length; i++) {
                    var namaoperator = data.game[i].namaoperator;
                    var rows         = data.game[i].data;
                    var html         = '<div class="table-header" id="big" style="line-height:25px">'+namaoperator+'</div>';
                    html += '<div class="table-responsive">';
                    html += '<table id="tableprodukvgame1" class="table table-striped table-bordered table-hover">';
                    html += '<thead><tr><th style="padding:3px">Kode</th><th style="padding:3px">Produk</th><th style="padding:3px;text-align:center">Harga</th><th style="padding:3px;text-align: center;">Gangguan</th><th style="padding:3px;text-align: center;">Tersedia</th></tr></thead>';
                    for (var j = 0; j < rows.length; j++) {

                        html += '<tbody>';
                        html += '<tr>';
                        html += '<td style="word-wrap: break-word;min-width: 100px;max-width: 200;padding:3px">'+rows[j].kodeproduk+'</td>';
                        html += '<td style="padding:3px">'+rows[j].namaproduk+'</td>';
                        html += '<td style="padding:3px;text-align:right">'+Intl.NumberFormat().format(rows[j].harga)+'</td>';
                        if(rows[j].gangguan=="Ya"){
                            html += '<td style="padding:3px;text-align: center;"><span class="label label-danger">'+rows[j].gangguan+'</span>';
                        }else{
                            html += '<td style="padding:3px;text-align: center;"><span class="label label-success">'+rows[j].gangguan+'</span>';
                        }
                        if(rows[j].kosong=="Ya"){
                            html += '<td style="padding:3px;text-align: center;"><span class="label label-success">'+rows[j].kosong+'</span>';
                        }else{
                            html += '<td style="padding:3px;text-align: center;"><span class="label label-danger">'+rows[j].kosong+'</span>';
                        }
                        html += '</tr>';
                        html += '</tbody>';
                    }
                    html += '</table></div>';
                    $(".game").append(html);
                }

            }
        });
    </script>
</head>
<body>
    <div class="page-content">
    <div class="row-fluid">
        <div class="span12">
            <div class="page-header">
                <h1>DAFTAR HARGA</h1>
            </div>
<div class="page-content page-harga">
    <div class="row-fluid">
        <div class="span12">
            <div class="tabbable">
                @if($idx === "t5lhcrGVztKyanHoEuh2UfblHJzPI6Z")
                <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab">
                    <li class="active">
                        <a data-toggle="tab" href="#pulsa">
                            <i class="green ace-icon fa fa-home bigger-120"></i>
                            PULSA
                        </a>
                    </li>

                    <li>
                        <a data-toggle="tab" href="#game">
                            V-GAME

                        </a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#ppob">
                            PPOB

                        </a>
                    </li>
                </ul>
                @endif
                <div class="tab-content" style="padding: 5px 3px">
                    <div id="pulsa" class="tab-pane fade in active pulsa">

                    </div>

                    <div id="game" class="tab-pane fade game">

                    </div>

                    <div id="ppob" class="tab-pane fade ppob">

                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
