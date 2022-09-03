

var urlx = 'http://localhost:8080/';

$(function () {

    $('#formlistdownline').submit(function (event) {
        event.preventDefault();
    });

    $('#tiketform').submit(function (event) {
        event.preventDefault();
    });

    $('#filternamadownline').keypress(function (e) {
        if (e.which == 13) {
            $('#viewdownline').click();
        }
    });

    var ketemu = false;
    $('#preloader').fadeOut(1000, function () {

        $('#preloader').remove();

    });


    $("#tabledaftarharga").dataTable({

        "bDestroy": true,
        "aLengthMenu": [
            [-1],
            ["All"]
        ],
        "iDisplayLength": -1,
        "bJQueryUI": false,
        "bDestroy": true,
        "bFilter": false,
        dom: 'CT<"clear">lfrtip'
    });





    $('#btngantipassword').click(function () {

        var params = {
            passwordsekarang: $('#passwordsekarang').val(),
            passwordbaru1: $('#passwordbaru1').val(),
            passwordbaru2: $('#passwordbaru2').val()
        };

        $.ajax({
            type: "POST",
            data: params,
            dataType: 'json',
            url: 'api/gantipassword',
            success: function (res) {

                if (res.success) {
                    alert(res.msg);
                    window.location = "/webportal/login/dologout";
                } else {

                    alert(res.msg);
                }

            }
        });

    });


    $('#verifikasiotp').click(function () {
        //$('#hasilotp').html('loading......'); 
        $('#verifikasiotp').attr('disabled', 'disabled');

        var params = {
            otp: $('#otp').val()
        };

        $.ajax({
            type: "POST",
            data: params,
            url: 'api/getotp',
            success: function (res1) {
                //$('#hasilotp').html(res1);
                $('#verifikasiotp').removeAttr('disabled')

                if (res1 == '1') {

                    document.location = 'home';
                }
                else {

                    alert(res1);
                }


            }
        })

    });


    $('#prosesregonline').click(function () {
        if (!$("#form-validate").valid()) return false;

        $('#prosesregonline').attr('disabled', 'disabled');

        var params = {
            namareg: $('#namareg').val(),
            alamatreg: $('#alamatreg').val(),
            hpreg: $('#hpreg').val(),
            idupline: $('#idupline').val(),
            up: $('#up').val()
        };

        $.ajax({
            type: "POST",
            data: params,
            url: 'regonline',
            success: function (res1) {

                $('#prosesregonline').removeAttr('disabled');

                if (res1 == '1') {

                    alert(res1);
                }
                else {

                    alert(res1);
                }
                $('#namareg').val('');
                $('#alamatreg').val('');
                $('#hpreg').val('');
                $('#idupline').val('');
                $('#up').val('');

            }
        })

    });

    $('#nohp').keypress(function (e) {
        if (e.which == 13) {
            return false;
        }

    });

    $('#nohp').keypress(function (e) {
        var panjang = $(this).val().length;
        if ($(this).val() == '') {
            ketemu = false;
            $('#listgame').html('');
            $('#divLoading').html('');

        }
        if (e.which > 31 && (e.which < 48 || e.which > 57)) {
            return false;
        }

        $('#divLoading').html('<img src="assets/css/images/loading2.gif" />');



        if ($(this).val().length > 7) {

            if (panjang < 10) {
                ketemu = false;
            }
            if (ketemu == false) {

                var params = {
                    nohp: $('#nohp').val()
                };

                $.ajax({
                    type: "POST",
                    data: params,
                    cache: false,
                    url: 'api/gethargapulsatrx',
                    success: function (res) {
                        if (panjang > 11) {
                            ketemu = true;
                        }
                        $('#divLoading').html('');
                        $('#listgame').html(res).fadeIn(500);
                    }
                })
            }

        }
        else {
            ketemu = false;
            $('#listgame').html('');
            $('#divLoading').html('');
        }



    });

    $('#viewtambahdeposit').click(function () {

        $.fn.dataTable.ext.errMode = 'none';

        $('#tableviewdeposit').on('error.dt', function (e, settings, techNote, message) {
            window.location = "/login/";
        }).dataTable({
            "aLengthMenu": [
                [10, 20, 50, 100, 200, -1],
                [10, 20, 50, 100, 200, "All"]
            ],
            "bProcessing": true,
            "bJQueryUI": false,
            "bSortClasses": false,
            "bDestroy": true,
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": "api/viewtambahdeposit",
            "columnDefs": [
                { "visible": false, "targets": 2 }
            ],
            "aoColumns": [
                { "bSortable": false, "sWidth": "10px" },
                { "bSortable": false, "sWidth": "50px" },
                { "bSortable": false, "sWidth": "125px" },
                { "bSortable": false, "sWidth": "10px" },
                { "bSortable": false, "sWidth": "50px" }
            ],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "tanggal1", "value": $('#tanggal1').val() });
                aoData.push({ "name": "tanggal2", "value": $('#tanggal2').val() });
            },
            dom: "T<'clear'>lfrtip",
            "oTableTools": {
                "sSwfPath": "http://qpay.mine.nu/webtopup/assets/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    "xls",
                    "pdf",
                    "copy",
                    "print"
                ]
            },

            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(2)', nRow).html("<span style='float:right'>" + todesimal(aData[3]) + "</span>");

                if (aData[4] == 'BON') {
                    $('td:eq(3)', nRow).html("<span style='color:red;'>" + aData[4] + "</span>");
                } else {
                    $('td:eq(3)', nRow).html("<span style='color:green;'>" + aData[4] + "</span>");
                }

            },
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api(), data;
                counttrx = api
                    .column(3, { page: 'current' })
                    .data()
                    .reduce(function (a, b) {
                        return parseInt(a) + parseInt(b);
                    }, 0);
                $(api.column(3).footer()).html("<span style='float:right'>" + todesimal(counttrx) + "</span>");
            },
            "drawCallback": function (settings) {

            }
        });

    });

    $('#viewlaptrxperproduk').click(function () {

        $('#hasillapperproduk').hide();
        $('#divloading').show();
        $.fn.dataTable.ext.errMode = 'none';
        $('#tablelapperproduk').on('error.dt', function (e, settings, techNote, message) {
            window.location = "/login/";
        }).dataTable({
            "aLengthMenu": [
                [10, 20, 50, 100, 200, -1],
                [10, 20, 50, 100, 200, "All"]
            ],
            "bProcessing": true,
            "bJQueryUI": false,
            "bSortClasses": false,
            "bDestroy": true,
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": "api/rakapperproduk",
            "columnDefs": [
                { "visible": false, "targets": 2 }
            ],
            "aoColumns": [
                { "bSortable": false, "sWidth": "10px" },
                { "bSortable": false, "sWidth": "50px" },
                { "bSortable": false, "sWidth": "125px" },
                { "bSortable": false, "sWidth": "10px" },
                { "bSortable": false, "sWidth": "50px" }
            ],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "tanggal1", "value": $('#tanggal1').val() });
                aoData.push({ "name": "tanggal2", "value": $('#tanggal2').val() });
            },
            dom: "T<'clear'>lfrtip",
            "oTableTools": {
                "sSwfPath": "http://qpay.mine.nu/webtopup/assets/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    "xls",
                    "pdf",
                    "copy",
                    "print"
                ]
            },

            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(2)', nRow).html("<span style='float:right'>" + todesimal(aData[3]) + "</span>");
                $('td:eq(3)', nRow).html("<span style='float:right'>" + todesimal(aData[4]) + "</span>");
            },
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api(), data;
                total = api
                    .column(3)
                    .data()
                    .reduce(function (a, b) {
                        return parseInt(a) + parseInt(b);
                    }, 0);
                counttrx = api
                    .column(3, { page: 'current' })
                    .data()
                    .reduce(function (a, b) {
                        return parseInt(a) + parseInt(b);
                    }, 0);
                pageTotal = api
                    .column(4, { page: 'current' })
                    .data()
                    .reduce(function (a, b) {
                        return parseInt(a) + parseInt(b);
                    }, 0);

                $(api.column(3).footer()).html("<span style='float:right'>" + todesimal(counttrx) + "</span>");

                $(api.column(4).footer()).html("<span style='float:right'>" + todesimal(pageTotal) + "</span>");
            },
            "drawCallback": function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var last = null;

                api.column(2, { page: 'current' }).data().each(function (group, i) {
                    if (last !== group) {
                        $(rows).eq(i).before(
                            '<tr class="grouptable"><td colspan="5">' + group + '</td></tr>'
                        );
                        last = group;
                    }
                });
            }
        });
        $('#divloading').hide();
    });

    $('#refreshtrxpulsa').click(function () {

        var params = {
            tanggal: $('#tanggal').val()
        };

        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: 'api/getdatatrx',
            success: function (res) {
                $('#hasillapperproduk').html(res),
                    //	 $('#divloadingx').hide()
                    $('#hasillapperproduk').show();
            }
        })
    });

    $('#getinv').click(function () {


        //$('#divloading').show();
        //window.location = 'api/getinv/?tanggal=' + $('#tanggal').val();
        //$('#divloading').hide();

        $('#divloading').show();
        axios({
            url: 'api/invtrx?tanggal1=' + $('#tanggal1').val() + '&tanggal2=' + $('#tanggal2').val(),
            method: 'GET',
            responseType: 'blob', // important
            headers: { 'Accept': 'application/pdf', Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'inv.pdf');
            document.body.appendChild(link);
            link.click();
        });
        $('#divloading').hide();
    });

    $('#laptrx_excel').click(function () {
        $('#divloading').show();
        axios({
            url: 'api/exportlapperperoduk?tanggal1=' + $('#tanggal1').val() + '&tanggal2=' + $('#tanggal2').val(),
            method: 'GET',
            responseType: 'blob', // important
            headers: { 'Accept': 'application/vnd.ms-excel', Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'lap.xlsx');
            document.body.appendChild(link);
            link.click();
        });

        $('#divloading').hide();
    });

    $('#rekaptrx1').click(function () {

        $('#divloading').show();
        axios({
            url: 'api/exportdetailtrx?tanggal1=' + $('#tanggal1').val() + '&tanggal2=' + $('#tanggal2').val(),
            method: 'GET',
            responseType: 'blob', // important
            headers: { 'Accept': 'application/vnd.ms-excel', Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'DetailTrx.xlsx');
            document.body.appendChild(link);
            link.click();
        });

        $('#divloading').hide();

        /*
        $('#divloading').show();
        window.location = 'exportdata/rekaptrx/?tanggal=' + $('#tanggal').val();
        $('#divloading').hide();
        */
    });

    $("#tableprodukpulsa,#tableprodukppob,#tableprodukvgame,#tableprodukvfisik").dataTable({

        "bDestroy": true,
        "aLengthMenu": [
            [10, 25, 50, 75, -1],
            [10, 25, 50, 75, "All"]
        ],
        "iDisplayLength": 10,
        dom: 'CT<"clear">lfrtip',
        "oTableTools": {
            "sSwfPath": "",
            "aButtons": ["xls", "print", "pdf", "csv"]
        }
    });



    $("#tabletrx,#tablemutasideposit,#tablelisttrf,#tableinbox,#tableoutbox,#tablekomisi,#tablelapperproduk,#tableviewdeposit,#listdownline,#tablestokunit").dataTable({
        "aLengthMenu": [
            [10, 20, 50, 100, 500, 1000],
            [10, 20, 50, 100, 500, 1000]
        ],
        "bDestroy": true,
        "bFilter": false,
        dom: 'CT<"clear">lfrtip',
        "oTableTools": {
            "sSwfPath": "http://qpay.mine.nu/webtopup/assets/swf/copy_csv_xls_pdf.swf",
            "aButtons": ["xls", "print", "pdf", "csv"]
        }
    });

    $('#viewdownline').click(function () {

        $('#listdownline').dataTable({
            "bJQueryUI": false,
            "aLengthMenu": [
                [10, 25, 50, 75, -1],
                [10, 25, 50, 75, "All"]
            ],
            "bSortClasses": false,
            "bProcessing": true,
            "bDestroy": true,
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": "api/listdownline",
            "aoColumns": [
                { "bSortable": false, "sWidth": "10px" },
                { "bSortable": false, "sWidth": "50px" },
                { "bSortable": false, "sWidth": "30px" },
                { "bSortable": false, "sWidth": "50px" },
                { "bSortable": false, "sWidth": "50px" },
                { "bSortable": true, "sWidth": "30px" },
                { "bSortable": true, "sWidth": "30px" },
            ],
            dom: "T<'clear'>lfrtip",
            "oTableTools": {
                "sSwfPath": "http://qpay.mine.nu/webtopup/assets/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    "xls",
                    "pdf",
                    "copy",
                    "print"
                ]
            },
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "nama", "value": $('#filternamadownline').val() });
                aoData.push({ "name": "aktif", "value": $('#filterstatus').val() });
            },
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                if (aData[5] == '0') {
                    $('td:eq(0)', nRow).html("<s>" + aData[0] + "</s>");
                    $('td:eq(1)', nRow).html("<s>" + aData[1] + "</s>");
                    $('td:eq(2)', nRow).html("<s>" + aData[2] + "</s>");
                    $('td:eq(3)', nRow).html("<s>" + aData[3] + "</s>");
                    $('td:eq(4)', nRow).html("<s>" + aData[4] + "</s>");
                    $('td:eq(5)', nRow).html("<s>" + aData[5] + "</s>");
                    $('td:eq(6)', nRow).html("<span class='label label-danger'>Non-Aktif</span>");
                }
                else {
                    $('td:eq(6)', nRow).html("<span class='label label-success'>Aktif</span>");
                }


            }
        });
    });


    $('#viewdetailkomisi').click(function () {

        $.ajax({
            type: "POST",
            cache: false,
            dataType: "json",
            url: 'api/totalkomisi',
            success: function (res) {
                $('#totakomisi').html(res.komisi);
            }
        });

        $('#tablekomisi').dataTable({
            "bJQueryUI": false,
            "bSortClasses": false,
            "bProcessing": true,
            "bDestroy": true,
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": "api/getdetailkomisi",
            "aoColumns": [
                { "bSortable": false, "sWidth": "10px" },
                { "bSortable": false, "sWidth": "50px" },
                { "bSortable": false, "sWidth": "30px" },
                { "bSortable": false, "sWidth": "50px" }

            ],
            dom: "T<'clear'>lfrtip",
            "oTableTools": {
                "sSwfPath": "http://qpay.mine.nu/webtopup/assets/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    "xls",
                    "pdf",
                    "copy",
                    "print"
                ]
            },
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "tanggal1", "value": $('#tanggal1').val() });
                aoData.push({ "name": "tanggal2", "value": $('#tanggal2').val() });
            }
        });
    });



    $('#viewoutbox').click(function () {
        if (!$("#form-validate").valid()) return false;
        $('#tableoutbox').dataTable({
            "bJQueryUI": false,
            "bSortClasses": false,
            "bProcessing": true,
            "bDestroy": true,
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": "api/getlistoutbox",
            "aoColumns": [
                { "bSortable": true, "sWidth": "10px" },
                { "bSortable": false, "sWidth": "50px" },
                { "bSortable": false, "sWidth": "30px" },
                { "bSortable": false, "sWidth": "30px" },
                { "bSortable": false, "sWidth": "50px" },
                { "bSortable": false, "sWidth": "200px" }

            ],
            dom: "T<'clear'>lfrtip",
            "oTableTools": {
                "sSwfPath": "http://qpay.mine.nu/webtopup/assets/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    "xls",
                    "pdf",
                    "copy",
                    "print"
                ]
            },
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "tanggal1", "value": $('#tanggal1').val() });
                aoData.push({ "name": "tanggal2", "value": $('#tanggal2').val() });
                aoData.push({ "name": "idrs", "value": $('#idreseller').val() });
                aoData.push({ "name": "isi", "value": $('#isipesan').val() });
            }
        });
    });

    $('#viewinbox').click(function () {



        if (!$("#form-validate").valid()) return false;

        $.fn.dataTable.ext.errMode = 'none';

        $('#tableinbox').on('error.dt', function (e, settings, techNote, message) {
            window.location = "/webtopup/";
        }).dataTable({
            "bJQueryUI": true,
            "bSortClasses": false,
            "bProcessing": true,
            "bDestroy": true,
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": "api/getlistinbox",
            "aoColumns": [
                { "bSortable": true, "sWidth": "10px" },
                { "bSortable": false, "sWidth": "70px" },
                { "bSortable": false, "sWidth": "100px" },
                { "bSortable": false, "sWidth": "30px" },
                {
                    "sType": "currency",
                    "bSortable": false,
                    "sWidth": "50px",
                    "sclass": "right"
                }

            ],
            dom: "T<'clear'>lfrtip",
            "oTableTools": {
                "sSwfPath": "http://qpay.mine.nu/webtopup/assets/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    "xls",
                    "pdf",
                    "copy",
                    "print"
                ]
            },
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "tanggal1", "value": $('#tanggal1').val() });
                aoData.push({ "name": "tanggal2", "value": $('#tanggal2').val() });
                aoData.push({ "name": "idrs", "value": $('#idreseller').val() });
                aoData.push({ "name": "isi", "value": $('#isipesan').val() });
            }
        });
    });


    $('#viewlisttrf').click(function (e) {

        if (!$("#form-validate").valid()) return false;
        $.fn.dataTable.ext.errMode = 'none';
        $('#tablelisttrf').on('error.dt', function (e, settings, techNote, message) {
            //window.location = "/webtopup/";
        }).dataTable({
            "bJQueryUI": false,
            "bSortClasses": false,
            "bProcessing": true,
            "bDestroy": true,
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": "api/getlisttransfer",
            "aoColumns": [
                { "bSortable": false, "sWidth": "10px" },
                { "bSortable": false, "sWidth": "20px" },
                { "bSortable": false, "sWidth": "100px" },
                {
                    "sType": "currency",
                    "bSortable": false,
                    "sWidth": "50px",
                    "sclass": "right"
                }

            ],
            dom: "T<'clear'>lfrtip",
            "oTableTools": {
                "sSwfPath": "http://qpay.mine.nu/webtopup/assets/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    "xls",
                    "pdf",
                    "copy",
                    "print"
                ]
            },
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "tanggal1", "value": $('#tanggal1').val() });
                aoData.push({ "name": "tanggal2", "value": $('#tanggal2').val() });
                aoData.push({ "name": "idrs", "value": $('#idreseller').val() });
            },
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                $('td:eq(3)', nRow).html("<span style='float:right'>" + todesimal(aData[3]) + "</span>");

            },
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api(), data;
                total = api
                    .column(3)
                    .data()
                    .reduce(function (a, b) {
                        return parseInt(a) + parseInt(b);
                    }, 0);

                pageTotal = api
                    .column(3, { page: 'current' })
                    .data()
                    .reduce(function (a, b) {
                        return parseInt(a) + parseInt(b);
                    }, 0);

                $(api.column(3).footer()).html("<span style='float:right'>" + todesimal(pageTotal) + "</span>");
            }
        });




    });

    $('#viewmutasideposit').click(function (e) {
        if (!$("#form-validate").valid()) return false;
        $('#tablemutasideposit').dataTable({
            "bProcessing": true,
            "bJQueryUI": false,
            "bSortClasses": false,
            "bDestroy": true,
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": "api/getmutasideposit",
            "aoColumns": [
                { "bSortable": false, "sWidth": "10px" },
                { "bSortable": false, "sWidth": "70px" },
                { "bSortable": false, "sWidth": "300px" },
                { "bSortable": false, "sWidth": "30px" },
                {
                    "sType": "currency",
                    "bSortable": false,
                    "sWidth": "50px",
                    "sclass": "right"
                }

            ],
            dom: "T<'clear'>lfrtip",
            "oTableTools": {
                "sSwfPath": "http://qpay.mine.nu/webtopup/assets/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    "xls",
                    "pdf",
                    "copy",
                    "print"
                ]
            },
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "tanggal1", "value": $('#tanggal1').val() });
                aoData.push({ "name": "tanggal2", "value": $('#tanggal2').val() });
                aoData.push({ "name": "idrs", "value": $('#idrs').val() });
            },
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                if (aData[3] < 0) {
                    $('td:eq(3)', nRow).html("<span class='label label-warning arrowed arrowed-in-right'>" + aData[3] + "</span>");
                    $('td:eq(4)', nRow).html("<span style='float:right'>" + aData[4] + "</span>");
                }
                else {
                    $('td:eq(3)', nRow).html("<span class='label label-success arrowed-right arrowed-in'>" + aData[3] + "</span>");
                    $('td:eq(4)', nRow).html("<span style='float:right'>" + aData[4] + "</span>");
                }
            }
        });




    });
    $('#viewlaptrx').click(function (e) {

        $.fn.dataTable.ext.errMode = 'none';

        $('#tabletrx').on('error.dt', function (e, settings, techNote, message) {
            window.location = "/login/";
        }).dataTable({
            "aLengthMenu": [
                [10, 20, 50, 100, 200, 500, 1000],
                [10, 20, 50, 100, 200, 500, 1000]
            ],
            "bProcessing": true,
            "bJQueryUI": false,
            "bSortClasses": false,
            "bDestroy": true,
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": "api/getlaptrx",
            "aoColumns": [
                { "bSortable": false, "sWidth": "40px" },
                { "bSortable": false, "sWidth": "50px" },
                { "bSortable": false, "sWidth": "125px" },
                { "bSortable": false, "sWidth": "50px" },
                { "bSortable": false, "sWidth": "100px" },
                { "bSortable": false, "sWidth": "65px" },
                { "bSortable": false, "sWidth": "65px" },
                { "bSortable": false, "sWidth": "165px" },
                { "bSortable": false, "sWidth": "65px" },
            ],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "tujuan", "value": $('#tujuan').val() });
                aoData.push({ "name": "tanggal", "value": $('#id-date-picker-1').val() });
                aoData.push({ "name": "idrs", "value": $('#IdReseller').val() });
                aoData.push({ "name": "idtrxmitra", "value": $('#idtrxmitra').val() });
            },
            dom: "T<'clear'>lfrtip",
            "oTableTools": {
                "sSwfPath": "http://qpay.mine.nu/webtopup/assets/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    "xls",
                    "pdf",
                    "copy",
                    "print"
                ]
            },

            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                if (aData[6] == "1") {
                    //$('td:eq(0)', nRow).addClass( "btn-success" );
                    $('td:eq(6)', nRow).html("<span class='label label-success'>SUKSES</span>");
                }
                else if (aData[6] == "2") {
                    // $('td:eq(0)', nRow).addClass( "btn-danger" );
                    $('td:eq(6)', nRow).html("<span class='label label-danger'>GAGAL</span>");
                }
                else {

                    //$('td:eq(0)', nRow).addClass( "btn-warning" );
                    $('td:eq(6)', nRow).html("<span class='label label-warning'>PROSES</span>");


                }

                $('td:eq(5)', nRow).html("<span style='float:right'>" + aData[5] + "</span>");
            }
        });




    });


    $('#viewstokunit').click(function (e) {

        $.fn.dataTable.ext.errMode = 'none';

        $('#tablestokunit').on('error.dt', function (e, settings, techNote, message) {
            window.location = "/login/";
        }).dataTable({
            "aLengthMenu": [
                [10, 20, 50, 100, 200, 500, 1000],
                [10, 20, 50, 100, 200, 500, 1000]
            ],
            "bProcessing": true,
            "bJQueryUI": false,
            "bSortClasses": false,
            "bDestroy": true,
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": "api/getstokunit",
            "aoColumns": [
                { "bSortable": false, "sWidth": "40px" },
                { "bSortable": false, "sWidth": "50px" },
                { "bSortable": false, "sWidth": "125px" },
                { "bSortable": false, "sWidth": "50px" },
            ],
            // "fnServerParams": function (aoData) {
            //     aoData.push({ "name": "tujuan", "value": $('#tujuan').val() });
            //     aoData.push({ "name": "tanggal", "value": $('#id-date-picker-1').val() });
            //     aoData.push({ "name": "idrs", "value": $('#IdReseller').val() });
            //     aoData.push({ "name": "idtrxmitra", "value": $('#idtrxmitra').val() });
            // },
            // dom: "T<'clear'>lfrtip",
            // "oTableTools": {
            //     "sSwfPath": "http://qpay.mine.nu/webtopup/assets/swf/copy_csv_xls_pdf.swf",
            //     "aButtons": [
            //         "xls",
            //         "pdf",
            //         "copy",
            //         "print"
            //     ]
            // },

            // "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            //     if (aData[6] == "1") {
            //         //$('td:eq(0)', nRow).addClass( "btn-success" );
            //         $('td:eq(6)', nRow).html("<span class='label label-success'>SUKSES</span>");
            //     }
            //     else if (aData[6] == "2") {
            //         // $('td:eq(0)', nRow).addClass( "btn-danger" );
            //         $('td:eq(6)', nRow).html("<span class='label label-danger'>GAGAL</span>");
            //     }
            //     else {

            //         //$('td:eq(0)', nRow).addClass( "btn-warning" );
            //         $('td:eq(6)', nRow).html("<span class='label label-warning'>PROSES</span>");


            //     }

            //     $('td:eq(5)', nRow).html("<span style='float:right'>" + aData[5] + "</span>");
            // }
        });




    });

    $('#kirimtiket').click(function () {

        $('#kirimtiket').hide();
        $('#tiketform').hide();
        $('#divloadingtiket').html('Loading....');
        var params = {
            jumlah: $('#saldo').val()
        };

        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            dataType: 'json',
            url: 'api/tiketdeposit',
            success: function (res) {
                console.log(res);
                $('#hasiltiket').html(res.msg);
                $('#divloadingtiket').hide();
            }
        })



        // var res="tiket sukses";
        // $('#hasiltiket').html(res);
    });

    $('#bukatiket').click(function () {
        $('#hasiltiket').html('');
        $('#tiketform').show();
        $('#kirimtiket').show();
        $('#saldo').val('');
        $('#divloading').html('');
        $('#divloading').show()


    });











    $('#executeregrs').click(function () {
        if (!$("#form-validate").valid()) return false;
        $(this).html('<img src="http://www.bba-reman.com/images/fbloader.gif" />');
        $('#dvLoading').show();
        // $('#executeregrs').hide();

        var params = {
            idareadomisili: $('#selectkota').val(),
            namadownline: $('#namadownline').val(),
            alamat: $('#alamat').val(),
            hpdownline: $('#hpdownline').val(),
            selisih: $('#selisih').val(),
        };
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: 'api/regrs',
            success: function (res) {

                bootbox.dialog(res, [{
                    "label": "OK",
                    "class": "btn-small btn-primary",
                }])

                $('#hasilreg').html(res),
                    $('#hasilreg').show(),
                    $('#executeregrs').show(),
                    $('#namadownline').val(''),
                    $('#alamat').val(''),
                    $('#hpdownline').val(''),
                    $('#KodePengaman').val(''),
                    $('#selectkota').select2('data', null)
                $('#dvLoading').hide();


            },
            error: function (e) {

                alert('error bos');
            }
        })
    });


    $('#selectoperator').select2({
        allowClear: true,
        ajax: {
            url: "api/dtoperator",
            dataType: 'json',
            quietMillis: 100,
            multiple: true,
            data: function (term, page) {
                return {
                    term: term,
                    page_limit: 20,
                    page: page
                }
            },
            results: function (data, page) {
                var myResults = [];
                var more = (page * 20) < data.total;
                $.each(data.idoperator, function (index, item) {
                    myResults.push({
                        id: item.idoperator,
                        text: item.namaoperator
                    })
                });
                return {
                    results: myResults,
                    more: more
                };

            }
        }
    });
    $('#selectproduk').select2({
        allowClear: true,
        ajax: {
            url: "api/dtprodukpulsa",
            dataType: 'json',
            quietMillis: 100,
            multiple: true,
            data: function (term, page) {
                return {
                    term: $('#selectoperator').val(),
                    page_limit: 20,
                    page: page
                }
            },
            results: function (data, page) {
                var myResults = [];
                var more = (page * 20) < data.total;
                $.each(data.idproduk, function (index, item) {
                    myResults.push({
                        id: item.idproduk,
                        text: item.namaproduk
                    })
                });
                return {
                    results: myResults,
                    more: more
                };

            },
            params: {
                error: function (response) {
                    window.location = "/webtopup/";
                }
            }
        }
    });

    $('#selectkota').select2({
        allowClear: true,
        ajax: {
            url: "api/dtkota",
            dataType: 'json',
            quietMillis: 100,
            multiple: true,
            data: function (term, page) {
                return {
                    term: term,
                    page_limit: 20,
                    page: page
                }
            },
            results: function (data, page) {
                var myResults = [];
                var more = (page * 20) < data.total;
                $.each(data.idcluster, function (index, item) {
                    myResults.push({
                        id: item.idcluster,
                        text: item.namacluster
                    })
                });
                return {
                    results: myResults,
                    more: more
                };

            }
        }
    });

    $("#select1,#NamaOperator,#Produk,#PengisianKe,#LaporanDikirimKe").select2();
    $("#select2").select2();
    $("#select3").select2();
    $("#select4").select2();
    $("#submasal").select2();
    $("#submtujuan").select2();

    $('#selectdownlinetrf').select2({
        allowClear: true,
        ajax: {
            url: "api/dtdownline",
            dataType: 'json',
            quietMillis: 100,
            multiple: true,
            data: function (term, page) {
                return {
                    term: term,
                    page_limit: 20,
                    page: page
                }
            },
            results: function (data, page) {
                var myResults = [];
                var more = (page * 20) < data.total;
                $.each(data.idrs, function (index, item) {
                    myResults.push({
                        id: item.idrs,
                        text: item.idrs + ' - ' + item.namars
                    })
                });
                return {
                    results: myResults,
                    more: more
                };

            }
        }
    });
    $('#select1xx,#select2xx').select2({
        ajax: {
            url: "datappselecttrf",
            dataType: 'json',
            quietMillis: 100,
            multiple: true,
            data: function (term, page) {
                return {
                    term: term,
                    page_limit: 10,
                    page: page
                }
            },
            results: function (data, page) {
                var myResults = [];
                var more = (page * 10) < data.total;
                $.each(data.terminal_id, function (index, item) {
                    myResults.push({
                        id: item.terminal_id,
                        text: item.terminal_id + ' - ' + item.nama_pp
                    })
                });
                return {
                    results: myResults,
                    more: more
                };

            }
        }
    });
    $('#newselect1').select2({
        ajax: {
            url: "datappselectnotall",
            dataType: 'json',
            quietMillis: 100,
            multiple: true,
            data: function (term, page) {
                return {
                    term: term,
                    page_limit: 10,
                    page: page
                }
            },
            results: function (data, page) {
                var myResults = [];
                var more = (page * 10) < data.total;
                $.each(data.terminal_id, function (index, item) {
                    myResults.push({
                        id: item.terminal_id,
                        text: item.terminal_id + ' - ' + item.nama_pp
                    })
                });
                return {
                    results: myResults,
                    more: more
                };

            }
        }
    });
    jQuery("select[name*='biller']").click(function () {
        jQuery("select[name*='produk']").html('');
        jQuery.post('bil', {
            'biller': jQuery("select[name*='biller']").val()
        }, function (data, textStatus) {
            jQuery("select[name*='produk']").append(data)
        })
    });
    $('.date-picker').datepicker({

        showOtherMonths: true,
        selectOtherMonths: false,
        autoclose: 1,

    }).next().on(ace.click_event, function () {

        $(this).prev().focus()
    });
    $.validator.addMethod("notEqual", function (value, element) {
        return $('#select1x').val() != $('#select2x').val()
    }, "PP Asal Sama Dengan PP Tujuan");
    $.validator.addMethod("alpanumericRegex", function (value, element) {
        return this.optional(element) || /^[a-z0-9\-\s]+$/i.test(value)
    }, "gunakan angka atau huruf");
    $.validator.addMethod("uppercase", function (value, element) {
        return this.optional(element) || !/([a-z])/.test(value)
    }, "Please enter a uppercase");
    $.validator.addMethod("postvalidator", function (value, element) {
        return this.optional(element) || /^[a-z0-9\-\_\s]+$/i.test(value)
    }, "gunakan angka dan huruf dan _ dan -");
    $.validator.addMethod("notEquals", function (value, element) {
        return $('#submasal').val() != $('#submtujuan').val()
    }, "Submitra Asal Sama Dengan Submitra Tujuan");
    $("#form-validate").validate({
        ignore: null,
        ignore: 'input[type="hidden"]',
        rules: {
            namadownline: "required",
            selisih: "required",
            alamat: "required",
            hpdownline: "required",
            pp: "required",
            biller: "required",
            produk: "required",
            KodePengaman: "required",
            saldo: "required",
            hpreg: "required",
            alamatreg: "required",
            namareg: "required",
            bil: "required",
            pin: "required",
            prod: "required",
            layanan: "required",
            privilages: "required",
            kd_mapping: "required",
            switching: "required",
            iddownline: "required",
            idpel: {
                required: true
            },
            saldo: {
                required: true
            },
            mitraho: {
                required: true
            },
            tgltrx: {
                required: true
            },
            tglawal: {
                required: true
            },
            tglakhir: {
                required: true
            },
            username: {
                required: true,
                postvalidator: true
            },
            password: {
                required: true,
                postvalidator: true
            },
            newpassword: {
                required: true,
                postvalidator: true
            },
            confirmnewpassword: {
                required: true,
                equalTo: "#newpassword",
                postvalidator: true
            },
            nama_mitra: {
                required: true,
                uppercase: true
            },
            alamat: {
                required: true
            },
            notelp: {
                required: true
            },
            keterangan: {
                required: true
            },
            idreseller: {
                alpanumericRegex: true,
                minlength: 6,
            },
            isipesan: {
                alpanumericRegex: true
            },
            nama_pp: {
                required: true,
                uppercase: true
            },
            admin: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            saldo: {
                required: true,
            },
            tgl: {
                required: true,
            },
            KodePengaman: {
                required: true,
            },
            blth: {
                required: true,
            },
            "radiox[]": {
                required: true,
            },
            ppawal: {
                notEqual: true,
                required: true,
            },
            pptujuan: {
                notEqual: true,
                required: true,
            },
            bit41_jpa: {
                required: true,
                uppercase: true
            },
            submitraasal: {
                notEquals: true,
                required: true,
            },
            submitratujuan: {
                notEquals: true,
                required: true,
            }
        },
        messages: {
            wilayah: "Pilih wilayah",
            namadownline: "isi nama downline",
            hpdownline: "isi nomor hp downline",
            alamat: "isi alamat",
            mitra: "isi jumlah transfer",
            mitraho: "Pilih mitra HO",
            pp: "Pilih pp",
            iddownline: "Pilih Downline",
            biller: "Pilih biller",
            pin: "Masukkan PIN",
            produk: "Pilih produk",
            KodePengaman: "Masukkan Kode pengaman seperti gambar disamping",
            bil: "Pilih biller",
            prod: "Pilih produk",
            tglawal: "Pilih tglawal",
            tglakhir: "Pilih tglakhir",
            tgltrx: "Pilih tgltrx",
            layanan: "Pilih Layanan",
            idpel: "Masukan No Tujuan",
            username: {
                required: "Masukan Username",
                postvalidator: "character special di tolak system"
            },
            password: {
                required: "Masukan Password",
                postvalidator: "character special di tolak system"
            },
            newpassword: {
                required: "Masukan Password Baru",
                postvalidator: "character special di tolak system"
            },
            confirmnewpassword: {
                required: "Masukan Konfirmasi Password Baru",
                equalTo: "Password Anda Tidak Sesuai",
                postvalidator: "character special di tolak system"
            },
            privilages: "Masukan Privilages",
            nama_mitra: {
                required: "Masukan Nama Mitra",
                uppercase: "Masukan Huruf Besar/Capslock"
            },
            alamat: "Masukan Alamat",
            notelp: "Masukan No Telp",
            keterangan: "Pilih Keterangan",
            kd_mapping: "Pilih Group Mitra",
            tid: {
                required: "Masukan TerminalId",
                alpanumericRegex: "Alpha Numeric"
            },
            nama_pp: {
                required: "Masukan Nama PP",
                uppercase: "Masukan Huruf Besar/Capslock"
            },
            admin: "Masukan Admin",
            switching: "Pilih Switching",
            email: {
                required: "Masukan Alamat Email",
                email: "Alamat Email Dengan Format name@domain.com",
            },
            saldo: "Masukan Jumlah Transfer",
            hpreg: "Masukkan Nomor Hp",
            tgl: "Pilih Tanggal",
            blth: "Pilih Bulan Tahun",
            "radiox[]": "Pilih Jenis Deposit",
            ppawal: {
                required: "Pilih PP Awal",
                notEqual: "PP Asal Sama Dengan PP Tujuan"
            },
            pptujuan: {
                required: "Piih PP Tujuan",
                notEqual: "PP Asal Sama Dengan PP Tujuan"
            },
            bit41_jpa: {
                required: "Masukan Bit41 JPA",
                uppercase: "Masukan Huruf Besar/Capslock"
            },
            submitraasal: {
                required: "Pilih SubMitra Awal",
                notEquals: "Submitra Asal Sama Dengan Submitra Tujuan"
            },
            submitratujuan: {
                required: "Pilih SubMitra Tujuan",
                notEquals: "Submitra Asal Sama Dengan Submitra Tujuan"
            },
        }
    });
    $('#sample-table-2').dataTable({
        "aLengthMenu": [
            [10, 25, 50, 75, -1],
            [10, 25, 50, 75, "All"]
        ],
        "iDisplayLength": 10
    });
    $('#tableuser,#tablemitra,#inf0mitra,#inf0mitraHO,#tablemitraho').dataTable({
        "aLengthMenu": [
            [10, 25, 50, 75, -1],
            [10, 25, 50, 75, "All"]
        ],
        "iDisplayLength": 10
    });
    $("#report").click(function () {
        var report = $("input[name='report']").val();
        window.location = report
    });
    $("#info").click(function () {
        var info = $("input[name='info']").val();
        window.location = info
    });
    $("#admin").click(function () {
        var admin = $("input[name='admin']").val();
        window.location = admin
    });
    $.each($(".pdetailwilayah"), function (index, val) {
        var params = $(this).val();
        $('.detwil' + params).click(function () {
            var url = 'detailwilayah';
            loadpost($(this), params, url)
        })
    });
    $.each($(".pdetailmitra"), function (index, val) {
        var params = $(this).val();
        $('.detmitra' + params).click(function () {
            var url = 'detailmitra';
            loadpost($(this), params, url)
        })
    });
    $.each($(".pdetailpp"), function (index, val) {
        var params = $(this).val();
        $('.detpp' + params).click(function () {
            var url = 'detailpp';
            loadpost($(this), params, url)
        })
    });
    $.each($(".pdetailbiller"), function (index, val) {
        var params = $(this).val();
        $('.detbiller' + params).click(function () {
            var url = 'detailbiller';
            loadpost($(this), params, url)
        })
    });
    var loadpost = function (el, params, url) {
        $('#dvLoading').show();
        var jparams = $('.paramsj' + params).val();
        $.ajax({
            type: "POST",
            data: jparams,
            cache: false,
            url: url,
            success: function (res) {
                $('.table-header').hide();
                $('#sample-table-9').hide();
                $('#dvLoading').hide();
                $('#response').html(res)
            }
        })
    };
    $('#wil').hide();
    $('#mit').hide();
    $('#mitwilayah').hide();
    jQuery("select[name*='privilages']").click(function () {
        var priv = $("select[name*='privilages']").val();
        if (priv == '4' || priv == '7') {
            $('#wil').show();
            $('#mit').show();
            $('#mitwilayah').hide()
        } else if (priv == '9') {
            $('#wil').show();
            $('#mit').show();
            $('#mitwilayah').show()
        } else {
            $('#wil').hide();
            $('#mit').hide();
            $('#mitwilayah').hide()
        }
    });
    $("#form-validate1").validate({
        ignore: null,
        ignore: 'input[type="hidden"]',
        rules: {
            username: {
                required: true
            }
        },
        messages: {
            username: "Masukan Username"
        }
    });
    $(".toggler").click(function (e) {
        e.preventDefault();
        $('.cat' + $(this).attr('data-prod-cat')).toggle()
    });
    $.each($(".pdetailhome"), function (index, val) {
        var params = $(this).val();
        $('.dethome' + params).click(function () {
            var url = 'detailhome';
            loaddetail($(this), params, url)
        })
    });
    $.each($(".pdetailhomeMB"), function (index, val) {
        var params = $(this).val();
        $('.dethomeMB' + params).click(function () {
            var url = 'detailhomeMB';
            loaddetail($(this), params, url)
        })
    });
    $.each($(".pdetailhomekemarin"), function (index, val) {
        var params = $(this).val();
        $('.dethomekemarin' + params).click(function () {
            var url = 'detailhomekemarin';
            loaddetail($(this), params, url)
        })
    });
    $.each($(".pdetailhomekemarinMB"), function (index, val) {
        var params = $(this).val();
        $('.dethomekemarinMB' + params).click(function () {
            var url = 'detailhomekemarinMB';
            loaddetail($(this), params, url)
        })
    });
    var loaddetail = function (el, params, url) {
        $('#dvLoading').show();
        var jparams = $('.paramsj' + params).val();
        $.ajax({
            type: "POST",
            data: jparams,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#modal-table').html(res)
            }
        })
    };
    $('#pp').dataTable({
        "bProcessing": true,
        "oLanguage": {
            "sProcessing": "<div id='dvLoading'></div>"
        },
        "aoColumns": [{
            "sClass": "namawilayah"
        }, {
            "sClass": "terminalpp"
        }, {
            "sClass": "namapp"
        }, {
            "sClass": "namamitraHO"
        }, {
            "sClass": "alamatmitra"
        }, {
            "sClass": "switch"
        }, {
            "sClass": "tools"
        }, {
            "sClass": "tools"
        }],
        "bServerSide": true,
        "sAjaxSource": "infoppdata",
        "sServerMethod": "POST",
    });
    $('#pp2').dataTable({
        "bProcessing": true,
        "oLanguage": {
            "sProcessing": "<div id='dvLoading'></div>"
        },
        "aoColumns": [{
            "sClass": "namawilayah"
        }, {
            "sClass": "terminalpp"
        }, {
            "sClass": "namapp"
        }, {
            "sClass": "namamitraHO"
        }, {
            "sClass": "alamatmitra"
        }, {
            "sClass": "switch"
        }, {
            "sClass": "datelogin"
        }],
        "bServerSide": true,
        "sAjaxSource": "infoppdata",
        "sServerMethod": "POST",
    });
    $('#ppmb').dataTable({
        "bProcessing": true,
        "oLanguage": {
            "sProcessing": "<div id='dvLoading'></div>"
        },
        "aoColumns": [{
            "sClass": "namawilayah"
        }, null, {
            "sClass": "namapp"
        }, {
            "sClass": "namamitra"
        }, {
            "sClass": "alamatmitra"
        }, {
            "sClass": "status"
        }, {
            "sClass": "tools"
        }],
        "bServerSide": true,
        "sAjaxSource": "infoppmbdata",
        "sServerMethod": "POST",
    });
    $('#cutrx').hide();
    $('#widgetexportinfocu').hide();
    $('button[name="viewcu"]').click(function () {
        var tid = $('input[name="pp"]').val();
        var tgl = $('input[name="tgltrx"]').val();
        var keys = $('input[name="keys"]').val();
        $('#cutrx').show();
        $('#widgetexportinfocu').show();
        cutrx(tid, tgl, keys);
        checkbox()
    });
    var cutrx = function (tid, tgl, keys) {
        $('#cutrx').dataTable({
            "aLengthMenu": [
                [10, 20, 50, 100, 200, -1],
                [10, 20, 50, 100, 200, "All"]
            ],
            "bProcessing": true,
            "oLanguage": {
                "sProcessing": "<div id='dvLoading'></div>"
            },
            "aoColumnDefs": [{
                "bSortable": false,
                "aTargets": [0]
            }],
            "aoColumns": [{
                "sClass": "center"
            }, null, null, {
                "sClass": "right"
            }, {
                "sClass": "right"
            }, {
                "sClass": "right"
            }, {
                "sClass": "right"
            }],
            "bServerSide": true,
            "sAjaxSource": "cudata/tid/" + tid + "/tgl/" + tgl + "/key/" + keys,
            "sServerMethod": "POST",
            "bDestroy": true,
        })
    };
    var checkbox = function () {
        $('table th input:checkbox').on('click', function () {
            var that = this;
            $(this).closest('table').find('tr > td:first-child input:checkbox').each(function () {
                this.checked = that.checked;
                $(this).closest('tr').toggleClass('selected')
            })
        })
    };
    $('table th input:checkbox').on('click', function () {
        var that = this;
        $(this).closest('table').find('tr > td:first-child input:checkbox').each(function () {
            this.checked = that.checked;
            $(this).closest('tr').toggleClass('selected')
        })
    });
    $("#pdf").click(function (event) {
        event.preventDefault();
        var productId = new Array();
        var j = 0;
        $("#cutrx input:checkbox:checked").each(function () {
            productId[j] = $(this).val();
            j++
        });
        $.fileDownload("pdfstruk", {
            httpMethod: "POST",
            data: {
                "x": JSON.stringify(productId)
            },
            contentType: "application/json"
        })
    });
    $('#form-validate2').validate({
        ignore: null,
        rules: {
            kodeinject: {
                required: true,
            },
            securitycodes2: {
                required: true,
            },
            "checking[]": {
                required: true,
                minlength: 1
            }
        },
        messages: {
            kodeinject: "MAsukan Kode Inject",
            securitycodes2: "Masukan Security Codes",
            "checking[]": "Pilih data Temp Deposit",
        }
    });
    $('#savetemp').click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'temp';
        var data = {
            "message": "save",
            pp: $('#select1x').val(),
            saldo: $('#saldo').val(),
            key: $('#key').val()
        };
        totemp($(this), data, url)
    });
    $('#deletetemp').click(function () {
        var url = 'temp';
        var id = new Array();
        var j = 0;
        $("#inject input:checkbox:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var data = {
            "message": "delete",
            id: JSON.stringify(id),
            key: $('#key').val()
        };
        totemp($(this), data, url)
    });
    var totemp = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#results').html(res);
                checkbox()
            }
        })
    };
    $('#injectexecute').click(function () {
        if (!$("#form-validate").valid()) return false;
        $('#dvLoadingtrf').show();
        $('#injectexecute').hide();
        var params = {
            idrs: $('#selectdownlinetrf').val(),
            saldo: $('#saldo').val(),
            pin: $('#pin').val(),
            irstoken: $('#irstoken').val()
        };
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: 'api/transferdeposit',
            success: function (res) {
                bootbox.dialog(res, [{
                    "label": "OK",
                    "class": "btn-small btn-primary",
                }])
                $('#injectexecute').show(),
                    $('#saldo').val(''),
                    $('#pin').val(''),
                    $('#selectdownlinetrf').select2('data', null)
            }
        })
    });





    $('.date-pickerx').datepicker({
        viewMode: "months",
        minViewMode: "months"
    });
    $("#saldo,#saldo1,#hpreg").keypress(function (event) {
        var controlKeys = [8, 9, 13, 35, 36, 37, 39];
        var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
        if (!event.which || (48 <= event.which && event.which <= 57) || (48 == event.which && $(this).attr("value")) || isControlKey) {
            return
        } else {
            event.preventDefault()
        }
    });
    $("#savingadd").click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'addpp';
        var pp = $("#select1x").val();
        var id = new Array();
        var j = 0;
        $("input:radio:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var data = {
            pp: pp,
            jd: id,
            key: $('#key').val()
        };
        exadd($(this), data, url)
    });
    var exadd = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#res').html(res)
            }
        })
    };
    $('#listdepositpp').dataTable({
        "bProcessing": true,
        "oLanguage": {
            "sProcessing": "<div id='dvLoading'></div>"
        },
        "aoColumns": [null, null, null, null, null, null],
        "bServerSide": true,
        "sAjaxSource": "listdepositppdata",
        "sServerMethod": "POST",
    });




    $("#viewlap").click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'lapdeppp';
        var data = {
            pp: $('#select1x').val(),
            tglawal: $('input[name="tglawal"]').val(),
            tglakhir: $('input[name="tglakhir"]').val(),
            key: $('#key').val()
        };
        lapdeposit($(this), data, url)
    });
    $("#viewlaptrxpp").click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'laptrxdeppp';
        var data = {
            pp: $('#select1x').val(),
            tglawal: $('input[name="tglawal"]').val(),
            tglakhir: $('input[name="tglakhir"]').val(),
            key: $('#key').val()
        };
        lapdeposit($(this), data, url)
    });
    var lapdeposit = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#res').html(res)
            }
        })
    };
    $('#savetemptrf').click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'temptrf';
        var data = {
            "message": "save",
            ppawal: $('#select1x').val(),
            pptujuan: $('#select2x').val(),
            saldo: $('#saldo').val(),
            key: $('#key').val()
        };
        totemptrf($(this), data, url)
    });
    $('#deletetemptrf').click(function () {
        var url = 'temptrf';
        var id = new Array();
        var j = 0;
        $("#inject input:checkbox:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var data = {
            "message": "delete",
            id: JSON.stringify(id),
            key: $('#key').val()
        };
        totemptrf($(this), data, url)
    });
    $('#savetempsubmitratrf').click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'tempsubmitratrf';
        var data = {
            "message": "save",
            submitraawal: $('#submasal').val(),
            submitratujuan: $('#submtujuan').val(),
            saldo: $('#saldo').val(),
            key: $('#key').val()
        };
        totemptrf($(this), data, url)
    });
    $('#deletetempsubmitratrf').click(function () {
        var url = 'tempsubmitratrf';
        var id = new Array();
        var j = 0;
        $("#inject input:checkbox:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var data = {
            "message": "delete",
            id: JSON.stringify(id),
            key: $('#key').val()
        };
        totemptrf($(this), data, url)
    });
    var totemptrf = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#results').html(res);
                checkbox()
            }
        })
    };
    $('#trfexecute').click(function () {
        if (!$("#form-validate2").valid()) return false;
        var url = 'trf';
        var id = new Array();
        var j = 0;
        $("#inject input:checkbox:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var scode = $('#securitycodes2').val();
        var kdinjectx = $('#kodeinject').val();
        var data = {
            "message": "trf",
            id: JSON.stringify(id),
            scure: scode,
            kdinject: kdinjectx,
            key: $('#key').val()
        };
        trf($(this), data, url)
    });
    $('#trfsubcaexecute').click(function () {
        if (!$("#form-validate2").valid()) return false;
        var url = 'trfSubmitra';
        var id = new Array();
        var j = 0;
        $("#inject input:checkbox:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var scode = $('#securitycodes2').val();
        var kdinjectx = $('#kodeinject').val();
        var data = {
            "message": "trf",
            id: JSON.stringify(id),
            scure: scode,
            kdinject: kdinjectx,
            key: $('#key').val()
        };
        trf($(this), data, url)
    });
    var trf = function (el, params, url) {
        $('#dvLoading').show();
        $('#trfexecute').hide();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#res').html(res);
                $('#trfexecute').show()
            }
        })
    };
    $('#savetempmitra').click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'tempmitra';
        var data = {
            "message": "save",
            param: $('#select1').val(),
            saldo: $('#saldo').val(),
            key: $('#key').val()
        };
        totempmitra($(this), data, url)
    });
    $('#deletetempmitra').click(function () {
        var url = 'tempmitra';
        var id = new Array();
        var j = 0;
        $("#inject input:checkbox:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var data = {
            "message": "delete",
            id: JSON.stringify(id),
            key: $('#key').val()
        };
        totempmitra($(this), data, url)
    });
    var totempmitra = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#results').html(res)
            }
        })
    };
    $('#injectmitraexecute').click(function () {
        if (!$("#form-validate2").valid()) return false;
        var url = 'ijcmitra';
        var id = new Array();
        var j = 0;
        $("#inject input:checkbox:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var scode = $('#securitycodes2').val();
        var kdinjectx = $('#kodeinject').val();
        var data = {
            "message": "inject",
            id: JSON.stringify(id),
            scure: scode,
            kdinject: kdinjectx,
            key: $('#key').val()
        };
        ijcm($(this), data, url)
    });
    var ijcm = function (el, params, url) {
        $('#dvLoading').show();
        $('#injectmitraexecute').hide();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#res').html(res);
                $('#injectmitraexecute').show()
            }
        })
    };
    $('#listdepositmitra').dataTable({
        "bProcessing": true,
        "oLanguage": {
            "sProcessing": "<div id='dvLoading'></div>"
        },
        "aoColumns": [null, null, null, null, null],
        "bServerSide": true,
        "sAjaxSource": "listdepositmitradata",
        "sServerMethod": "POST",
    });
    $("#viewlapdepmitrax").click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'lapdepmitra';
        var data = {
            mitra: $('#select1').val(),
            tglawal: $('input[name="tglawal"]').val(),
            tglakhir: $('input[name="tglakhir"]').val(),
            key: $('#key').val()
        };
        lapdepositmitrax($(this), data, url)
    });
    $("#viewlaptrxmitrax").click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'laptrxdepmitra';
        var data = {
            mitra: $('#select1').val(),
            tglawal: $('input[name="tglawal"]').val(),
            tglakhir: $('input[name="tglakhir"]').val(),
            key: $('#key').val()
        };
        lapdepositmitrax($(this), data, url)
    });
    var lapdepositmitrax = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#res').html(res)
            }
        })
    };
    $("#savingaddmitra").click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'addmitradep';
        var mitra = $("#select1").val();
        var id = new Array();
        var j = 0;
        $("input:radio:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var data = {
            mitra: mitra,
            jd: id,
            key: $('#key').val()
        };
        exadd($(this), data, url)
    });
    $('#form-validate3').validate({
        ignore: null,
        rules: {
            "checking[]": {
                required: true,
                minlength: 1
            }
        },
        messages: {
            "checking[]": "* Error, Checklist data List Approvel",
        }
    });
    $('#form-validate4').validate({
        ignore: null,
        rules: {
            kodeinjectxxx: {
                required: true,
            }
        },
        messages: {
            kodeinjectxxx: "* Error, Masukkan Kode Approvel",
        }
    });
    $('#appdep').click(function () {
        if (!$("#form-validate3").valid()) return false;
        $('#modal-table').modal({
            show: 'true'
        });
        $('#approvelist').click(function () {
            if (!$("#form-validate4").valid()) return false;
            var url = 'apprmitra';
            var id = new Array();
            var j = 0;
            $("input:checkbox:checked").each(function () {
                id[j] = $(this).val();
                j++
            });
            var kdinjectxx = $('#kodeinjectxxx').val();
            var data = {
                "message": "approvel",
                id: JSON.stringify(id),
                kdinject: kdinjectxx,
                key: $('#key').val()
            };
            appr($(this), data, url)
        })
    });
    var appr = function (el, params, url) {
        $('#dvLoadingx').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoadingx').hide();
                $('#res').html(res)
            }
        })
    };
    $("#viewAppDep").click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'lapapproveldepdata';
        var data = {
            mitra: $('#select1').val(),
            tglawal: $('input[name="tglawal"]').val(),
            tglakhir: $('input[name="tglakhir"]').val(),
            key: $('#key').val()
        };
        lapapprovedep($(this), data, url)
    });
    var lapapprovedep = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#res').html(res)
            }
        })
    };
    $("#finish").click(function () {
        $('#validation-form-confirm').validate({
            ignore: null,
            rules: {
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                    postvalidator: true
                },
                password2: {
                    required: true,
                    equalTo: "#password",
                    postvalidator: true
                }
            },
            messages: {
                email: {
                    required: "Kami Membutukan Email Anda",
                    email: "Alamat Email Dengan Format name@domain.com",
                },
                password: {
                    required: "MAsukan Password Baru Anda",
                    postvalidator: "character special di tolak system"
                },
                password2: {
                    required: "MAsukan Konfirmasi Password Baru Anda",
                    equalTo: "Password Anda Tidak Sesuai",
                    postvalidator: "character special di tolak system"
                }
            }
        })
    });
    $("#skip").click(function () { });
    $('#appdaftarpp').click(function () {
        if (!$("#form-validate3").valid()) return false;
        var url = 'daftarppex';
        var id = new Array();
        var j = 0;
        $("input:checkbox:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var data = {
            "message": "approvel",
            id: JSON.stringify(id),
            key: $('#key').val()
        };
        dftpp($(this), data, url)
    });
    $('#hapusdaftarpp').click(function () {
        if (!$("#form-validate3").valid()) return false;
        var url = 'daftarppex';
        var id = new Array();
        var j = 0;
        $("input:checkbox:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var data = {
            "message": "remove",
            id: JSON.stringify(id),
            key: $('#key').val()
        };
        dftpp($(this), data, url)
    });
    var dftpp = function (el, params, url) {
        $('#dvLoadingx').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoadingx').hide();
                $('#res').html(res)
            }
        })
    };
    $("select[name*='merchant']").change(function () {
        var merch = $("select[name*='merchant']").val();
        if (merch == '1') {
            $("input[name*='tid']").attr('maxlength', '8')
        } else if (merch == '2') {
            $("input[name*='tid']").attr('maxlength', '16')
        }
    });
    $('#savetempmitraHO').click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'tempmitraHO';
        var data = {
            "message": "save",
            param: $('#select1').val(),
            saldo: $('#saldo').val(),
            key: $('#key').val()
        };
        totempmitraHO($(this), data, url)
    });
    $('#deletetempmitraHO').click(function () {
        var url = 'tempmitraHO';
        var id = new Array();
        var j = 0;
        $("#inject input:checkbox:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var data = {
            "message": "delete",
            id: JSON.stringify(id),
            key: $('#key').val()
        };
        totempmitraHO($(this), data, url)
    });
    var totempmitraHO = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            headers: {
                'Authorization': btoa(params)
            },
            success: function (res) {
                $('#dvLoading').hide();
                $('#results').html(res)
            }
        })
    };
    $('#injectmitraHOexecute').click(function () {
        if (!$("#form-validate2").valid()) return false;
        var url = 'ijcmitraHO';
        var id = new Array();
        var j = 0;
        $("#inject input:checkbox:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var scode = $('#securitycodes2').val();
        var kdinjectx = $('#kodeinject').val();
        var data = {
            "message": "inject",
            id: JSON.stringify(id),
            scure: scode,
            kdinject: kdinjectx,
            key: $('#key').val()
        };
        ijcHO($(this), data, url)
    });
    var ijcHO = function (el, params, url) {
        $('#dvLoading').show();
        $('#injectmitraHOexecute').hide();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#res').html(res);
                $('#injectmitraHOexecute').show()
            }
        })
    };
    $("#viewlapdepmitraxHO").click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'lapdepmitraHO';
        var data = {
            mitra: $('#select1').val(),
            tglawal: $('input[name="tglawal"]').val(),
            tglakhir: $('input[name="tglakhir"]').val(),
            key: $('#key').val()
        };
        lapdepositmitraxHO($(this), data, url)
    });
    var lapdepositmitraxHO = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#res').html(res)
            }
        })
    };
    $('#appdepHO').click(function () {
        $('#form-validate4').get(0).reset();
        $('.error,.sukses').hide();
        if (!$("#form-validate3").valid()) return false;
        $('#modal-table').modal({
            show: 'true'
        });
        $('#approvelistHO').click(function () {
            if (!$("#form-validate4").valid()) return false;
            var url = 'apprmitraHO';
            var id = new Array();
            var j = 0;
            $("input:checkbox:checked").each(function () {
                id[j] = $(this).val();
                j++
            });
            var kdinjectxx = $('#kodeinjectxxx').val();
            var data = {
                "message": "approvel",
                id: JSON.stringify(id),
                kdinject: kdinjectxx,
                key: $('#key').val()
            };
            apprHO($(this), data, url)
        })
    });
    $('#hapusdepHO').click(function () {
        $('#form-validate4').get(0).reset();
        var url = 'apprmitraHO';
        var id = new Array();
        var j = 0;
        $("input:checkbox:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var data = {
            "message": "hapus",
            id: JSON.stringify(id),
            key: $('#key').val()
        };
        $('#dvLoading').show();
        apprHO($(this), data, url)
    });
    var apprHO = function (el, params, url) {
        $('#dvLoadingx').show();
        $('#approvelistHO').hide();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoadingx').hide();
                $('#dvLoading').hide();
                $('#res').html(res);
                $('#approvelistHO').show()
            }
        })
    };
    $("#viewAppDepHO").click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'lapapproveldepdataho';
        var data = {
            mitra: $('#select1').val(),
            tglawal: $('input[name="tglawal"]').val(),
            tglakhir: $('input[name="tglakhir"]').val(),
            key: $('#key').val()
        };
        lapapprovedep($(this), data, url)
    });
    $("#settlement").click(function () {
        if (!$("#form-validate").valid()) return false;
        var idx = $("select[name*='mitra']").val();
        var tgl = $("input[name*='tgltrx']").val();
        var keys = $("input[name*='key']").val();
        infSettle(idx, tgl, keys)
    });
    var infSettle = function (idx, tgl, keys) {
        $('#settle').dataTable({
            "aLengthMenu": [
                [10, 20, 50, 100, 200, -1],
                [10, 20, 50, 100, 200, "All"]
            ],
            "bProcessing": true,
            "oLanguage": {
                "sProcessing": "<div id='dvLoading'></div>"
            },
            "aoColumnDefs": [{
                "bSortable": false,
                "aTargets": [0]
            }, {
                "bSortable": false,
                "aTargets": [1]
            }, {
                "bSortable": false,
                "aTargets": [2]
            }, {
                "bSortable": false,
                "aTargets": [3]
            }, {
                "bSortable": false,
                "aTargets": [4]
            }, {
                "bSortable": false,
                "aTargets": [5]
            }, {
                "bSortable": false,
                "aTargets": [7]
            }],
            "aoColumns": [{
                "sClass": "center"
            }, {
                "sClass": "center"
            }, {
                "sClass": "center"
            }, {
                "sClass": "center"
            }, {
                "sClass": "center"
            }, {
                "sClass": "center"
            }, {
                "sClass": "center"
            }, {
                "sClass": "center"
            }],
            "bServerSide": true,
            "sAjaxSource": "infsettledata/id/" + idx + "/tgl/" + tgl + "/key/" + keys,
            "sServerMethod": "POST",
            "bDestroy": true,
        })
    };
    $('#listdepositmitraho').dataTable({
        "bProcessing": true,
        "oLanguage": {
            "sProcessing": "<div id='dvLoading'></div>"
        },
        "aoColumns": [{
            "sClass": "namamitraHO"
        }, null, null, null],
        "bServerSide": true,
        "sAjaxSource": "listdepositmitradataho",
        "sServerMethod": "POST",
    });
    $('#viewcsvls').click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'csvpelunasandata';
        var data = {
            "message": "view",
            pp: $('#select1x').val(),
            tgl: $("input[name='tgl']").val(),
            key: $('#key').val()
        };
        viewcsv($(this), data, url)
    });
    var viewcsv = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#res').html(res);
                checkbox()
            }
        })
    };
    $("#savingaddmitraHO").click(function () {
        if (!$("#form-validate").valid()) return false;
        var url = 'addmitradepho';
        var mitra = $("#select1").val();
        var id = new Array();
        var j = 0;
        $("input:radio:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var data = {
            mitra: mitra,
            jd: id,
            key: $('#key').val()
        };
        exadd($(this), data, url)
    });
    $("#homehriinidiv").ready(function () {
        var url = 'homehariinidata';
        var data = {
            "message": "hariini"
        };

    });
    jQuery("select[name='bil']").click(function () {
        jQuery("select[name='prod']").html('');
        jQuery.post('lbileer', {
            'biller': jQuery("select[name='bil']").val()
        }, function (data, textStatus) {
            jQuery("select[name='prod']").append(data)
        })
    });
    $('#form-validate10').validate({
        ignore: null,
        ignore: 'input[type="hidden"]',
        rules: {
            mitra: "required",
            pp: "required",
            saldo: {
                required: true,
            },
            kodeinject: {
                required: true,
            },
            securitycodes2: {
                required: true,
            },
        },
        messages: {
            mitra: "Pilih Mitra",
            pp: "Pilih PP",
            saldo: "MAsukan Saldo Deinject",
            kodeinject: {
                required: "MAsukan Kode Inject Anda",
            },
            securitycodes2: {
                required: "Masukan Security Codes",
            },
        }
    });
    $('#deinjectmitraHOexecute').click(function () {
        if (!$("#form-validate10").valid()) return false;
        var url = 'deijcmitraHO';
        var id = $('#saldo').val();
        var mitra = $('#select1').val();
        var scode = $('#securitycodes2').val();
        var kdinjectx = $('#kodeinject').val();
        var data = {
            "message": "inject",
            mtr: mitra,
            id: id,
            scure: scode,
            kdinject: kdinjectx,
            key: $('#key').val()
        };
        deijcHO($(this), data, url)
    });
    $('#deinjectsubmitra').click(function () {
        if (!$("#form-validate10").valid()) return false;
        var url = 'deijcsubmitra';
        var id = $('#saldo').val();
        var mitra = $('#select1').val();
        var scode = $('#securitycodes2').val();
        var kdinjectx = $('#kodeinject').val();
        var data = {
            "message": "inject",
            mtr: mitra,
            id: id,
            scure: scode,
            kdinject: kdinjectx,
            key: $('#key').val()
        };
        deijcHO($(this), data, url)
    });
    $('#deinjectpp').click(function () {
        if (!$("#form-validate10").valid()) return false;
        var url = 'deijcpp';
        var id = $('#saldo').val();
        var pp = $("input[name*='pp']").val();
        var scode = $('#securitycodes2').val();
        var kdinjectx = $('#kodeinject').val();
        var data = {
            "message": "inject",
            mtr: pp,
            id: id,
            scure: scode,
            kdinject: kdinjectx,
            key: $('#key').val()
        };
        deijcHO($(this), data, url)
    });
    var deijcHO = function (el, params, url) {
        $('#dvLoading').show();
        $('#injectmitraHOexecute').hide();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#res').html(res);
                $('#injectmitraHOexecute').show()
            }
        })
    };
    $('#id-input-file-1 , #id-input-file-2').ace_file_input({
        no_file: 'No File ...',
        btn_choose: 'Choose',
        btn_change: 'Change',
        droppable: false,
        onchange: null,
        thumbnail: false,
        whitelist: 'gif|png|jpg|jpeg|txt|csv',
        blacklist: 'exe|php'
    });
    var $validation = false;
    $('#fuelux-wizard').ace_wizard().on('change', function (e, info) {
        if (info.step == 1 && $validation) {
            if (!$('#validation-form').valid()) return false
        }
    }).on('finished', function (e) {
        bootbox.dialog("Terima Kasih! Rekonsilasi Selesai!", [{
            "label": "OK",
            "class": "btn-small btn-primary",
        }])
    }).on('stepclick', function (e) { });
    $('#validation-form').hide();
    $('#skip-validation').removeAttr('checked').on('click', function () {
        $validation = this.checked;
        if (this.checked) {
            $('#sample-form').hide();
            $('#validation-form').show()
        } else {
            $('#validation-form').hide();
            $('#sample-form').show()
        }
    });
    $('#settgl').click(function () {
        if (!$("#xxx-form").valid()) return false;
        var url = 'rekoncile';
        var tglawal = $("input[name*='tglawal']").val();
        var tglakhir = $("input[name*='tglakhir']").val();
        var data = {
            "message": "settanggal",
            tgl1: tglawal,
            tgl2: tglakhir
        };
        REKON($(this), data, url)
    });
    $('#resettglrekon').click(function () {
        var url = 'rekoncile';
        var data = {
            "message": "resettgl"
        };
        REKON($(this), data, url)
    });
    $('#generateftr').click(function () {
        if (!$('#ftrform').valid()) return false;
        var url = 'rekoncile';
        var mtr = $('#select1').val();
        var data = {
            "message": "genftr",
            mitra: mtr
        };
        REKON($(this), data, url)
    });
    $('#uploadftr').click(function () {
        if (!$('#ftrform').valid()) return false;
        var url = 'rekoncile';
        var mtr = $('#select1').val();
        var data = {
            "message": "uploadftr",
            mitra: mtr
        };
        REKON($(this), data, url)
    });
    $('#hapusftr').click(function () {
        if (!$('#ftrform').valid()) return false;
        var url = 'rekoncile';
        var mtr = $('#select1').val();
        var data = {
            "message": "hapusftr",
            mitra: mtr
        };
        REKON($(this), data, url)
    });
    $('#checksuspect').click(function () {
        var url = 'rekoncile';
        var data = {
            "message": "checksuspect"
        };
        REKONCILES($(this), data, url)
    });
    $('#downloadfcn').click(function () {
        if (!$('#fcnform').valid()) return false;
        var url = 'rekoncile';
        var mtr = $('#select2').val();
        var data = {
            "message": "downloadfcn",
            mitra: mtr
        };
        REKON($(this), data, url)
    });
    $('#importfcn').click(function () {
        if (!$('#fcnform').valid()) return false;
        var url = 'rekoncile';
        var mtr = $('#select2').val();
        var data = {
            "message": "importfcn",
            mitra: mtr
        };
        REKON($(this), data, url)
    });
    $('#prosesfcn').click(function () {
        if (!$('#fcnform').valid()) return false;
        var url = 'rekoncile';
        var mtr = $('#select2').val();
        var data = {
            "message": "prosesfcn",
            mitra: mtr
        };
        REKON($(this), data, url)
    });
    $('#prosesfcnMB').click(function () {
        if (!$('#fcnform').valid()) return false;
        var url = 'rekoncileMB';
        var mtr = $('#select2').val();
        var data = {
            "message": "prosesfcnMB",
            mitra: mtr
        };
        REKON($(this), data, url)
    });
    $('#kirmlaporanbank').click(function () {
        var url = 'rekoncile';
        var data = {
            "message": "laporanbank"
        };
        REKON($(this), data, url)
    });
    $('#kirmlaporanmitra').click(function () {
        if (!$('#xxsetlle').valid()) return false;
        var url = 'rekoncile';
        var mtr = $('#select3').val();
        var data = {
            "message": "laporanmitra",
            mitra: mtr
        };
        REKON($(this), data, url)
    });
    $('#exportmup').click(function () {
        var url = 'rekoncile';
        var data = {
            "message": "exportmup"
        };
        REKON($(this), data, url)
    });
    $('#importswt').click(function () {
        var url = 'rekoncile';
        var data = {
            "message": "importftrswt"
        };
        REKON($(this), data, url)
    });
    $('#sinkronisasipln').click(function () {
        var url = 'rekoncile';
        var data = {
            "message": "sinkronpln"
        };
        REKON($(this), data, url)
    });
    $('#sinkronisasiMB').click(function () {
        var url = 'rekoncileMB';
        var data = {
            "message": "sinkronMB"
        };
        REKON($(this), data, url)
    });
    $('#cekdatasettle').click(function () {
        var url = 'rekoncile';
        var data = {
            "message": "cekdatasettle"
        };
        REKONCILESx($(this), data, url)
    });
    $('#downloadftr').click(function () {
        var url = 'rekoncile';
        var data = {
            "message": "downloadftr"
        };
        REKON($(this), data, url)
    });
    $('#downloadftrMB').click(function () {
        var url = 'rekoncileMB';
        var data = {
            "message": "downloadftrMB"
        };
        REKON($(this), data, url)
    });
    $('#CheckPendingFtp').click(function () {
        var url = 'rekoncile';
        var data = {
            "message": "checkftp"
        };
        REKONCILESxx($(this), data, url)
    });
    $('#prosesrcn').click(function () {
        var url = 'rekoncile';
        var data = {
            "message": "prosesrcn"
        };
        REKON($(this), data, url)
    });
    $('#prosesrcnMB').click(function () {
        var url = 'rekoncileMB';
        var data = {
            "message": "prosesrcnMB"
        };
        REKON($(this), data, url)
    });
    $('#checkrcn').click(function () {
        var url = 'rekoncile';
        var data = {
            "message": "checkrcn"
        };
        REKONCILESxxx($(this), data, url)
    });
    $('#checkrcnMB').click(function () {
        var url = 'rekoncileMB';
        var data = {
            "message": "checkrcnMB"
        };
        REKONCILESxxx($(this), data, url)
    });
    var REKON = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#res').html(res)
            }
        })
    };
    var REKONCILES = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#modal-table').html(res)
            }
        })
    };
    var REKONCILESx = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#modal-tablesettle').html(res)
            }
        })
    };
    var REKONCILESxx = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#modal-table-pending').html(res)
            }
        })
    };
    var REKONCILESxxx = function (el, params, url) {
        $('#dvLoading').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoading').hide();
                $('#modal-table-pendingx').html(res)
            }
        })
    };
    $('#xxx-form').validate({
        ignore: null,
        ignore: 'input[type="hidden"]',
        rules: {
            tglawal: "required",
            tglakhir: "required",
        },
        messages: {
            tglawal: "Pilih Tanggal Awal",
            tglakhir: "Pilih Tanggal Akhir",
        }
    });
    $('#formftp').validate({
        ignore: null,
        ignore: 'input[type="hidden"]',
        rules: {
            bit41: "required",
            kdmappingjpa: "required",
            user: "required",
            password: "required"
        },
        messages: {
            bit41: "Masukan BIT41",
            kdmappingjpa: "Masukan Kode Pengelola Switching",
            user: "Masukan User FTP",
            password: "Masukan Password FTP",
        }
    });
    $('#xxsetlle').validate({
        ignore: null,
        ignore: 'input[type="hidden"]',
        rules: {
            mitra: "required"
        },
        messages: {
            mitra: "Pilih Mitra Mup"
        }
    });
    $('#fcnform').validate({
        ignore: null,
        ignore: 'input[type="hidden"]',
        rules: {
            mitra: "required"
        },
        messages: {
            mitra: "Pilih Mitra Mup"
        }
    });
    $('#ftrform').validate({
        ignore: null,
        ignore: 'input[type="hidden"]',
        rules: {
            mitra: "required"
        },
        messages: {
            mitra: "Pilih Mitra Mup"
        }
    });
    $('#FTP').dataTable({
        "aLengthMenu": [
            [10, 25, 50, 75, -1],
            [10, 25, 50, 75, "All"]
        ],
        "iDisplayLength": 10
    });
    $('#hapuslistupdateadmin').click(function () {
        var url = 'ExHapusAdminList';
        var id = new Array();
        var j = 0;
        $("input:checkbox:checked").each(function () {
            id[j] = $(this).val();
            j++
        });
        var data = {
            "message": "remove",
            id: JSON.stringify(id),
            key: $('#key').val()
        };
        ListAdmin($(this), data, url)
    });
    var ListAdmin = function (el, params, url) {
        $('#dvLoadingx').show();
        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: url,
            success: function (res) {
                $('#dvLoadingx').hide();
                $('#res').html(res)
            }
        })
    }
});

