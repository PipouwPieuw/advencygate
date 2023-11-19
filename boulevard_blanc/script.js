const APIController=function(){$(".js-back-link").on("click",function(){$("body").addClass("no_scroll"),$(".js-page-transition").addClass("visible");var e=0;$(".js-page-transition-item").each(function(){e+=100;var t=$(this);setTimeout(function(){t.addClass("visible")},e)}),setTimeout(function(){location.href="/advencygate"},1e3)});let e=String.fromCharCode(56,54,100,100,102,98,49,51,55,49,102,52,52,48,50,56,56,52,56,54,102,100,56,54,100,53,53,53,51,98,54,98),t=String.fromCharCode(99,56,50,53,102,55,54,97,100,54,50,101,52,97,55,101,56,98,51,52,48,54,54,48,55,56,57,53,101,101,48,97),r=async()=>{let r=await fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:"Basic "+btoa(e+":"+t)},body:"grant_type=client_credentials"}),a=await r.json();return a.access_token},a=async e=>{let t=await fetch("https://api.spotify.com/v1/playlists/7edOPc7LMFwDFCehwI9TS2?market=FR",{method:"GET",headers:{Authorization:"Bearer "+e}}),r=await t.json();return r.tracks};return{getToken:()=>r(),getPlaylist:e=>a(e)}}(),UIController=function(){let e={hfToken:"#hidden_token",playTrackButton:".js-play-track"};return{inputField:()=>({playTrackButton:document.querySelector(e.playTrackButton)}),storeToken(t){document.querySelector(e.hfToken).value=t},getStoredToken:()=>({token:document.querySelector(e.hfToken).value})}}(),APPController=function(e,t){let r=e.inputField();var a={},s=!1,n=[],_=0,i=0,o=String.fromCharCode,l=document.getElementById("audio_player"),u=$(".js-audio-player"),c=new Audio("assets/right.m4a"),d=new Audio("assets/wrong.m4a"),p=[[o(80,105,101,114,114,101),[0,1,2,3,4]],[o(71,97,117,116,105,101,114),[5,6,7,8,9]],[o(78,97,100,232,103,101),[10,11,12,13,14]],[o(201,109,105,108,105,101),[15,16,17,18,19]],[o(84,97,114,105,113),[20,21,22,23,24]],[o(77,97,114,105,101),[25,26,27,28,29]],[o(66,114,117,110,111),[30,31,32,33,34]],[o(74,233,114,244,109,101),[10,35,36,37,38]],[o(65,108,105,115,111,110),[39,40,41,42,43]],[o(84,111,110,121),[10,44,45,46,47]],[o(74,66),[48,49,50,51,52]],[o(67,233,100,114,105,99,32,82,46),[53,54,55,56,57]],[o(84,105,109,111,116,104,233,101),[58,59,60,61,62]],[o(79,108,105,118,105,101,114),[63,64,65,66,67]],[o(67,233,100,114,105,99,32,77,46),[68,69,70,71,72]],[o(71,117,105,108,108,97,117,109,101),[73,74,75,76,77]],[o(87,97,108,105,100),[78,79,80,81,82]],[o(74,117,108,101,115),[83,84,85,86,87]],[o(70,97,98,105,101,110),[88,89,90,91,92]],],f=JSON.parse(JSON.stringify(p)),m=Math.floor(40/p.length),h=p.length,g=[...Array(h+1).keys()],v=[],C=[],j=0,y=0;function w(){for(player in f)f[player][1]=P(f[player][1]);for(player in f=P(f),g.pop(),f)for(let e=0;e<m&&0!=f[player][1].length;e++)k(f[player]);for(;v.length<40&&v.length<a.items.length&&f.length>0;)0==(f=P(f))[0][1].length?f.shift():k(f[0]);y=(j=(v=P(v)).length)-j/5,$("#wrapper").addClass("initialized")}function k(e){var t=e[0],r=e[1].pop();!C.includes(r)&&(C.push(r),v.push([t,r]))}let T=async()=>{let r=await t.getToken();e.storeToken(r),a=await t.getPlaylist(r),w()};r.playTrackButton.addEventListener("click",async e=>{$(".js-wrapper").removeClass("game_ended"),$(".js-wrapper").addClass("game_started"),$(".js-score-wrapper").addClass("visible"),b()}),$(".js-replay-game").click(function(){x(_=0),v=[],C=[],i=0,f=JSON.parse(JSON.stringify(p)),w(),$(".js-word").text("").hide(),$(".js-not-enough").hide(),$(".js-wrapper").removeClass("game_ended"),$(".js-wrapper").addClass("game_started"),$(".js-score-wrapper").addClass("visible"),b()});let b=async()=>{$(".js-answer").removeClass("correct"),$(".js-answer").removeClass("incorrect"),i+=1,$(".js-track-number").text(i);var e=v.shift(),t=e[1],r=t+1,_="assets/previews/"+(r=r<10?"00"+r:r<100?"0"+r:r)+".mp3";u.attr("src",_);var o=a.items[t].track.album.images[1].url;$(".js-cover").attr("src",o);var c=a.items[t].track.name;$(".js-name").text(c);var d=a.items[t].track.artists,f="";for(artist in d)f+=d[artist].name+", ";f=f.slice(0,-2),$(".js-artist").text(f),n=[[e[0],!0]],g=P(g);for(var m=0;n.length<4&&m<h;){var C=p[g[m]][0];C==e[0]||p[g[m]][1].includes(t)||n.push([C,!1]),m+=1}n=P(n),$(".js-answer").each(function(e){$(this).text(n[e][0])}),l.play(),s=!0,$(".js-answers").addClass("playing")};function P(e){for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1)),a=e[t];e[t]=e[r],e[r]=a}return e}function x(){$(".js-score").text(_)}return jQuery(".js-answer").on("click",function(){var e=$(this);s&&(s=!1,l.pause(),$(".js-answers").removeClass("playing"),n[e.attr("data-index")][1]?(e.addClass("correct"),c.pause(),c.currentTime=0,c.play(),_+=1,x()):(d.pause(),d.currentTime=0,d.play(),e.addClass("incorrect")),setTimeout(function(){var e;v.length>0?b():(_>=y?$(".js-word").text(o(81,85,79,76,73,66,69,84)).show():$(".js-not-enough").show(),e=function e(t){if(t<j/8)return["D\xe9serteur","Il vaut mieux \xeatre triste qu'\xe0 perte."];if(t<j/4)return["Client Maladroit",'"Dites, je crois que je viens de d\xe9publier ma homepage."'];if(t<j/2-j/8)return["D\xe9veloppeur Wordpress","Pourquoi faire de la qualit\xe9 quand on peut faire du Wordpress ?"];if(t<j/2)return["Vapoteur Clandestin","Pour information les zones vertes c'est le couloir et la salle de r\xe9union."];if(t<j/2+j/8)return["Afficionado du t\xe9l\xe9travail","C'est bien, mais il faudrait penser \xe0 passer au bureau de temps en temps."];else if(t<j-j/4)return["Coll\xe8gue d\xe9bonnaire","Parce que notre propre bonheur commence avec celui des autres."];else if(t<j-j/5)return["Pull en preprod","Encore un petit effort et on sera bons pour le passage en prod."];else if(t<j-j/20)return["Happiness Manager","F\xe9licitations, c'est une victoire bien m\xe9rit\xe9e."];else if(t<j)return["Mise en ligne un vendredi sans accrocs","D'aucuns diront que c'est un miracle."];else if(t==j)return["Manifestation Divine","Les astres chantent les louanges du propri\xe9taire de ce score parfait."];else return["",""]}(_),$(".js-rank").text(e[0]),$(".js-message").text(e[1]),$(".js-wrapper").removeClass("game_started"),$(".js-wrapper").addClass("game_ended"),$(".js-score-wrapper").removeClass("visible"))},1e3))}),u.on("timeupdate",function(e){s&&l.play()}),{init(){x(_),T()}}}(UIController,APIController);APPController.init();