const disable = () => $(".panel").addClass("disabled");
const enable = () => $(".panel").removeClass("disabled");

const first = (fn, endFn) => after(0, fn, endFn);

const after = (s, fn, endFn) => {
  setTimeout(fn, s * 1000);

  return {
    after: (s2, fn2) => after(s + s2, fn2, endFn),
    then: fn2 => after(s, fn2, endFn),
    wait: s2 => after(s + s2, () => {}, endFn),
    end: () => after(s, endFn? endFn: () => {})
  }
}

const start = () => first(disable, () => after(1, enable));

const randomMessages = [
  "What great weather today right?",
  "Did I ever mention how cool you are?",
  "<Insert inspirational quote>",
  "I wonder if these quotes will cycle through if you keep refreshing the page",
  "Welcome to your unpaid music listening internship",
  "Thanks {NAME} for supporting my extended essay",
  "What's an IB diploma?",
  "The leaderboard is a lie"
]

window.onload = () => {
  let playCount = 0;

  if(window.TRIAL === 0) {
    start()
      .then(log("Who am I?"))
      .after(3, log("What is the meaning of life? "))
      .after(3, log("To what extent are recurrent neural networks able to generate classical music indistinguishable to the human ear? "))
      .after(3, log("These are the questions that have plagued mankind for eons"))
      .after(3, log("Today we stand at the brink of a philosophical breakthrough"))
      .after(3, log("All you have to do is click "))
      .after(1, () => $(".survey").removeClass("hide"))
      .wait(2)
      .end();
  }else if(window.TRIAL === 1) {
    start()
      .then(log("Congratulations! You did so well that they decided to give you another sample to listen to!"))
      .after(3, log("Here."))
      .after(1, () => $("#trial-count").text(window.TRIAL))
      .after(1, log("A number for you to look at. I wonder what it does?"))
      .after(2, log("I guess the only way to find out is to listen to more music?"))
      .end();
  } else if(window.TRIAL === 2) {
    start()
      .then(log("Woah! It went up!"))
      .after(3, log("I wonder how high that number will go?"))
      .end();

  } else if(window.TRIAL >= 3) {
    switch(window.TRIAL) {
      case 3: 
        start()
          .then(log("Cool points?"))
          .after(2, log("I bet you'll be super cool if you can get 10 cool points"))
          .end();
        break;
      case 5: 
        start()
          .then(log("Apparently you only have to listen to 10 of these"))
          .after(2, log("Something about a leaderboard"))
          .after(2, log("So I guess you're halfway there. yay?"))
          .end();
        break;
      case 8:
        start()
          .then(log("Bad news. Turns out we didn't have funding for a leaderboard"))
          .end();
        break;
      default:
        first(log(randomMessages[Math.floor(Math.random() * randomMessages.length)]));
        break;
    }
  }

  let confirm = window.TRIAL === 0;
  const panels = Array.from(document.getElementsByClassName("panel"))
  panels.forEach(panel => {
    panel.onclick = () => {
      if(window.INFORMAL) {
        if(panel.classList.contains("disabled")) return;

        if(playCount < 2) {
          if(window.TRIAL <= 1) {
            if(playCount === 0) {
              return first(log("Wow, you didn't even listen to the samples and you could tell?", true));
            }else if(playCount === 1){
              return first(log("One more to go! You can do it!", true));
            }
          } else {
            return first(log("We've been over this already. Listen to all the samples before submitting", true));
          }
        }

        if(confirm) {
          confirm = false;

          start()
            .then(log("Interesting..."))
            .after(3, log("Are you absolutely sure? What if the fate of the universe rested on your decision?"))
            .after(2, log("Click again if you're 100% certain"))
            .end();

          return;
        }
      }

      const $form = $(panel).find("form");
      $form.submit();
    }
  });

  const played = [];
  Array.from(document.getElementsByTagName("audio")).forEach(audio => {
    audio.onplay = () => {
      if(played.includes(audio)) return;

      played.push(audio);
      playCount++;
    }
  });
}

const sentMessages = [];
const log = (msg, preventDupes=false, dupeMessage="...") => () => {
  if(preventDupes){
    if(sentMessages.includes(msg)) {
      if(dupeMessage === "") return;
      else msg = dupeMessage;
    }
  }

  sentMessages.push(msg);
  document.getElementById("chat").insertAdjacentHTML("afterbegin", `
    <div class="chat-message">${msg}</div>
  `)
}