function infodetailppx(terminal) {
    var datax = terminal;
    $('#dvLoading').show();
    $.ajax({
        url: 'infodetailpp',
        data: datax,
        type: 'post',
        success: function (res) {
            $('#dvLoading').hide();
            $('#info-pptables').html(res)
        }
    })
}

function updatenamappalamat(key) {
    var datax = key;
    $('#dvLoading').show();
    $.ajax({
        url: 'savenamapp',
        data: datax,
        type: 'post',
        success: function (res) {
            $('#dvLoading').hide();
            $('#res').html(res)
        }
    })
}

function addClass(obj) {
    $('[data-rel=popover]').popover({
        html: true
    })
};
function loadURL(url, container) {

    $.ajax({
        type: "GET",
        url: url,
        dataType: 'html',
        cache: true,
        beforeSend: function () {
            // cog placed
            container.html('<h1><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
            // only draw breadcrumb if it is content material
            // TODO: check if document title injection refreshes in IE...
            // TODO: see the framerate for the animation in touch devices
            if (container[0] == $("#content")[0]) {
                // drawBreadCrumb();
                // update title with breadcrumb...
                document.title = $(".breadcrumb li:last-child").text();

                // scroll up
                $("html, body").animate({
                    scrollTop: 0
                }, "fast");

            } else {
                container.animate({
                    scrollTop: 0
                }, "fast");
            }
        },
        success: function (data) {
            // cog replaced here...
            // alert("success")

            container.css({
                opacity: '0.0'
            }).html(data).delay(50).animate({
                opacity: '1.0'
            }, 300);
        },

        error: function (xhr, ajaxOptions, thrownError) {

            container.html('<h4 style="margin-top:10px; display:block; text-align:left"><i class="fa fa-warning txt-color-orangeDark"></i> Error 404! Page not found.</h4>');
        },
        async: false
    });

}

var proses = false;


function reloadixtrx() {

    $.ajax({
        cache: false,
        url: 'api/getreffloket',
        success: function (res1) {
            $('#reffclient').val(res1)


        }
    })


}

function bukaformpulsa(fkodevoucher) {

    var hp = $('#nohp').val();
    if (proses == false) {

        if (!confirm('Apakah yakin akan diproses ' + fkodevoucher + '?') == true) return false;
        proses = true;
        var params = {
            idtrx: $('#reffclient').val(),
            tujuan: $('#nohp').val(),
            kodeproduk: fkodevoucher
        };

        reloadixtrx();

        $.ajax({
            type: "POST",
            data: params,
            cache: false,
            url: 'loket/trx2.php',
            success: function (res) {
                //$('#hasilbelipulsa').html(res),
                $('#divloading').html(''),
                    $("#divLoading").hide(),
                    $('#nohp').val(''),
                    proses = false,
                    $('#listgame').html('');

                $.gritter.add({
                    title: 'Report',
                    text: res,
                    class_name: 'gritter-success '
                });
            }
        })

    }
    else {

        alert('mohon tunggu');
    }



}

var grafiktrx = () => {

    if (window.location.pathname == '/home') {
        $.ajax({
            type: "POST",
            cache: false,
            dataType: 'json',
            url: 'api/grafiktrx',
            success: function (res) {
                if (res.success) {
                    var bulan = new Array();
                    bulan[1] = "Januari"; bulan[2] = "Februari"; bulan[3] = "Maret"; bulan[4] = "April"; bulan[5] = "Mei"; bulan[6] = "Juni"; bulan[7] = "Juli"; bulan[8] = "Agustus"; bulan[9] = "September"; bulan[10] = "Oktober"; bulan[11] = "Nopember"; bulan[12] = "Desember";

                    var d = new Date();
                    var n = parseInt(d.getMonth())+1;
                    new Highcharts.Chart({
                        chart: {
                            renderTo: 'sales-charts',
                            type: 'spline',
                        },
                        title: {
                            text: 'Total Transaksi Bulan ' + bulan[n] + " " + d.getFullYear(),
                            x: -20
                        },
                        subtitle: {
                            text: '',
                            x: -20
                        },
                        xAxis: {
                            categories: res.tanggal
                        },
                        yAxis: {
                            title: {
                                text: 'Jumlah Transaksi'
                            }
                        },
                        series: [{
                            name: 'Tanggal',
                            data: res.total
                        }]
                    });
                }
            }
        });

    }


}

var statistik = () => {
    if (window.location.pathname == '/home') {
        $.ajax({
            type: "POST",
            cache: false,
            dataType: 'json',
            url: 'api/statistik',
            success: function (res) {
                $("#home-total-trx").html(todesimal(res.jmltrx));
                $("#home-total-omset").html(todesimal(res.omset));
                $("#home-total-komisi").html(todesimal(res.komisi));
                $("#home-total-poin").html(todesimal(res.poin));
                $("#home-total-agen").html(todesimal(res.jmldownline));
            }
        });
    }
}


if (window.location.pathname == '/home') {

    $('#home').addClass('active');

}

if (window.location.pathname == '/trxpulsa') {

    $('#menupembelian').addClass('active open');
    $('#menutrxpulsa').addClass('active');
}

if (window.location.pathname == '/trxgame') {

    $('#menupembelian').addClass('active open');
    $('#menutrxgame').addClass('active');
}

if (window.location.pathname == '/plnprepaid') {

    $('#menupembelian').addClass('active open');
    $('#menutrxtoken').addClass('active');
}

if (window.location.pathname == '/plnpasca') {

    $('#menupembayaran').addClass('active open');
    $('#menubayarpln').addClass('active');
}
if (window.location.pathname == '/telkom') {

    $('#menupembayaran').addClass('active open');
    $('#menubayartelkom').addClass('active');
}
if (window.location.pathname == '/bayarfinance') {

    $('#menupembayaran').addClass('active open');
    $('#menubayarfinance').addClass('active');
}
if (window.location.pathname == '/bayartv') {

    $('#menupembayaran').addClass('active open');
    $('#menubayartv').addClass('active');
}
if (window.location.pathname == '/bayarhp') {

    $('#menupembayaran').addClass('active open');
    $('#menubayarhppasca').addClass('active');
}

if (window.location.pathname == '/laptrx') {

    $('#menutrx').addClass('active open');
    $('#menulaptrx').addClass('active');
}

if (window.location.pathname == '/lapperproduk') {

    $('#menutrx').addClass('active open');
    $('#menulapperproduk').addClass('active');
}
if (window.location.pathname == '/bayarindv') {

    $('#menupembayaran').addClass('active open');
    $('#menubayarindv').addClass('active');
}

if (window.location.pathname == '/bayarpdam') {

    $('#menupembayaran').addClass('active open');
    $('#menubayarpdam').addClass('active');
}

if (window.location.pathname == '/bayarbpjs') {

    $('#menupembayaran').addClass('active open');
    $('#menubayarbpjs').addClass('active');
}

if (window.location.pathname == '/bayarhalo') {

    $('#menupembayaran').addClass('active open');
    $('#menubayarhalo').addClass('active');
}
if (window.location.pathname == '/mutasideposit') {

    $('#menudeposit').addClass('active open');
    $('#menumutasideposit').addClass('active');
}
if (window.location.pathname == '/listtransfer') {

    $('#menudeposit').addClass('active open');
    $('#menulisttransfer').addClass('active');
}
if (window.location.pathname == '/deposit') {

    $('#menudeposit').addClass('active open');
    $('#menutambahdeposit').addClass('active');
}
if (window.location.pathname == '/transfer') {

    $('#menudeposit').addClass('active open');
    $('#menutransferdeposit').addClass('active');
}

if (window.location.pathname == '/inbox') {

    $('#menupesan').addClass('active open');
    $('#menuinbox').addClass('active');
}

if (window.location.pathname == '/outbox') {

    $('#menupesan').addClass('active open');
    $('#menuoutbox').addClass('active');
}

if (window.location.pathname == '/daftarharga') {

    $('#menudaftarharga').addClass('active');
}
if (window.location.pathname == '/downline') {

    $('#menudownline').addClass('active open');
    $('#menulistdownline').addClass('active');
}
if (window.location.pathname == '/regrs') {

    $('#menudownline').addClass('active open');
    $('#menulistdownline').addClass('active');
}

if (window.location.pathname == '/downlinenew') {

    $('#menudownline').addClass('active open');
    $('#menulistdownline').addClass('active');
}

if (window.location.pathname == '/stokunit') {

    $('#menustokunit').addClass('active');
}

function todesimal(angka) {
    var isminus = false;
    if (parseInt(angka) < 0) {

        angkax = angka.toString().replace('-', '');
        isminus = true;
    } else {
        angkax = angka;
    }

    var rev = parseInt(angkax, 10).toString().split('').reverse().join('');
    var rev2 = '';
    for (var i = 0; i < rev.length; i++) {
        rev2 += rev[i];
        if ((i + 1) % 3 === 0 && i !== (rev.length - 1)) {
            rev2 += '.';
        }
    }

    if (isminus) {
        return '<span style="color:red;">(' + rev2.split('').reverse().join('').toString() + ')</span>';
    } else {
        return '<span style="color:green;">' + rev2.split('').reverse().join('').toString() + '</span>';
    }
}

function refreshpricelist() {


    $('#divloading').show();
    $.fn.dataTable.ext.errMode = 'none';
    $('#tabledaftarharga').on('error.dt', function (e, settings, techNote, message) {
        //window.location = "/login/x";
    }).dataTable({
        "aLengthMenu": [
            [-1],
            ["All"]
        ],
        "iDisplayLength": -1,
        "bProcessing": true,
        "bJQueryUI": false,
        "bSortClasses": false,
        "bDestroy": true,
        "bServerSide": true,
        "bFilter": true,
        "sAjaxSource": "api/pricelist",
        "columnDefs": [
            { "visible": false, "targets": 0 }
        ],
        "aoColumns": [
            { "bSortable": false, "sWidth": "10px" },
            { "bSortable": false, "sWidth": "50px" },
            { "bSortable": false, "sWidth": "80px" },
            { "bSortable": false, "sWidth": "10px" },
            { "bSortable": false, "sWidth": "50px" },
            { "bSortable": false, "sWidth": "50px" }
        ],
        "fnServerParams": function (aoData) {

        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td:eq(2)', nRow).html("<span style='float:right'>" + todesimal(aData[3]) + "</span>");
            $('td:eq(3)', nRow).html("<span style='float:right'>" + todesimal(aData[4]) + "</span>");
        },
        "drawCallback": function (settings) {
            var api = this.api();
            var rows = api.rows({ page: 'current' }).nodes();
            var last = null;

            api.column(0, { page: 'current' }).data().each(function (group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr class="grouptable"><td colspan="5">' + group + '</td></tr>'
                    );
                    last = group;
                }
            });
        }
    });
    $('#divloading').hide();
}

