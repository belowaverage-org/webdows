new explorer.window()
.title('Deal or no Deal')
.resize(340, 510)
.callback(function() {
	var body = this.body;
	var win = this;
	
	var round = 10;
	var casestopick = 6;
	var pickMainCase = false;
	var dealOrNo = false;
	var deal = 0;

	var cases = {
		0:.01,
		1:1,
		2:5,
		3:10,
		4:25,
		5:50,
		6:75,
		7:100,
		8:200,
		9:300,
		10:400,
		11:500,
		12:750,
		13:1000,
		14:5000,
		15:10000,
		16:25000,
		17:50000,
		18:75000,
		19:100000,
		20:200000,
		21:300000,
		22:400000,
		23:500000,
		24:750000,
		25:1000000
	};
	body.append('<h3>Pick 1 Case</h3>');
	body.append('<hr>');
	$.each(cases, function(k, v) {
		body.append('<input style="width:100px;height:20px;" type="text" cid="'+k+'" value="'+v+'">');
	});
	body.append('<hr>');
	$.each(cases, function(k, v) {
		body.append('<button style="width:50px;height:20px;" cid="'+k+'">'+k+'</button>');
	});
	body.append('<hr><button disabled class="deal dnd">Deal</button><button disabled class="nodeal dnd">No Deal</button><span id="round" style="float:right;">Round: <span>10</span></span>');
	body.find('button').click(function() {
		if(!pickMainCase) { //Pick first case
			$(this).attr('disabled', true);
			pickMainCase = true;
			body.find('h3').text('Pick 6 more Cases');
		} else {
			if(round == 1) {
				if($(this).hasClass('deal')) { //DEAL!!
					new explorer.window()
					.title('Congradulations')
					.body.html('<h1>You won '+deal+'</h1>');
				} else { //No DEAL
					new explorer.window()
					.title('Congradulations')
					.body.html('<h1>You won '+body.find('input[cid='+$(this).attr('cid')+']').val()+'</h1>');
				}
			} else {//In Game
				if(casestopick > 0) { //Keep picking
					$(this).attr('disabled', true);
					casestopick--;
					if(casestopick > 0) { 
						body.find('h3').text('Pick '+casestopick+' more Cases');
					}
					body.find('input[cid='+$(this).attr('cid')+']').attr('disabled', true);
				}
				if((!dealOrNo && casestopick <= 0)) { //Make deal
					deal = 0;
					var cnt = 0;
					$.each(body.find('input'), function() {
						if($(this).attr('disabled') !== 'disabled') {
							deal = deal + $(this).val();
							cnt++;
						}
					});
					deal = cnt / deal;
					body.find('h3').text('Offer: '+deal);
					body.find('button.dnd').removeAttr('disabled');
					dealOrNo = true;
				}
				if(dealOrNo) { //Answer Deal
					if($(this).hasClass('deal')) { //DEAL!!
						new explorer.window()
						.title('Congradulations')
						.body.html('<h1>You won '+deal+'</h1>');
					} else if($(this).hasClass('nodeal')) { //No DEAL
						round--;
						if((round - 4) <= 1) {
							casestopick = 1;
						} else {
							casestopick = round - 4;
						}
						dealOrNo = false;
						body.find('h3').text('Pick '+casestopick+' more Cases');
						body.find('button.dnd').attr('disabled', true);
					}
					if(round == 1) {
						body.find('button.dnd.deal').removeAttr('disabled');
						body.find('h3').text('FINAL ROUND DOND: '+deal);
					}
				}
			}
		}
		body.find('#round span').text(round);
	});
});