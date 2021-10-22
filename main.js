(function () {
  const wheel = document.querySelector(".wheel");
  const startButton = document.querySelector(".button");
  const display = document.querySelector(".display");

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition(); //initialize my instance of speech recognition
  recognition.interimResults = true;

  let deg = 0;
  let zoneSize = 45;

  const symbolZones = {
    1: "Kodok",
    2: "Bekicot",
    3: "Lumba-lumba",
    4: "Kepik",
    5: "koala",
    6: "Kuda",
    7: "Naga",
    8: "Snowman",
  };

  const handleWin = (actualDeg) => {
    const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
    display.innerHTML = symbolZones[winningSymbolNr];
  };

  startButton.addEventListener("click", () => {
    recognition.addEventListener("result", (e) => {
      // console.log(e.results[0].confidence);
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);

      if (transcript) {
        display.innerHTML = "-";
        startButton.style.pointerEvents = "none";
        deg = Math.floor(5000 + Math.random() * 5000);
        wheel.style.transition = "all 10s ease-out";
        wheel.style.transform = `rotate(${deg}deg)`;
      }
    });
    recognition.start();
  });

  wheel.addEventListener("transitionend", () => {
    startButton.style.pointerEvents = "auto";
    wheel.style.transition = "none";
    const actualDeg = deg % 360;
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    handleWin(actualDeg);
  });
})();
