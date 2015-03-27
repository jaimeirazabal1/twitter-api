  var socket = io.connect('http://localhost:3000');
  socket.on('news', function (data) {
    console.log(data);
    if (data.user) {

	    $("body").append("<div class=\"panel panel-default\">"+
		  "<div class=\"panel-body\">"+
		    "<b>Creado:</b>"+data.created_at+"<br>"+
		    "<b>Tweet:</b><p>"+data.text+"</p><br>"+
		 	"<p style='padding-left:20px;font-size:10px'>"+
		 		"<ul>"+
		 			"<li><b>Nombre:</b>"+data.user.name+"</li>"+
		 			"<li><b>Localización:</b>"+data.user.location+"</li>"+
		 			"<li><b>Url:</b>"+data.user.url+"</li>"+
		 		"</ul>"+
		 	"</p>"+
		  "</div>"+
		"</div>");
    };
    //socket.emit('my other event', { my: 'data' });
  });
  socket.on("conection_status",function(data){
  	console.log(data.status);
  })
  socket.on("tweet_mandado",function(data){
  	if (data.status == "correcto") {
  		alert("Tweet Mandado");
  		$("#tweet").val("");
  		$("#cant_caracteres").text(0)
  	};
  })
$(document).ready(function(){
	$("#cant_caracteres").text(140)
	$("#tweet").on("change keyup",function(){
		var cant_caracteres = 140 - $(this).val().length;
		$("#cant_caracteres").text(cant_caracteres)
	})
	$("#btn-twittear").on("click",function(){
		socket.emit("new_tweet",{mensaje:$("#tweet").val()})
	})
})