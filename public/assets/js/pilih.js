$(".pilihbutton").click(function(){
		
				var ID = $(this).attr("id");
				
				
				var flight_id = $("#flight_id_"+ID).val();
				var tanggalpergi = $("#date_"+ID).val();
				//var tanggalbalik = $("#retdate_"+ID).val();
				//var tujuan = $("#ret_flight_id_"+ID).val();
				var xtoken = $("#token_"+ID).val();

				$('#hasil').html('');
				
					var params = {
						aksi: "get_flight_data",
						flight_id: flight_id,
						tanggalpergi: tanggalpergi,
						token: xtoken
						//tanggalbalik: $('#tanggalbalik').val(),
						//dewasa: $('#dewasa').val(),
						//anak: $('#anak').val(),
						//bayi: $('#bayi').val()
					};
				
				$.ajax({
					type: "POST",
					url: "booking/tiket_api_proses.php",
					data: params,
					cache: false,
					beforeSend: function(resku) {
						document.getElementById("flight_data").innerHTML = '';
						$("#divLoading").show();
						$("#divLoading").html('<div style="float:left;font-size:13px;font-family:Open Sans;"><span style="font-size:25px;font-weight:400;color:#333333;">Mohon tunggu...</span><div style="font-size:13px;font-weight:400;color:#333333;margin-top:10px;">sistem sedang periksa harga dan ketersediaan seat</div><div class="progress" style="margin-top:10px;width:400px;"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%"></div></div></div>');
					},

					success: function(res){
							$("#divLoading").hide();
							$("#flight_data").show();
							$("#flight_data").append(res);
						}
				});

				
				return false;
		
		});