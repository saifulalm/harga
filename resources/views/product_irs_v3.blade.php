<!DOCTYPE html>
<html lang="en">

<head>

    <!--Start of Zopim Live Chat Script-->

    <!--End of Zopim Live Chat Script-->

    <meta charset="utf-8" />
    <title>DAFTAR HARGA</title>
    <link rel="icon" type="image/vnd.microsoft.icon" href="{{asset('assets/img/favicon.png')}}">
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="{{asset('assets/img/favicon.png')}}">
    <link rel="shortcut icon" href="images/apple-touch-icon.png">
    <meta name="description" content="overview &amp; stats" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link rel="stylesheet" href="{{asset('assets/css/bootstrap.min.css')}}" />
   <link rel="stylesheet" href="{{asset('assets/css/trxonline.css')}}" />
   <link rel="stylesheet" href="{{asset('assets/css/font-awesome.min.css')}}" />
 <link rel="stylesheet" href="{{asset('assets/css/jquery.gritter.min.css')}}" />
    <link rel="stylesheet" href="{{asset('assets/css/jquery-ui.min.css')}}" />
      <link rel="stylesheet" href="{{asset('assets/css/jquery-ui.min.css')}}" />
     <link rel="stylesheet" href="{{asset('assets/css/select2.css')}}" />
     <link rel="stylesheet" href="{{asset('assets/css/dataTables.tableTools.css')}}" />
     <link rel="stylesheet" href="{{asset('assets/css/progress.css')}}" />
     <link rel="stylesheet" href="{{asset('assets/css/font1.css')}}" />
     <link rel="stylesheet" href="{{asset('assets/css/font2.css')}}" />
     <link rel="stylesheet" href="{{asset('assets/css/datepicker.css')}}" />
     <link rel="stylesheet" href="{{asset('assets/css/ace.min.css')}}" />
     <link rel="stylesheet" href="{{asset('assets/css/ace-responsive.min.css')}}" />
     <link rel="stylesheet" href="{{asset('assets/css/irs.css')}}" />
     <link rel="stylesheet" href="{{asset('assets/stylesheets/irs.css')}}" />
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300" />
    <link href="http://fonts.googleapis.com/css?family=Lato" rel="stylesheet">   


    <style type="text/css">
        #forminq label.error,
        .output {
            color: #FB3A3A;
            font-weight: bold;
        }
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

</head>
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
                            <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab">
                                <li class="active">
                                    <a data-toggle="tab" href="#pulsa">
                                        <i class="green ace-icon fa fa-home bigger-120"></i>
                                        PULSA
                                    </a>
                                </li>
        
                                <li>
                                    <a data-toggle="tab" href="#vgame">
                                        V-GAME
                                        
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#ppob">
                                        PPOB
                                        
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content" style="padding: 5px 3px">
                                <div id="pulsa" class="tab-pane fade in active pulsa-harga">
                                    
                                </div>

                                <div id="vgame" class="tab-pane fade game-harga">
                                    
                                </div>

                                <div id="ppob" class="tab-pane fade ppob-harga">
                                    
                                </div>
        
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

</div>
</div>
<script src=" {{asset('assets/js/jquery-2.0.3.min.js')}}"></script>
<script src=" {{asset('assets/js/jquery.dataTables.min.js')}}"></script>
<script src=" {{asset('assets/js/dataTables.tableTools.js')}}"></script>
<script src=" {{asset('assets/js/jquery.dataTables.bootstrap.js')}}"></script>
<script src=" {{asset('assets/js/select2.min.js')}}"></script>
<script src=" {{asset('assets/js/date-time/bootstrap-datepicker.min.js')}}"></script>
<script src=" {{asset('assets/js/jquery.validate.min.js')}}"></script>
<script src=" {{asset('assets/js/bootstrap.min.js')}}"></script>
<script src=" {{asset('assets/js/ace-elements.min.js')}}"></script>
<script src=" {{asset('assets/js/ace.min.js')}}"></script>
<script src=" {{asset('assets/js/bootbox.min.js')}}"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>


<script>
    if(typeof localStorage.getItem("pulsa") !== "undefined"){
            $.ajax({
                type: "GET",
                cache: true,
                dataType: 'json',
                 url: '/data?id={{$idx}}',
                success: function (data) {
                    localStorage.setItem("pulsa", JSON.stringify(data.pulsa));
                    localStorage.setItem("ppob", JSON.stringify(data.ppob));
                    localStorage.setItem("game", JSON.stringify(data.game));
    
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
                        $(".pulsa-harga").append(html);
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
                        $(".ppob-harga").append(html);
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
                        $(".game-harga").append(html);
                    }
                    
                }
            });
        }else{
            var pulsa =  JSON.parse(localStorage.getItem('pulsa'));
            for (var i = 0; i < pulsa.length; i++) {
                var namaoperator = pulsa[i].namaoperator;
                var rows         =pulsa[i].data;
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
                $(".pulsa-harga").append(html);
            }
    
            var ppob =  JSON.parse(localStorage.getItem('ppob'));
            for (var i = 0; i < ppob.length; i++) {
                var namaoperator = ppob[i].namaoperator;
                var rows         = ppob[i].data;
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
                $(".ppob-harga").append(html);
            }
    
            var game =  JSON.parse(localStorage.getItem('game'));
            for (var i = 0; i < game.length; i++) {
                var namaoperator = game[i].namaoperator;
                var rows         = game[i].data;
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
                $(".game-harga").append(html);
            }
        }
    </script>

    <!-- <script>
    $('.nav-tabs li').click(function () {
        $('.nav-tabs li.active').removeClass('active');
        $(this).addClass('active');
    });
    </script> -->

</body>

</html>

