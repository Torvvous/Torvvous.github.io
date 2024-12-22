import { time, refreshIntervalId, updateCountdown } from "./timer.js";
import { verificareVizibilitate } from "./verificareVizibilitate.js";
import { shuffle, arrayRandom } from "./randomize.js";
import { resetGame } from "./buttonReset.js";

(function () {
  // just drag your whole code from your script.js and drop it here
  const message = document.querySelector(".message");
  const game = {};
  const output = document.querySelector(".que");
  const nx = document.querySelector(".next");
  let specialChar;
  let questionsArr = [];
  let uselessCharacter;
  let switchVerification = undefined;

  verificareVizibilitate(!switchVerification);
  resetGame();

  nx.addEventListener("click", createQuestion);
  const url =
    "https://script.google.com/macros/s/AKfycbyHHH2Y_-DTbh8wC1jzcDQRmqwMwUqLsO4RuMzW1J1TgEAscIsI9254sjP3BHoBpJxq/exec";
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      //console.log(data.data);
      game.total = data.data.length; // json data for game
      game.val = 0; //question we are on
      game.score = 0;
      game.arr = data.data;
      shuffle(game.arr);
      /* data.data.forEach(function (el) {
        console.log(el);
      }); */
      createQuestion();
    });

  // BUG
  // why doesn't shuffle work in the createQuestion function? the heck
  function createQuestion() {
    nx.style.display = "none";
    if (game.val + 1 > game.total) {
      message.textContent =
        "Ai raspuns corect la " +
        game.score +
        " din " +
        game.total +
        " de intrebari";
      output.textContent = "GAME OVER";
      let hiddenElementsLeft = document.querySelectorAll("span[hidden]");
      if (hiddenElementsLeft.length !== 0) {
        console.log(
          "You finished but there's still hidden elements. You have to start over.",
          hiddenElementsLeft
        );
      } else {
        console.log(
          "You found all hidden elements, congrats!",
          hiddenElementsLeft
        );
        let secretInput = document.getElementById("finalInputWrapper");
        secretInput.removeAttribute("hidden");
        time = 30 * 60;
        verificareVizibilitate(switchVerification);
      }
    } else {
      message.textContent =
        "Intrebarea #" + (game.val + 1) + " din " + game.total;
      output.innerHTML = "";

      // console.log(game.arr);
      let q = game.arr[game.val];
      questionsArr.push(q);
      //console.log("Questions array este: ", questionsArr);
      specialChar = q.specialCharacter;

      const main = document.createElement("div");
      main.textContent = q.question;
      main.classList.add("question");
      output.appendChild(main);

      arrayRandom(q.opt);
      //onsole.log(q);

      q.opt.forEach(function (el) {
        let span = document.createElement("span");
        span.textContent = el;
        span.classList.add("answer");
        span.classList.add("btn");
        output.appendChild(span);
        span.ans = q.answer;

        span.addEventListener("click", checker);
      });
    }
  }

  function checker(e) {
    const selAns = document.querySelectorAll(".answer");
    selAns.forEach(function (ele) {
      ele.classList.remove("answer");
      ele.style.color = "#ddd";
      ele.removeEventListener("click", checker);
    });
    let sel = e.target;
    if (sel.textContent == sel.ans) {
      sel.style.color = "green";
      nx.textContent = "Corect - continua";
      game.score++;
      sel.special = specialChar;
      delete sel.ans;
      console.log(sel);
    } else {
      sel.style.color = "red";
      nx.textContent = "Gresit - continua";
    }
    game.val++;
    nx.style.display = "block";
  }

  function manageSpecial(input) {
    // caracterGasit e practic o intrebare, nu o valoare
    let caracterGasit = questionsArr.find(
      (element) => element.specialCharacter == input.value
    );
    if (caracterGasit.specialCharacter !== "null") {
      console.log("Am gasit caracterul ", caracterGasit.specialCharacter);

      // ch + i unde i este pozitia intrebarii
      let select = "ch" + caracterGasit.index;
      let verySecret = document.getElementById(select);
      verySecret.textContent = caracterGasit.specialCharacter;

      verySecret.removeAttribute("hidden");
      console.log(input);
    } else if (caracterGasit.specialCharacter === "null") {
      console.log(
        "Caracterul null este inutil, nu poate fi folosit la finalizarea stringului"
      );
      uselessCharacter = document.getElementById("nullAnnouncement");
      uselessCharacter.textContent =
        "Caracterul pe care l-ati introdus este null (inutil), nu poate fi folosit la stringul final.";
    } else {
      console.log("NU am gasit caracterul :(", caracterGasit);
    }
  }

  function manageFinal(input) {
    let x = "8RF76";
    let y = "2EVGL";
    let z = "N00XD";
    let sep = "-";
    let xyz = x + sep + y + sep + z;
    if (input.value == xyz) {
      console.log("Congrats, you got it!");
      let displayFinal = document.getElementById("displayFinal");
      displayFinal.textContent = xyz;
    } else {
      console.log("Sadly something is wrong, you have to redo it! :(");
    }
  }

  specialInput.onclick = function () {
    let input = document.getElementById("specialUserInput");
    manageSpecial(input);
    input.value = "";
  };

  finalInput.onclick = function () {
    let input = document.getElementById("finalUserInput");
    manageFinal(input);
    input.value = "";
  };
})();

// BUG - solved
// this function doesn't work inside of anonymous function call (that protects data) with basic handlecaller because it's all local scope (CAN'T be accessed by other sources directly, not even the index can't reach the variables and functions that are protected)
// refer to specialInput to see how the variant of this function needs to be written in such cases
/* function returnText() {
  let input = document.getElementById("specialUserInput").value;
  manageSpecial(input);
} */
