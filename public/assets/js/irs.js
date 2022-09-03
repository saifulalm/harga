$(function() {
	
	

 
 $("#forminqtoken").validate({
        ignore: null,
        ignore: 'input[type="hidden"]',
        rules: {
            idpel: {
                required: true
            }
        },
        messages: {
            idpel: "Masukan No Meter/IDPEL"
        }
    });


 $("#forminq").validate({
        ignore: null,
        ignore: 'input[type="hidden"]',
        rules: {
            idpel: {
                required: true
            }
        },
        messages: {
            idpel: "Masukan No ID PELANGGAN"
        }
    });
 $("#forminqpln").validate({
        ignore: null,
        ignore: 'input[type="hidden"]',
        rules: {
            idpel: {
                required: true
            }
        },
        messages: {
            idpel: "Masukan No ID PELANGGAN"
        }
    });
 $('#newtrxpulsa').click(function() {
 	
 	
 //	$('#newtrxpulsa').hide()
	$.ajax({
	cache: false,
	url: 'api/getreffloket',
	success: function(res1) {
			$('#reffclient').val(res1),
			formpulsa.nohp.focus()
		}
	})
	formpulsa.nohp.value='';
 	$('#selectproduk').select2('data', null)
	$('#hasilbelipulsa').html("");
 	
 });
 
 
 $('#bataltoken').click(function() {
	 
	$('#hasilinqtoken').html(''); 
	$('#hasilinqtoken').hide(); 
	$('#inq1').show();
	$('#nominal').val('');
	forminqtoken.nominal.value=''; 
	forminqtoken.idpel.value=''; 
	$('#pay1').hide();
	$('#cetak').hide();	
	forminqtoken.idpel.focus();
	$('#idpel').removeAttr('disabled');
	$('#inqtoken').attr('disabled','disabled');
	$.ajax({
	cache: false,
	url: 'api/getreffloket',
	success: function(res1) {
			$('#reffclient').val(res1),
			$('#inqtoken').removeAttr('disabled')
			
		}
	}) 
 });
 
 $('#bataltoken2').click(function() {
	 
	$('#hasilinqtoken').html(''); 
	$('#hasilinqtoken').hide(); 
	$('#inq1').show();
	$('#nominal').val('');
	forminqtoken.nominal.value=''; 
	forminqtoken.idpel.value=''; 
	$('#pay1').hide();
	$('#cetak').hide();	
	forminqtoken.idpel.focus();
	$('#idpel').removeAttr('disabled');
	$('#inqtoken').attr('disabled','disabled');
	$.ajax({
	cache: false,
	url: 'api/getreffloket',
	success: function(res1) {
			$('#reffclient').val(res1),
			$('#inqtoken').removeAttr('disabled')
			
		}
	})
 });
 
 $('#cleartoken').click(function() {
	
	$('#hasilinqtoken').html(''); 
	$('#hasilinqtoken').hide(); 
	forminqtoken.idpel.value=''; 
	$('#inq1').show();
	$('#pay1').hide();
	forminqtoken.idpel.focus();
	$('#idpel').removeAttr('disabled');
	$('#inqtoken').attr('disabled','disabled');
	$.ajax({
	cache: false,
	url: 'api/getreffloket',
	success: function(res1) {
			$('#reffclient').val(res1),
			$('#inqtoken').removeAttr('disabled')
			
		}
	})
 });
	
 $('#cetaktoken').click(function() {
	 
			Popup($('#hasilinqtoken').html());
	 
 });
 $('#cetaktelkom').click(function() {
	 
			Popup($('#hasilinq').html());
	 
 });
 $('#cetakpln').click(function() {
	 
			Popup($('#hasilinq').html());
	 
 });
 
    $('#nominal').select2({
	 allowClear: true,
        ajax: {
            url: "api/getproduktoken",
            dataType: 'json',
            quietMillis: 100,
            multiple: true,
            data: function(term, page) {
                return {
                    term: term,
                    page_limit: 20,
                    page: page
                }
            },
            results: function(data, page) {
                var myResults = [];
                var more = (page * 20) < data.total;
                $.each(data.kodeproduk, function(index, item) {
                    myResults.push({
                        id: item.kodeproduk,
                        text: item.kodeproduk
                    })
                });
                return {
                    results: myResults,
                    more: more
                };
             
            }
        }
    });





		$("#NamaOperator").select2();
		

		$('#prosesbelipulsa').click(function() {
			//alert("No.Pembeli harus diisi");
			if ($('#nohp').val()=='') {
				
				alert("No.Pembeli harus diisi");
				return false;
				
				};
			
			if (proses==false){
				
					 proses=true;
					 
					$('#prosesbelipulsa').val('Mohon Tunggu...');
					 $('#divloading').html('<img src="assets/css/images/loading2.gif" />');
					 $('#divloading').show();
					var params = {
						idtrx: $('#reffclient').val(),
						tujuan: $('#nohp').val(),
						kodeproduk: $('#selectproduk').val()
					};
					$.ajax({
						type: "POST",
						data: params,
						dataType: 'json',
						cache: false,
						url: 'api/trx',
						success: function(res) {
							 proses=false;
							if (res['success']==true){
								
									$('#hasilbelipulsa').html("<div class='alert alert-block alert-success'><b>"+res['msg']+"</b></div>");	
								
							}
							else
							{
								$('#hasilbelipulsa').html("<div class='alert alert-block alert-danger'>"+res['msg']+"</div>");	
							}
							
							
							 $('#divloading').html(''),
							 $('#prosesbelipulsa').val('Kirim')
							
						}
					})
			
			}
			else{
				
				alert('mohon tunggu');
			}
			
			
		});
		
		
		$('#prosesbelivoucher').click(function() {
			
			if ($('#nohpgame').val()=='') {
				
				alert("No.Pembeli harus diisi");
				return false;
				
				};
			
			if (proses==false){
				
					 proses=true;
					 
					$('#prosesbelivoucher').val('Mohon Tunggu...');
					 $('#divloading').html('<img src="assets/css/images/loading2.gif" />');
					 $('#divloading').show();
					var params = {
						idtrx: $('#reffclient').val(),
						tujuan: $('#nohpgame').val(),
						kodeproduk: $('#kodevoucher').val()
					};
					$.ajax({
						type: "POST",
						data: params,
						dataType: 'json',
						cache: false,
						url: 'api/trx',
						success: function(res) {
							 proses=false;
							if (res['success']==true){
								
									$('#hasilbelivouchergame').html("<div class='alert alert-block alert-success'><b>"+res['msg']+"</b></div>");	
								
							}
							else
							{
								$('#hasilbelivouchergame').html("<div class='alert alert-block alert-danger'>"+res['msg']+"</div>");	
							}
							
							
							 $('#divloading').html(''),
							 $('#prosesbelivoucher').val('Beli Voucher')
							
						}
					})
			
			}
			else{
				
				alert('mohon tunggu');
			}
			
			
		});
		

		$('#executegantipass').click(function() {
			$("#form-validate").hide();
			$("#divLoading").show();
			$("#divLoading").html('<div style="float:left;font-size:13px;font-family:Open Sans;"><span style="font-size:25px;font-weight:400;color:#333333;">Mohon tunggu...</span><div style="font-size:13px;font-weight:400;color:#333333;margin-top:10px;">Proses ganti password</div><div class="progress" style="margin-top:10px;width:275px;"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%"></div></div></div>');
			
			var params = {
				passwordlama: $('#password').val(),
				passwordbaru: $('#newpassword').val()
			};
			$.ajax({
				type: "POST",
				data: params,
				cache: false,
				url: 'prosesgantipass.php',
				success: function(res) {
					
					 $('#divLoading').html('<div><div>');
					 $('#divLoading').hide('');
					 $("#form-validate").show();
					 $('#newpassword').val(''),
					 $('#password').val(''),
					 $('#confirmnewpassword').val(''),
					 alert(res);
					 window.location="logout.php";
					
				}
			})
		});
		
		
});
    function Popup(data) 
    {
		  var left = (screen.width/2)-(700/2);
		  var top = (screen.height/2)-(300/2);	
        var mywindow = window.open('', 'my div', 'top='+top+', left='+left+'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no,height=300,width=700');
		mywindow.document.write('<html><head><title>Print Struk</title><link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css"></head><body style="margin: 0px;">')

        mywindow.document.write('<pre style="border:none">'+data+'</pre>');
       mywindow.document.write('</BODY></html>');

       // mywindow.document.close(); // necessary for IE >= 10	
       // mywindow.focus(); // necessary for IE >= 10

        mywindow.print();
        mywindow.close();

        return true;
    }
    