if (window.location.pathname == '/daftarharga') {
		$.ajax({
			headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
			type: "GET",
			cache: true,
			dataType: 'json',
			url: 'api/pricelist',
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
	

}

if (window.location.pathname == '/stokunit') {
    $.ajax({
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        type: "GET",
        cache: true,
        dataType: 'json',
        url: 'api/pricelist',
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


}



function logout() {

    bootbox.confirm({
        title: "Konfirmasi",
        message: "Yakin Akan Logout?",
        buttons: {
            confirm: {
                label: 'Logout',
                className: 'btn-small btn-success'
            },
            cancel: {
                label: 'Batal',
                className: 'btn-small btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                localStorage.clear();
                window.location = "/login";
            }
        }
    });
}

function cekkomisi() {

    $.ajax({
        type: "GET",
        url: 'api/cekkomisi',
        dataType: 'json',
        cache: false,
        success: function (data) {
            if (data.login == false) {
                localStorage.clear();
                window.location = "/login";
            } else {
                $('#totalkomisi').html(todesimal(data.komisi));
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}

function ceksaldo() {
    $.ajax({
        type: "GET",
        url: 'api/ceksaldo',
        dataType: 'json',
        cache: false,
        success: function (data) {
            
            if (data.login == false) {
                if (window.location.pathname != '/daftarharga') {
                    localStorage.clear();
                    window.location = "/login";
                }
            } else {
                $('#infosaldo').html(data.saldo);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });

}
var auto_refreshsaldo = setInterval(function () {
    ceksaldo();
}, 30000);

$(function () {
    /*
    $('#slideshow').owlCarousel({
        loop: true,
        nav: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navText: [
            '<svg class="nc-icon outline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="42px" height="42px" viewBox="0 0 32 32"> <polyline fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" points="23,30 9,16 23,2 "></polyline> </svg>',
            '<svg class="nc-icon outline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="42px" height="42px" viewBox="0 0 32 32"> <polyline fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" points="9,2 23,16 9,30 "></polyline> </svg>'
        ],
    });
    */
});


$('.product_list_pulsa li.operator-tab .provider__item').click(function () {
    $('.product_list_pulsa li.operator-tab .provider__item').removeClass('active');
    $('.product_list_paketdata li.paket-tab .provider__item').removeClass('active');
    $(this).addClass('active');
});
$('.product_list_paketdata li.paket-tab .provider__item').click(function () {
    $('.product_list_paketdata li.paket-tab .provider__item').removeClass('active');
    $('.product_list_pulsa li.operator-tab .provider__item').removeClass('active');
    $(this).addClass('active');
});
$('.product_list_tokenpln li.operator-tab .provider__item').click(function () {
    $('.product_list_tokenpln li.operator-tab .provider__item').removeClass('active');
    $(this).addClass('active');
});
$('.product_list_voucher_game li.operator-tab .game-voucher__item').click(function () {
    $('.product_list_voucher_game li.operator-tab .game-voucher__item').removeClass('active');
    $(this).addClass('active');
});

$('.telkom_list_product li.operator-tab .provider__item').click(function () {
    $('.telkom_list_product li.operator-tab .provider__item').removeClass('active');
    $(this).addClass('active');
});
$('.product_list_tv li.operator-tab .tv__item').click(function () {
    $('.product_list_tv li.operator-tab .tv__item').removeClass('active');
    $(this).addClass('active');
});