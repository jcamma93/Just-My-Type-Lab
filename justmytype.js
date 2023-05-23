let sentences = [
    'Mario was introduced as Jumpman in the 1981 arcade game Donkey Kong',
    'He was first seen as Mario in Donkey Kong Jr in 1982',
    'In 1983 his brother Luigi was introduced in the arcade game Mario Bros',
    'In 1985 Super Mario Bros was released for the NES',
    'The rest is history in the making'
];

let sentenceNumber = 0;
let sentence = sentences[sentenceNumber];
let targetSentence = $('#sentence')
let letterNumber = 0;
let letter = sentence.substring(letterNumber, letterNumber + 1);
let targetLetter = $('#target-letter');
let mistakes = 0;
let timeClock = false;
let startDate;
let startTime;


$(targetSentence).text(sentence);
$(targetLetter).text(letter);
$('#keyboard-upper-container').hide();


$(document).keydown(function (shift) {
    if (shift.which == 16) {
        $('#keyboard-upper-container').show();
        $('#keyboard-lower-container').hide();
    }
    $(document).keyup(function (shift) {
        if (shift.which == 16) {
            $('#keyboard-upper-container').hide();
            $('#keyboard-lower-container').show();
        }
    })
});


$(document).keypress(function (color) {
    let keys = $("#" + color.which);
    $(keys).css("background-color", "green");
    $(document).keyup(function () {
        $(keys).css("background-color", "whitesmoke");
    });
});


$(document).keypress(function (key) {
    if (timeClock === false) {
        startDate = new Date();
        startTime = startDate.getTime();
        timeClock = true;
    }
    if (key.which == sentence.charCodeAt(letterNumber)) {
        let correct = ("<span>✔️</span>");
        letterNumber++;
        letter = sentence.substring(letterNumber, letterNumber + 1);
        $(targetLetter).text(letter);
        $(correct).appendTo("#feedback");

        if (letterNumber === sentence.length) {
            sentenceNumber++
            // Here is where I have attempted to use variations of code to reset my highlighter back to the starting positon.
            if (sentenceNumber === sentences.length) {
                let endDate = new Date();
                let endTime = endDate.getTime();
                let minutes = (endTime - startTime) / 60000;
                let wpm = Math.round(54 / minutes - 2 * mistakes);
                let wpmMsg = confirm("You typed " + wpm + " words per minute. Press OK to play again!");
                if (wpmMsg == true) {
                    location.reload();
                }
            }
            else {
                sentence = sentences[sentenceNumber];
                $(targetSentence).text(sentence);
                letterNumber = 0;
                letter = sentence.substring(letterNumber, letterNumber + 1);
                $(targetLetter).text(letter);
                $("#feedback").text("");
            }
        }
    }
    else {
        let incorrect = ("<span>❌</span>");
        $(incorrect).appendTo("#feedback");
        mistakes++
    }

    // This is my code for moving the highlighter to the right indefinitely.
    $("#yellow-block").css("left", "+=17.5px");
    letterIndex++;
    currentLetter = currentSentence[letterIndex];
    $("#target-letter").text(currentLetter);

});