function pilihOperator(id){
	
	
        var params = {
            id: id
        };
		$.ajax({
			type: "POST",
			data: params,
			cache: false,
			url: 'api/getvgamedata',
			success: function(res) {
					$('#listgame').html(res).fadeIn(500);
				}
			})
		
	
	
	
	
	
	
	//$.ajax({
	//cache: false,
	//url: 'api/getvgamedata/id='+id,
	//success: function(res) {

	//		$('#listgame').html(res);
	//	}
		//$('#dvLoading').hide();
	//})
}

function bukaform(idvoucher){
	
	$('#reffclient').val(''),
	$('#divloading').show(),
	$('#gambargame').html('<img src="images/game/'+idvoucher+'.png"/>');
	$('#divloading').html('<img src="assets/css/images/loading2.gif" />');
	$('#prosesbelivoucher').hide(),
	$('#vouchergamemodal').modal({backdrop: 'static'}),
	$('#kodevoucher').val(idvoucher),
	$('#nohpgame').val(''),	 
	$('#hasilbelivouchergame').html(''),
	
	
	$.ajax({
	cache: false,
	url: 'api/getreffloket',
	success: function(res) {
			$('#reffclient').val(res),
			$('#divloading').html('<div><div>'),
			//$('#divloading').hide(),
			$('#prosesbelivoucher').show();
		}
	})
}
function reloadixtrx(){
	
	$.ajax({
	cache: false,
	url: 'api/getreffloket',
	success: function(res1) {
			$('#reffclient').val(res1)
			
			
		}
	})
	
	
}

