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
    const DOMInputs = UICtrl.inputField(); // get input field object ref
    const SHUFFLE = true;
    const DEVMODE = false;
    const TRACKSBYGAME = 40;
    var tracks = {};
    var isPlaying = false;
    var answers = [];
    var score = 0;
    var playedTracks = 0;
    var z = String.fromCharCode;
    var audioPlayer = document.getElementById("audio_player");
    var jsAudioPlayer = $('.js-audio-player');
    var soundRight = new Audio('assets/right.m4a');
    var soundWrong = new Audio('assets/wrong.m4a');
    // Data
    var playersData = [
        [z(80, 105, 101, 114, 114, 101), [0, 1, 2, 3, 4]],
        [z(71, 97, 117, 116, 105, 101, 114), [5, 6, 7, 8, 9]],
        [z(78, 97, 100, 232, 103, 101), [10, 11, 12, 13, 14]],
        [z(201, 109, 105, 108, 105, 101), [15, 16, 17, 18, 19]],
        [z(84, 97, 114, 105, 113), [20, 21, 22, 23, 24]],
        [z(77, 97, 114, 105, 101), [25, 26, 27, 28, 29]],
        [z(66, 114, 117, 110, 111), [30, 31, 32, 33, 34]],
        [z(74, 233, 114, 244, 109, 101), [10, 35, 36, 37, 38]],
        [z(65, 108, 105, 115, 111, 110), [39, 40, 41, 42, 43]],
        [z(84, 111, 110, 121), [10, 44, 45, 46, 47]],
        [z(74, 66), [48, 49, 50, 51, 52]],
        [z(67, 233, 100, 114, 105, 99, 32, 82, 46), [53, 54, 55, 56, 57]],
        [z(84, 105, 109, 111, 116, 104, 233, 101), [58, 59, 60, 61, 62]],
        [z(79, 108, 105, 118, 105, 101, 114), [63, 64, 65, 66, 67]],
        [z(67, 233, 100, 114, 105, 99, 32, 77, 46), [68, 69, 70, 71, 72]],
        [z(71, 117, 105, 108, 108, 97, 117, 109, 101), [73, 74, 75, 76, 77]],
        [z(87, 97, 108, 105, 100), [78, 79, 80, 81, 82]],
        [z(74, 117, 108, 101, 115), [83, 84, 85, 86, 87]],
        [z(70, 97, 98, 105, 101, 110), [88, 89, 90, 91, 92]],
    ];
    var playersDataBuild = JSON.parse(JSON.stringify(playersData));
    var tracksByPlayer = Math.floor(TRACKSBYGAME / playersData.length);
    var playersAmount = playersData.length;
    var playerIndexes = [...Array(playersAmount+1).keys()];
    var setList = [];
    var tracksIndexes = [];
    var setListLength = 0;
    var minScore = 0;

    function buildSetlist() {
        if(SHUFFLE) {
            // Shuffle players tracks index
            for(player in playersDataBuild) {
                playersDataBuild[player][1] = shuffleArray(playersDataBuild[player][1]);
            }
            // Shuffle players
            playersDataBuild = shuffleArray(playersDataBuild);
            /*console.log(playersDataBuild);*/
        }

        playerIndexes.pop();

        // Build setlist from players traks
        for(player in playersDataBuild) {
            if(DEVMODE) {
                // ALL TRACKS
                for(track in playersDataBuild[player][1])
                    setList.push([playersDataBuild[player][0], playersDataBuild[player][1][track]]);
            }
            else {
                // N TRACKS BY PLAYER
                for(let i=0; i<tracksByPlayer; i++) {
                    // var index = i;
                    // var trackIndex = playersDataBuild[player][1][index];
                    if(playersDataBuild[player][1].length == 0)
                        break;
                    addToSetlist(playersDataBuild[player]);
                }
            }
        }
        // Remainder tracks to fill setlist
        while(setList.length < TRACKSBYGAME && setList.length < tracks.items.length && playersDataBuild.length > 0) {
            playersDataBuild = shuffleArray(playersDataBuild);
            if(playersDataBuild[0][1].length == 0) {
                playersDataBuild.shift();
            }
            else {
                addToSetlist(playersDataBuild[0]);
            }
        }
        if(SHUFFLE) {
            setList = shuffleArray(setList);
        }
        setListLength = setList.length;
        minScore = setListLength - setListLength / 5;
        $('#wrapper').addClass('initialized');
    }

    function addToSetlist(player) {
        var playerName = player[0];
        var trackIndex = player[1].pop();
        // Check if track is already in array (avoid having same track more than 1 time in case of track chosen by multiple players)
        if(tracksIndexes.includes(trackIndex)) {
            return;
            // trackIndex = player[1].pop();
        }
        tracksIndexes.push(trackIndex);
        var data = [playerName, trackIndex];
        setList.push(data);
    }

    // get playlist on page load
    const loadPlaylist = async () => {
        //get the token
        const token = await APICtrl.getToken();           
        //store the token onto the page
        UICtrl.storeToken(token);
        //get playlist
        tracks = await APICtrl.getPlaylist(token);
        if(DEVMODE) {
	        for(track of tracks.items) {
	            console.log(tracks.items.indexOf(track) + 1);
	            console.log(track.track.preview_url);
	            console.log(track.track.id);
	            console.log('----------');
	        }
	    }
        buildSetlist();
        /*console.log(tracks);*/
        // totalTracks = tracks.total;
    }

    DOMInputs.playTrackButton.addEventListener('click', async (e) => {
        $('.js-wrapper').removeClass('game_ended');
        $('.js-wrapper').addClass('game_started');
        $('.js-score-wrapper').addClass('visible');
        playTrack();
    });

    $('.js-replay-game').click(function() {
        score = 0;
        updateScore(score);
        setList = [];
        tracksIndexes = [];
        playedTracks = 0;
        playersDataBuild = JSON.parse(JSON.stringify(playersData));
        buildSetlist();
        $('.js-word').text('').hide();
        $('.js-not-enough').hide();
        $('.js-wrapper').removeClass('game_ended');
        $('.js-wrapper').addClass('game_started');
        $('.js-score-wrapper').addClass('visible');
        playTrack();
    });

    const playTrack = async () => {
        // Reset board        
        $('.js-answer').removeClass('correct');
        $('.js-answer').removeClass('incorrect');
        // Update track number
        playedTracks += 1;
        updateTrackNumber();
        // Track indexes
        /*var index0 = Math.floor(Math.random() * totalTracks);*/
        var currentData = setList.shift();
        var index0 = currentData[1];
        var index = index0 + 1;
        index = index < 10 ? "00" + index : index < 100 ? "0" + index : index;
        // Track preview
        var trackPreview = "assets/previews/" + index + ".mp3";        
        jsAudioPlayer.attr('src', trackPreview);
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
        while(answers.length < 4 && counter < playersAmount) {
            var currentName = playersData[playerIndexes[counter]][0];
            // Don't display other players that also chose current song to avoid confusion
            if(currentName != currentData[0] && !playersData[playerIndexes[counter]][1].includes (index0)) {
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
        audioPlayer.play();
        isPlaying = true;        
        $('.js-answers').addClass('playing');
    }

    jQuery('.js-answer').on('click', function() {
        var that = $(this);
        if(!isPlaying)
            return;
        isPlaying = false;
        audioPlayer.pause();
        $('.js-answers').removeClass('playing');
        var answerIndex = that.attr('data-index');
        var result = answers[answerIndex][1];
        if(result) {
           that.addClass('correct');
            soundRight.pause();
            soundRight.currentTime = 0;
            soundRight.play();
           score += 1;
           updateScore();
        }
        else {
            soundWrong.pause();
            soundWrong.currentTime = 0;
            soundWrong.play();
           that.addClass('incorrect');
        }
        setTimeout(function() {
            if(setList.length > 0)
                playTrack();
            else 
                endGame();
        }, 1000);

    });

    jsAudioPlayer.on('timeupdate', function(event) {
        if(isPlaying)
          audioPlayer.play();
    });

    function endGame() {
        if(score >= minScore)
            displayWord();
        else
            $('.js-not-enough').show();
        var result = getRank(score);
        $('.js-rank').text(result[0]);
        $('.js-message').text(result[1]);
        $('.js-wrapper').removeClass('game_started');
        $('.js-wrapper').addClass('game_ended');
        $('.js-score-wrapper').removeClass('visible');
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

    function updateTrackNumber() {
        $('.js-track-number').text(playedTracks);
    }

    function updateScore() {
        $('.js-score').text(score);
    }

    function getRank(score) {
        if(score < setListLength / 8 ) // < 5
            return ["Déserteur", "Il vaut mieux être triste qu'à perte."];
        else if(score < setListLength / 4) // < 10
            return ["Client Maladroit", "\"Dites, je crois que je viens de dépublier ma homepage.\""];
        else if(score < setListLength / 2 - setListLength / 8) // < 15
            return ["Développeur Wordpress", "Pourquoi faire de la qualité quand on peut faire du Wordpress ?"];
        else if(score < setListLength / 2) // < 20
            return ["Vapoteur Clandestin", "Pour information les zones vertes c'est le couloir et la salle de réunion."];
        else if(score < setListLength / 2 + setListLength / 8) // < 25
            return ["Afficionado du télétravail", "C'est bien, mais il faudrait penser à passer au bureau de temps en temps."];
        else if(score < setListLength - setListLength / 4) // < 30
            return ["Collègue débonnaire", "Parce que notre propre bonheur commence avec celui des autres."];
        else if(score < setListLength - setListLength / 5) // < 32
            return ["Pull en preprod", "Encore un petit effort et on sera bons pour le passage en prod."];
        else if(score < setListLength - setListLength / 20) // < 38
            return ["Happiness Manager", "Félicitations, c'est une victoire bien méritée."];
        else if(score < setListLength) // < 40
            return ["Mise en ligne un vendredi sans accrocs", "D'aucuns diront que c'est un miracle."];
        else if(score == setListLength) // = 40
            return ["Manifestation Divine", "Les astres chantent les louanges du propriétaire de ce score parfait."];
        else
            return ["", ""];
    }

    function displayWord() {
        $('.js-word').text(z(81, 85, 79, 76, 73, 66, 69, 84)).show();
    }

    return {
        init() {
            updateScore(score);
            loadPlaylist();
        }
    }

})(UIController, APIController);

APPController.init();
