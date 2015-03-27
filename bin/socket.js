module.exports = function(io){
	var Twitter = require('twitter');
	 
	var client = new Twitter({
		consumer_key: 'your consumer_key',
	    consumer_secret: 'your consumer_secret',
	    access_token_key: 'your access_token_key',
	    access_token_secret: 'your access_token_secret'

	});
	 
	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	    console.log(tweets);
	  }
	});
	/*var Twitter = require('node-tweet-stream')
	  , t = new Twitter({
	    consumer_key: 'your consumer_key',
	    consumer_secret: 'your consumer_secret',
	    token: 'your access_token_key',
	    token_secret: 'your access_token_secret'
	  })
	t.on('tweet', function (tweet) {
	  		socket.emit('news', tweet);
	  		//console.log('tweet received', tweet)
		})
	t.on('tweet', function (tweet) {
	  console.log('tweet received', tweet)
	})

	t.on('error', function (err) {
	  console.log('Oh no')
	})

	t.track('nodejs')
	t.track('pizza')
	*/
	// 5 minutes later
	//t.track('tacos')

	// 10 minutes later
	//t.untrack('pizza')
	/* GET home page. */

	io.on('connection', function (socket) {
		socket.emit("conection_status",{status:"Conectado"});
		socket.on("new_tweet",function(data){
			client.post('statuses/update', {status: data.mensaje},  function(error, tweet, response){
			  if(error) throw error;
		  		socket.emit('tweet_mandado', {status:"correcto"});

			  	console.log(tweet);  // Tweet body. 
			  	console.log(response);  // Raw response object. 
			});
		})
	  	//socket.emit('news', { hello: 'Conectó el socket' });
	  	/*client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response){
		  if(error) throw error;
	  		socket.emit('news', tweet);

		  	console.log(tweet);  // Tweet body. 
		  	console.log(response);  // Raw response object. 
		});
	  	/*socket.on('my other event', function (data) {
	    	console.log(data);
	  	});*/
	  	
	});

}
