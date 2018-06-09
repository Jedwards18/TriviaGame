window.onload = function() {
    $("#start").on("click", stopwatch.start);
    $("#submit").on("click", stopwatch.stop);
    $(".question_group, #submit_button, #reset").hide();
    $("#player_score, #questions_correct, #questions_incorrect").hide();

    $("#start").on("click", function() {
        $(".question_group, #submit_button").show();
        $("#start").hide();
    })
};

    var intervalId;

    var clockRunning = false;

    var stopwatch = {
        time: 60,

        start: function() {
            if (!clockRunning) {
                intervalId = setInterval(stopwatch.count, 1000);
                clockRunning = true;
            }
        },
        stop: function() {
            clearInterval(intervalId);
            clockRunning = false;
        },
        count: function() {
            stopwatch.time--;
            var converted = stopwatch.timeConverter(stopwatch.time);
            //console.log(converted);
            $("#timer").text(converted);
            if (stopwatch.time == 0 ) {
                clearInterval(intervalId);
                clockRunning = false;
            }
        },

        timeConverter: function(t) {
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (minutes === 0) {
                minutes = "00";
            }
            else if (minutes < 10) {
                minutes = "0" + minutes;
            }

            return minutes + ":" + seconds;
        }
    };

window.onscroll = function() {myFunction()};

var header = $("#myHeader");

var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
    header.classList.add(".sticky");
    } else {
    }
}

$(document).ready(function() {
    
    var score = 0;
    var playerGuess;
    var answeredCorrectly = 0;
    var answeredIncorrectly = 0;

    function displayResults() {
        $("#player_score").text("You're score is: " + score + " out of 250");
        $("#questions_correct").text("Questions answered correctly: " + answeredCorrectly);
        $("#questions_incorrect").text("Questions answered incorrectly: " + answeredIncorrectly);
    };
    
    $("#reset").on("click", function() {
        window.location.reload();
    })
    
    $("#submit").on("click", function() {
        $("#player_score, #questions_correct, #questions_incorrect, #reset").show();
        $(".question_group, #submit_button").hide();
        displayResults();
    });
    
    $(".radio").on("click", function() {
        playerGuess = $(this).val();
        console.log(playerGuess);

        if (playerGuess === "correct") {
            score += 50;
            answeredCorrectly++;
            console.log(score);
            console.log(answeredCorrectly);
        } else {
            answeredIncorrectly++;
            console.log(answeredIncorrectly)
        }
        if (stopwatch.time == 0) {
            displayResults();
        }
    });
});