function bukaformpulsa(fkodevoucher){
	
	var hp=$('#nohp').val();
	if (proses==false){
		
			if (!confirm('Apakah yakin akan diproses '+ fkodevoucher +'?')==true) return false;
			proses=true;
			var params = {
				idtrx: $('#reffclient').val(),
				tujuan: $('#nohp').val(),
				kodeproduk: fkodevoucher
			};
			$("#newtrxpulsa").show();
			//reloadixtrx();

			$.ajax({
				
				type: "POST",
				
				data: params,
				cache: false,
				dataType: 'json',
				url: 'api/trx',
				success: function(res) {
					//$('#hasilbelipulsa').html(res),
					 $('#divloading').html(''),
					 $("#divLoading").hide(),
					 $('#nohp').val(''),
					 proses=false,	
					 $('#listgame').html('');
					 
							if (res['success']==true){
								
								//	$('#hasilbelivouchergame').html("<div class='alert alert-block alert-success'><b>"+res['msg']+"</b></div>");	
							$.gritter.add({
								title: 'Report',
								text: res['msg'],
								class_name: 'gritter-success'	
							});
								
							}
							else
							{
								
								$.gritter.add({
									title: 'Report',
									text: res['msg'],
									class_name: 'gritter-warning'	
								});
								
								//$('#hasilbelivouchergame').html("<div class='alert alert-block alert-danger'>"+res['msg']+"</div>");	
							}
							
					 
					 




				
					
				}
			})
		
	}
	else
	{
		
			alert('mohon tunggu');
	}	
	
	

}
/* var cekmessage = setInterval(function() {
			$.ajax({
				type: "GET",
				cache: false,
				url: 'loket/message.php',
				success: function(res) {
					if (res!='NONE'){
							$.gritter.add({
								title: 'Report',
								text: res,
								sticky: true,
								class_name: 'gritter-info'	
							});
					}

				}
			})
}, 5000); */