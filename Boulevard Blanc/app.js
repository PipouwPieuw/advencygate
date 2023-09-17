const APIController = (function() {
    
    const clientId = '86ddfb1371f440288486fd86d5553b6b';
    const clientSecret = 'c825f76ad62e4a7e8b3406607895ee0a';


    // private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }

    const _getPlaylist = async(token) => {
        const result = await fetch('https://api.spotify.com/v1/playlists/7edOPc7LMFwDFCehwI9TS2?market=FR', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        const data = await result.json();
        /*console.log(data.tracks);*/
        return data.tracks;
    }

    return {
        getToken() {
            return _getToken();
        },
        getPlaylist(token) {
            return _getPlaylist(token);
        }
    }
})();


// UI Module
const UIController = (function() {

    //object to hold references to html selectors
    const DOMElements = {
        hfToken: '#hidden_token',
        playTrackButton: '.js-play-track'
    }

    //public methods
    return {

        //method to get input fields
        inputField() {
            return {
                playTrackButton: document.querySelector(DOMElements.playTrackButton)
            }
        },
        
        storeToken(value) {
            document.querySelector(DOMElements.hfToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMElements.hfToken).value
            }
        }
    }

})();

const APPController = (function(UICtrl, APICtrl) {
    var tracks = {};
    var totalTracks = 0;
    var tracksByPlayer = 5;
    var isPlaying = false;
    var answers = [];
    var score = 0;
    var audioPlayer = $('.js-audio-player');
    var soundRight = new Audio('assets/right.m4a');
    var soundWrong = new Audio('assets/wrong.m4a');

    // Data
    var playersData = [
        ["Pierre", [0, 1, 2, 3, 4]],
        ["Gautier", [5, 6, 7, 8, 9]],
        ["Nadège", [10, 11, 12, 13, 14]],
        /*["Anthony", [15, 16, 17, 18, 19]],
        ["Jérôme", [20, 21, 22, 23, 24]]*/
    ];
    var playersAmount = playersData.length;
    var playerIndexes = [...Array(playersAmount+1).keys()];
    playerIndexes.pop();

    // get input field object ref
    const DOMInputs = UICtrl.inputField();

    // Build setlist from players traks
    var setList = [];
    for(player in playersData) {
        randIndex = Math.floor(Math.random() * tracksByPlayer);
        var data = [playersData[player][0], playersData[player][1][randIndex]]
        setList.push(data);
    }
    /*console.log(setList);*/

    // get genres on page load
    const loadPlaylist = async () => {

        //get the token
        const token = await APICtrl.getToken();           
        //store the token onto the page
        UICtrl.storeToken(token);
        //get the genres
        tracks = await APICtrl.getPlaylist(token);
        /*for(track of tracks.items) {
            console.log(tracks.items.indexOf(track) + 1);
            console.log(track.track.preview_url);
            console.log(track.track.id);
            console.log('----------');
        }*/
        totalTracks = tracks.total;
    }

    DOMInputs.playTrackButton.addEventListener('click', async (e) => {
        $('.js-wrapper').addClass('game_started');
        playTrack();
    });


    const playTrack = async () => {
        // Reset board        
        $('.js-answer').removeClass('correct');
        $('.js-answer').removeClass('incorrect');
        // Track indexes
        /*var index0 = Math.floor(Math.random() * totalTracks);*/
        var currentData = setList.shift();
        var index0 = currentData[1];
        var index = index0 + 1;
        index = index < 10 ? "00" + index : index < 100 ? "0" + index : index;
        // Track preview
        var trackPreview = "assets/previews/" + index + ".mp3";        
        audioPlayer.attr('src', trackPreview);
        // Track image
        var image = tracks.items[index0].track.album.images[1].url;
        $('.js-cover').attr('src', image);
        // Track name
        var name = tracks.items[index0].track.name;
        $('.js-name').text(name);
        // Track artists
        var artists = tracks.items[index0].track.artists;
        var artistsText = "";
        for(artist in artists) {
            artistsText += artists[artist].name + ", ";
        }
        artistsText = artistsText.slice(0, -2);
        $('.js-artist').text(artistsText);
        // Set first answer
        answers = [[currentData[0], true]];    
        // Shuffle players indexes    
        playerIndexes = shuffleArray(playerIndexes);
        // Set false answers
        var counter = 0;
        while(answers.length < 4 && counter <= playersAmount) {
            var currentName = playersData[playerIndexes[counter]][0];
            if(currentName != currentData[0]) {
                answers.push([currentName, false]);                  
            }
            counter += 1;
        }
        // Shuffle answers
        answers = shuffleArray(answers);
        // Display answers
        $('.js-answer').each(function(index) {
            $(this).text(answers[index][0]);
        });
        // Play track
        audioPlayer[0].play();
        isPlaying = true;        
        $('.js-answers').addClass('playing');
    }

    jQuery('.js-answer').on('click', function() {
        if(!isPlaying)
            return;
        isPlaying = false;
        audioPlayer[0].pause();
        $('.js-answers').removeClass('playing');
        var answerIndex = $(this).attr('data-index');
        var result = answers[answerIndex][1];
        if(result) {
           $(this).addClass('correct');
            soundRight.pause();
            soundRight.currentTime = 0;
            soundRight.play();
           score += 1;
           updateScore(score);
        }
        else {
            soundWrong.pause();
            soundWrong.currentTime = 0;
            soundWrong.play();
           $(this).addClass('incorrect');
        }
        setTimeout(function() {
            if(setList.length > 0)
                playTrack();
            else 
                endGame();
        }, 1000);

    });

    function endGame() {
        $('.js-wrapper').removeClass('game_started');
        $('.js-wrapper').addClass('game_ended');
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function updateScore(score) {
        $('.js-score').text(score);
    }

    return {
        init() {
            updateScore(score);
            loadPlaylist();
        }
    }

})(UIController, APIController);

// will need to call a method to load the genres on page load
APPController.init();
