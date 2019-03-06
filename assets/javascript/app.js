var userPick = []; //Array to hold the user choices, will populate with null in a for loop later
var correctAnswers = 0;
var wrongAnswers = 0;
var missedAnswers = 0;
var timeDisplay;
var counter = 61;
var intervalID;
var questions = [{
    question: "Which planet is closest to Earth?",
    choices: ["Venus", "Mars", "Saturn", "Jupiter"],
    answer: 0
},
{
    question: "There are how many tides in a day?",
    choices: ["2", "3", "1", "4"],
    answer: 3
},
{
    question: "This means Earth is spinning on its axis:",
    choices: ["Revolution", "Spinning", "Orbit", "Rotation"],
    answer: 3
},
{
    question: "What causes our seasons?",
    choices: ["Rotation and revolution", "Earth’s tilt", "Revolution", "Earth’s tilt and revolution"],
    answer: 3
},
{
    question: "A meteor hits Earth’s surface??",
    choices: ["True", "False"],
    answer: 2
},
{
    question: "A meteor is called a shooting star?",
    choices: ["False", "True"],
    answer: 1
},
{
    question: "What process fuels the sun?",
    choices: ["Nuclear Fusion", "Precipitation", "Photosynthesis", "Condensation"],
    answer: 1
},
{
    question: "Which one is not a type of galaxy?",
    choices: ["Irregular", "Orbital", "Elliptical", "Spiral"],
    answer: 2
},
{
    question: "The last layer of suns atmosphere is the?",
    choices: ["Core", "Chromosphere", "Corona", "Prominence"],
    answer: 3
},
{
    question: "Why do we have high and low tides?",
    choices: ["Sun’s gravity", "Sun and moon’s gravity", "Moon’s gravity", "d.	none of the above"],
    answer: 2
},
{
    question: "Which planet spins backwards relative to the others?",
    choices: ["Jupiter", "Venus", "Mars", "Uranus"],
    answer: 2
},
{
    question: "Which planet has the most moons?",
    choices: ["Mars", "Earth", "Jupiter", "none of the above"],
    answer: 3
},
{
    question: "Which planet(s) has rings around it",
    choices: ["All have rings", "Saturn", "Jupiter", "Neptune"],
    answer: 0
},
{
    question: "Which is the largest planet in the solar system?",
    choices: ["Mars", "Neptune", "Jupiter", "Earth"],
    answer: 3
}]

//To capture the missed responses, populate the userPick array with all nulls equal to the length of the questions object
for (var i = 0; i < questions.length; i++) {
    userPick[i] = null;
}

//Quiz starts here with ready function
$(document).ready(function () {

    $("#startGame").click(function () {
        //Attach the setInterval object to a variable so that we can stop it later
        intervalID = setInterval(decrement, 1000);
        //Use jQuery to call the function to write the questions to the html
        writeQuestions();
        $("#startGame").hide();
        writeSubmitButton();

        $("#submitQuiz").click(function () {
            showResults();
        });
        //This is the listener that will record the function that tracks what the user has clicked
        //This works because we structured the radio button groups with index x and i
        //This allows me to know what question the user picked (i) and the response (value).
        $("input").click(function () {
            userPick[this.name] = this.value;
        });
    });
});

//Use a nested for loop to go through each question and each radio button option and write to page
function writeQuestions() {
    for (var i = 0; i < questions.length; i++) {
        $("#formQuiz").append(questions[i].question + "</br>");
        //From within the first loop, write out the radio option buttons and assign them values and names of x and i respectively for later evaluation
        for (var x = 0; x < questions[i].choices.length; x++) {
            $("#formQuiz").append("<label class='radio-inline'><input value='" + x + "' type='radio' name='" + i + "'>" + questions[i].choices[x] + "</label>");
        }
        $("#formQuiz").append("<br/><br/>");
    }
}
//Write the button to submit the form in the event the user does not want to wait for the timer expire event.
function writeSubmitButton() {
    $("#formSubmit").append("<button id='submitQuiz' class='btn btn-primary btn-lg'>Submit</button>");
}

//Countdown counter
function decrement() {
    counter--;
    $("#timeRemaining").html("<h2><mark>" + counter + " seconds remaining.</mark></h2>");
    if (counter === 0) {
        alert("Time Up!");
        //Do additional logic and process the quiz results
        showResults();
    }
}
//Write the results to the HTML
function showResults() {
    //Hide the questions | options | and submit button
    $("#formQuiz").hide();
    $("#timeRemaining").hide();
    $("#submitQuiz").hide();
    //userPick[] was used to record the player responses 
    for (i = 0; i < questions.length; i++) {
        // Note: === evaluated to NaN so == was required.
        if (questions[i].answer == userPick[i]) {
            correctAnswers++;
        }
        // Unanswered questions
        else if (userPick[i] === null) {
            missedAnswers++;
        }
        // Logic dictates the only other possible outcome is a wrong answer
        else {
            wrongAnswers++;
        }
    }
    // Assigning an HTML id to a variable 
    var qR = $("#quizResults");
    $(qR).append("<p>ALL DONE!</p>");
    $(qR).append("<p>Correct Answers: " + correctAnswers + "</p>");
    $(qR).append("<p>Incorrect Answers: " + wrongAnswers + "</p>");
    $(qR).append("<p>Unanswered: " + missedAnswers + "</p>");
    //You must clear intervalID or it will repeat
    clearInterval(intervalID);
}