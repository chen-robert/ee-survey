window.onload = () => {
  let playCount = 0;

  let confirm = true;
  const panels = Array.from(document.getElementsByClassName("panel"))
  panels.forEach(panel => {
    panel.onclick = () => {
      if(window.INFORMAL) {
        if(panel.classList.contains("disabled")) return;

        if(playCount === 0) {
          return log("Wow, you didn't even listen to the samples and you could tell?");
        }else if(playCount === 1){
          return log("One more to go! You can do it!")
        }

        if(confirm) {
          confirm = false;

          log("Interesting...");
          panels.forEach(panel => panel.classList.add("disabled"));

          logAfter("Are you absolutely sure? What if the fate of the universe rested on your decision?", 3 * 1000);
          logAfter("Click again if you're 100% certain", 5 * 1000);
          setTimeout(() => panels.forEach(panel => panel.classList.remove("disabled")), 5 * 1000);
          return;
        }
      }

      const $form = $(panel).find("form");
      const name = $form.find(`input[name="name"]`).val();
      const other = $form.find(`input[name="other"]`).val();

      $.post($form[0].action, {name, other})
        .then(console.log);
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
const log = (msg, preventDupes=true, dupeMessage="...") => {
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

const logAfter = (msg, time, preventDupes=true) => {
  setTimeout(() => log(msg, preventDupes), time);
}