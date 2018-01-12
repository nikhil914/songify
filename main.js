
function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
     function updateCurrentTime() {
  var song = document.querySelector('audio');
  
 var currentTime = Math.floor(song.currentTime);
currentTime = fancyTimeFormat(currentTime);      
var duration = Math.floor(song.duration);
         duration = fancyTimeFormat(duration);
  $('.time-elapsed').text(currentTime);
  $('.song-duration').text(duration);
}
/*var songs = [
  {
    'name': 'Badri Ki Dulhania (Title Track)',
    'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
    'album': 'Badrinath ki Dulhania',
    'duration': '2:56',
   'fileName': 'song1.mp3',
    'image': 'song1.jpg'
  },
  {
    'name': 'Humma Song',
    'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
    'album': 'Ok Jaanu',
    'duration': '3:15',
    'fileName': 'song2.mp3',
    'image': 'song2.jpg'
  },
    
{
  'name': 'Nashe Si Chadh Gayi',
  'artist': 'Arijit Singh',
  'album': 'Befikre',
  'duration': '2:34',
  'fileName': 'song3.mp3',
  'image': 'song3.jpg'
},
 {
  'name': 'The Breakup Song',
  'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
  'album': 'Ae Dil Hai Mushkil',
  'duration': '2:29',
  'fileName': 'song4.mp3',
  'image': 'song4.jpg'
}
    
  
]*/

window.onload = function() {
    
    changeCurrentSongDetails(songs[0]);
  for(var i =0; i < songs.length;i++) {
    var obj = songs[i];
    var name = '#song' + (i+1);
    var song = $(name);
    song.find('.song-name').text(obj.name);
    song.find('.song-artist').text(obj.artist);
    song.find('.song-album').text(obj.album);
    song.find('.song-length').text(obj.duration);
    addSongNameClickEvent(obj,i+1)
  }
    
  updateCurrentTime();
  setInterval(function() {
    updateCurrentTime();
  },1000);
}
    $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
              fetchSongs() ;
        } else {
            $('#name-input').addClass('error');
        }
    });
        
   
        
    function addSongNameClickEvent(songObj,position) {
    var songName = songObj.fileName;
    var id = '#song' + position;
    $(id).click(function() {
      var audio = document.querySelector('audio');
      var currentSong = audio.src;
      if(currentSong.search(songName) != -1)
      {
        toggleSong();
      }
      else {
       audio.src = songName;
    toggleSong();
    changeCurrentSongDetails(songObj); 
      }
    });
}   /* 
for (var i = 1; i <= fileNames.length ; i++) {
    addSongNameClickEvent(fileNames[i-1],i)
} 

*/


        
         $('.main button').on('click', function() {
            $('.main ').addClass('hidden');
            $('.welcome-screen').removeClass('hidden');
           
        
    });
    $('.play-icon').on('click', function() {
        toggleSong();
        
    });
        

    $('body').on('keypress', function(event) {
                if (event.keyCode ==32) {
                 toggleSong();
                }
        if (event.keyCode ==112) {
                 toggleSong();
                }
            });
 
        
    function toggleSong() {
  var song = document.querySelector('audio');

  if(song.paused == true) {
    console.log('Playing');
    $('.play-icon').removeClass('fa-play').addClass('fa-pause');
    song.play();
   }
   else {
    console.log('Pausing');
    $('.play-icon').removeClass('fa-pause').addClass('fa-play');
    song.pause();
   }
} 
 function changeCurrentSongDetails(songObj) {
  $('.current-song-image').attr('src','img/' + songObj.image) ;
  $('.current-song-name').text(songObj.name) ;
  $('.current-song-album').text(songObj.album) ;
}
function setupApp() {
  changeCurrentSongDetails(songs[0]);

  setInterval(function() {
    updateCurrentTime() ;
  }) ;


  for(var i =0; i < songs.length;i++) {
    var obj = songs[i];
    var name = '#song' + (i+1);
    var song = $(name);
    song.find('.song-name').text(obj.name);
    song.find('.song-artist').text(obj.artist);
    song.find('.song-album').text(obj.album);
    song.find('.song-length').text(obj.duration);
    addSongNameClickEvent(obj,i+1) ;
  }
}
    
 // Empty the songs variable
    var songs = [] ;

  function fetchSongs() {

      $.ajax({
        'url': 'https://jsonbin.io/b/59f713154ef213575c9f652f',
        'dataType': 'json',
        'method': 'GET',
        'success': function (responseData) {
         songs = responseData ;
        setupApp() ;
          console.log(responseData) ;
        }
      }) ;

    }

   

   
    