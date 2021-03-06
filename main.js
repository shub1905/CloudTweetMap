//Initialize
function normalMapInitialize() {
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    }
    var map = new google.maps.Map(mapCanvas, mapOptions)
};

//Initialize
var map, heatmap;
var pointArray = new google.maps.MVCArray();


function heatMapInitialize() {
    // the map's options
    var mapOptions = {
        zoom: 1,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    // the map and where to place it
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // what data for the heatmap and how to display it
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
        radius: 25
    });
    // placing the heatmap on the map
    heatmap.setMap(null);

    heatmap.setMap(map);
}

category = "elections";

function temp(category) {

    //pointArray=[]
    //category = document.getElementById('keywords').value;  
    $.get("/api/getAllTweets/" + category, function(data, status) {
        pointArray = [];
        for (i in data) {
            // var tweetLocation = new google.maps.LatLng(data[i]['lat'], data[i]['long']);
            //console.log(tweetLocation);
            if (data[i].sentiment = "positive")
                var image = "http://www.clker.com/cliparts/8/6/U/z/k/o/google-maps-marker-for-residencelamontagne-hi.png";
            else if (data[i].sentiment = "negative")
                var image = "http://www.clker.com/cliparts/R/K/r/C/f/o/red-marker-black-border-hi.png";
            else
                var image = "http://www.clker.com/cliparts/m/S/e/W/G/y/yellow-marker-black-border-hi.png";

            var tweetloc = new google.maps.LatLng(data[i]['lat'], data[i]['long']);
            pointArray.push(tweetloc);
            var marker = new google.maps.Marker({
                position: tweetloc,
                icon: image,
                map: map
            });
        }
        google.maps.event.addDomListener(window, 'load', heatMapInitialize());
    });

    // if (io !== undefined) {
    //     console.log("\nhi begin");
        // Storage for WebSocket connections
        // var socket = io.connect('/');
        //var use = socket.socket;
        // This listens on the "twitter-steam" channel and data is 
        // received everytime a new tweet is receieved.
        /*use.on('connect_failed', function(){
        console.log('Connection Failed');
        });*/
        //   socket.on('twitter-stream', function(data){
        //           //Add tweet to the heat map array.
        //           var category1= data.cat;
        //           var geo= data.geo;
        //           console.log('got new Data'+  category1 +' '+category);
        //           if (category1 == category){
        //               console.log(data.geo);

        // if(data.sentiment = "positive")    
        //   var image = "http://www.clker.com/cliparts/8/6/U/z/k/o/google-maps-marker-for-residencelamontagne-hi.png";
        // else if(data.sentiment = "negative")
        //   var image = "http://www.clker.com/cliparts/R/K/r/C/f/o/red-marker-black-border-hi.png" ; 
        // else 
        //   var image = "http://www.clker.com/cliparts/m/S/e/W/G/y/yellow-marker-black-border-hi.png" ; 

        //               var tweetloc = new google.maps.LatLng( geo["lat"],geo["lng"]);
        //               var marker = new google.maps.Marker({
        //               position: data.geo,
        // icon : image ,
        //               map: map
        //           });
        //           //pointArray.push(tweetloc);  
        //           //google.maps.event.addDomListener(window, 'load', heatMapInitialize());
        //           }
        //         //Flash a dot onto the map quickly
        //         //var image = "css/small-dot-icon.png";


        //   });
    // };

    //console.log(pointArray);
    /*var trends=[]
    var sentiment=[]
    var mydiv=document.getElementById('trending');
    var newcontent = document.createElement('div');
    mydiv.innerHTML='';
    $.get("/api/getTrends/"+category,function(data,status){
        console.log(data);
          for (i in data){
              console.log(data[i]);
            trends[i]= data[i]['trend'];
            sentiment[i]=data[i]['senti'];
            if (trends[i].length<2) continue;
            newcontent.innerHTML = "<b>"+trends[i]+"</b><br/><i> "+sentiment[i]+"</i><br><hr>";
            while (newcontent.firstChild) {
            mydiv.appendChild(newcontent.firstChild);
        }
    }


        

    });
        
    */


};

//marker.setMap(null)
/*setTimeout(function(){
  marker.setMap(null);
},20000);*/