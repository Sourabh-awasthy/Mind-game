var color = ["blue", "red", "yellow", "green"];
var userEntery = [];
var random = [];
var started = false;
var level = 0;

if (localStorage.getItem("score") == undefined) {
    $("#score").css("display", "none");
} else {
    $("#score").css("display", "block");
    $("#score").text(`Your Highest Score is ${localStorage.getItem('score')}`);
}


function update() {
    if (started) {
        $("h1").html(`Round  <span class="badge badge-primary" style="color:white">${level}</span>`);
        $("h1").attr("class", "text-primary")
        ;
        
    }
    else {
        if (level == 0) { $("h1").html(`Press <span class="badge badge-secondary">S</span> To Start The Game`); }
       
        $("h1").attr("class", "title")
    }

}

function close(){
    document.getElementById("ruless").style.display="none";
}

 


async function gen() {
    userEntery = [];
    let temp = Math.floor(Math.random() * 4);
    level += 1;
    update();
    const colorClass = color[temp];
    random.push(colorClass);
    console.log(colorClass);
    $(`#${colorClass}`).attr("class", `bt btnsw-${colorClass}`);
    await new Promise(resolve => setTimeout(resolve, 600));
    $(`#${colorClass}`).attr("class", `bt button-${colorClass}`);
}



$(document).keypress(function (event) {
    if (!started) {
        if (event.key == "s" || event.key == "S") {
        }
        started = true;
        $("#score").css("display", "none");
        gen();
    }
})

 

document.getElementById("s").addEventListener("click", function () {
    if (!started) {
    started = true;
    document.getElementById("score").style.display = "none";
    gen();
    }
    });





$(".bt").click(function () {
    const userInputColor = $(this).attr("id");
    userEntery.push(userInputColor);
    $(this).attr("class", "bt button-${userInputColor} pressed");
    setTimeout(() => { $(this).attr("class", `bt button-${userInputColor}`); }, 300);
    soundplay(userInputColor);
    checkAnswer(userEntery.length - 1);

})


function soundplay(userInputColor) {
    var audio = new Audio("sounds/" + userInputColor + ".mp3");
    audio.play();
}

function recordt() {

    let prev = localStorage.getItem("score");
    if (prev == undefined) {

        $("#score").text(`Your Score is ${level}`);
        $("#score").css("display", "block");
        setTimeout(() => { $("#score").css("display", "none"); }, 5000);
        localStorage.setItem("score", level);
    }
    if (level <= prev) {

       if(level==0){
        $("#score").html(`Press S To Start The Game First`);
        $("#score").css("display", "block");
        setTimeout(() => { $("#score").css("display", "none"); }, 5000);
       }else{
        $("#score").html(`Your Score is ${level} keep trying<br>Highest Score ${prev}`);
        $("#score").css("display", "block");
        setTimeout(() => { $("#score").css("display", "none"); }, 5000);
       }

    } else {

        $("#score").text(`Your Score Highest Score is ${level}`);
        $("#score").css("display", "block");
        setTimeout(() => { $("#score").css("display", "none"); }, 5000);
        localStorage.setItem("score", level);
    }

}

function checkAnswer(currentlevel) {
    if (userEntery[currentlevel] == random[currentlevel]) {
        if (random.length - 1 == currentlevel) {
            setTimeout(gen,300);
            
        }
    } else {
        
        $("body").css("background-color", "red");
        setTimeout(function () { $("body").css("background-color", "white"); }, 300);
        recordt();
        random = [];
        level = 0;
        userEntery = [];
        started = false;
        update();
    }
}



