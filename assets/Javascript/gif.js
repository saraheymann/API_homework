var topics = ['Betty Boop', 'Jem', 'Ren', 'Stimpy'];

		function getCartoon(){
			$("#gifView").empty();
			var cartoonName = $(this).data("name");
			var limit = 10;
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoonName + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";
			$.ajax({
          		url: queryURL,
          		method: "GET"
        	}).done(function(response) {
        	console.log(response.data)
        	for(var i = 0; i < response.data.length; i++){
				var div = $('<div>');
				var img = $("<img>");
				var p = $('<p>');
				p.text('Rating: ' + response.data[i].rating);
				div.attr('class', 'gifDiv');
				img.attr('class', 'gif')
				img.attr('data-state', 'still');
				img.attr('data-still', response.data[i].images.fixed_width_still.url);
				img.attr('data-animate', response.data[i].images.fixed_width.url);
				img.attr('src', response.data[i].images.fixed_width_still.url);
				div.append(p, img);
				$("#gifView").append(div);
			}
   //      	

        })
		}

		function makeButtons(){
			$("#buttonsZone").empty();
			for (var i = 0; i < topics.length; i++) {
				var addButtonTag = $("<button>");
				addButtonTag.addClass("cartoonName");
				addButtonTag.attr("data-name", topics[i]);
				addButtonTag.text(topics[i]);
				$("#buttonsZone").append(addButtonTag);

			}
		}

		$("#addGif").on("click", function(event) {
	        event.preventDefault();
			var cartoon = $("#gifInput").val().trim();
			topics.push(cartoon);
			makeButtons();
        });

        $(document).on("click", ".cartoonName", getCartoon);
        makeButtons();

        $(document).on('click', '.gif', function(){
			var state = $(this).attr('data-state');
			var still = $(this).attr('data-still');
			var animate = $(this).attr('data-animate');
			if(state === 'still'){
				$(this).attr('data-state', 'animate');
				$(this).attr('src', animate);
			} else{
				$(this).attr('data-state', 'still');
				$(this).attr('src', still);
			}
		});