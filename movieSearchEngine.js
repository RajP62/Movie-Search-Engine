var btnsearch = document.getElementById("btnSearch");
btnsearch.addEventListener("click",searchTheMovie);
var showError = {
    Poster: "https://cdn.dribbble.com/users/2469324/screenshots/6538803/comp_3.gif",
    Title: "Unable To Find the Movie",
}
function searchTheMovie(el){
    el.preventDefault();

    var movieName = document.getElementById('inputMovie').value;
    fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=f513670`).then(function(res){
        return res.json();
    })
    .then(function(res){
        var inpCont = document.getElementById("inputContainer");
            inpCont.style.display = 'none';
        if(res.Response === "False"){
            console.log(res)
            displayErrorRes(showError);
            console.log("entered catch")
        }
        else{
            displayResult(res);
            console.log(res)
        }
        
    }).catch(function(err){
        
    })
    
}
var resCont = document.getElementById("movieResult");
function displayResult(movieName){
    var divHolder = document.createElement("div");
    var img = document.createElement("img");
    img.src = movieName.Poster;
    var title = document.createElement("h1");
    title.innerText = "Title:"+movieName.Title;
    var awards = document.createElement("p");
    awards.innerText = "Awards: "+movieName.Awards;
    var language = document.createElement("p");
    language.innerText = "Language: "+movieName.Language;
    var imdbRating = document.createElement("p");
    var release = document.createElement("p");
    if(movieName.imdbRating>8.5){
        let rec = document.createElement("p");
        rec.innerText = "(Recommended)";
        rec.style.color = "white";
        rec.style.backgroundColor = "black";
        rec.style.fontWeight = "bold"
        // imdbRating.innerText = "ImdbRating: "+movieName.imdbRating+" "+Rec;
        imdbRating.innerText = "ImdbRating: "+movieName.imdbRating+" "+rec.textContent;
    }
    else{
        imdbRating.innerText = "ImdbRating: "+movieName.imdbRating;
    }
    release.innerText = "Released On: "+movieName.Released;
    var btnGoBack = document.createElement("button");
    btnGoBack.addEventListener("click",goToHomePage);
    btnGoBack.innerText = "Search More Movies"
    btnGoBack.setAttribute("class","btnGoBack")
    divHolder.append(img,title,awards,language,imdbRating, release,btnGoBack);

    resCont.append(divHolder);
}

function displayErrorRes(errorObj){
    var divHolder = document.createElement("div");
    var img = document.createElement("img");
    img.src = errorObj.Poster;
    var errorText = document.createElement("h3");
    errorText.innerText = errorObj.Title;
    divHolder.append(img, errorText);

    resCont.append(divHolder);
    setTimeout(function(){
        window.location.href = "movieSearchEngine.html";
    },5000)
}

function goToHomePage(){
    window.location.href = "movieSearchEngine.html";
}