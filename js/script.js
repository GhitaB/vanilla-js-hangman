  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  window.words_list = ["ROMANIA", "FRANTA", "UNGARIA", "BULGARIA"];
  window.nr_fails = 0;
  window.random_number = getRandomInt(0, window.words_list.length);
  console.log(window.random_number);
  window.hidden_word = window.words_list[window.random_number];
  window.visible_word = "";

  console.log(window.hidden_word);

  String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
  }

  function initHiddenWord() {
    var displayed_word = "";
    for (var i = 0; i < window.hidden_word.length; i++) {
      displayed_word += "_";
    }
    window.visible_word = displayed_word;
    document.getElementById("word").innerHTML = window.visible_word;
  }

  function fail() {
    window.nr_fails ++;
  }

  function refreshBoard() {
    var filename = "./images/0" + (window.nr_fails + 1) + ".png";
    document.getElementById("illustration").src = filename;
    console.log("0" + (window.nr_fails + 1) + ".png");
  }

  function checkGameOver() {
    if (window.nr_fails === 5) {
      var buttonControls = document.querySelector("div.game-controls");
      buttonControls.parentElement.removeChild(buttonControls);

      var msg = document.getElementById("msg-2");
      msg.style.display = "block";

      var msg = document.getElementById("msg-1");
      msg.style.display = "none";
    }
  }

  function checkWin() {
    if (window.hidden_word === window.visible_word) {
      var buttonControls = document.querySelector("div.game-controls");
      buttonControls.parentElement.removeChild(buttonControls);

      var msg = document.getElementById("msg-3");
      msg.style.display = "block";

      var msg = document.getElementById("msg-1");
      msg.style.display = "none";
    }
  }

  function start_game() {
    initHiddenWord();
  }

  function refreshWord(letter) {
    for (var position = 0; position < window.hidden_word.length; position++) {
      if (letter == window.hidden_word[position]) {
        window.visible_word = window.visible_word.replaceAt(position, letter);
      }
    }
    document.getElementById("word").innerHTML = window.visible_word;
  }

  function testLetter(letter) {
    if (window.hidden_word.indexOf(letter) > -1) {
      refreshWord(letter);
      checkWin();
    } else {
      fail();
      refreshBoard();
      checkGameOver();
    }
  }

  start_game();
