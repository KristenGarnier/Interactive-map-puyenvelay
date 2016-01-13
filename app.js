$(function(){
	var infos,
	dummyText = "Cliquez sur les batiments rouges pour afficher les informations.";

	//carte SVG
	var s = Snap("#svg");
	Snap.load('cartePuy.svg', function(data){
		s.append(data);

		$('#iut, #prefecture, #crozatier').on('click', placeClick)

	});

	// EVENT HANDLER FOR CARTE
	var placeClick = function(e){
		if(infos[e.target.parentNode.id]){
			$('#template').removeClass('flipInX').addClass('flipOutX');

			setTimeout(function(){
				renderTemplate(infos[e.target.parentNode.id].title, infos[e.target.parentNode.id].body, infos[e.target.parentNode.id].img, template, '#template');
				$('#template').removeClass('flipOutX').addClass('flipInX');
			}, 500);

			$('.active').removeClass('active');
			$(this).addClass('active');
		} else {
			console.error('You clicked an unknow element');
			resetTemp();
		}


	}

	//HIDE SHOW BUTTONS
	$('#toggleButton').on('click', function(e){
		$('#Rues').toggle();
	});

	$('#reset').on('click', function(){
		resetTemp();
	});

	var resetTemp = function(){
		$('.active').removeClass('active');
		if($('#template div').hasClass('alert')){
			$('#template').removeClass('flipInX').addClass('tada');
			setTimeout(function(){
				$('#template').removeClass('tada');
			}, 500);
		} else {
			$('#template').removeClass('flipInX').addClass('flipOutX');
			setTimeout(function(){
				renderDummy(dummyText, dummyTemplate, '#template');
				$('#template').removeClass('flipOutX').addClass('flipInX');
			}, 500);
		}
	};

	// HANDLE BARS TEMPLATE
	var source   = $("#infos-template").html();
	var dummy    = $("#dummy-template").html();
	var template = Handlebars.compile(source);
	var dummyTemplate = Handlebars.compile(dummy);

	var renderTemplate = function(title, body, img, template, target){
		var context = {title: title, body: body, img: img};
		$(target).html(template(context));
	};
	var renderDummy = function(alert, template, target){
		var context = {alert: alert};
		$(target).html(template(context));
	};

	var init = function(){
		renderDummy(dummyText, dummyTemplate, '#template');
		fetchInfos();
	}

	// FETCHING JSON DOCUMENT

	var fetchInfos = function(){
		fetch('infos.json')
		.then(function(res){
			return res.json();
		})
		.then(function(res){
			infos = res;
		});
	}

	init();
});