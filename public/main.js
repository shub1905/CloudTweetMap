
//Initilize
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
    center: new google.maps.LatLng(0,0),
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

        //marker.setMap(null)
      /*setTimeout(function(){
        marker.setMap(null);
      },20000);*/


category="elections";
function temp(category) { 
    
//pointArray=[]
//category = document.getElementById('keywords').value;  
$.get("/api/getAllTweets/"+category,function(data, status){
    pointArray = [];
    for (i in data){
        //console.log(data[i]['geo']['coordinates']['0']);
    var tweetLocation = new google.maps.LatLng(data[i]['lat'],data[i]['long']);
        //console.log(tweetLocation);
        pointArray.push(tweetLocation);
    }
        heatMapInitialize();
});


};






