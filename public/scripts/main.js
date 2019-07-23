window.onload = () => {
  let playCount = 0;

  Array.from(document.getElementsByClassName("panel")).forEach(panel => {
    let confirm = true;
    panel.onclick = () => {
      if(playCount === 0) {
        return log("Wow, you didn't even listen to the samples and you could tell?");
      }else if(playCount === 1){
        return log("One more to go! You can do it!")
      }

      if(confirm) {
        confirm = false;

        log("...");

        logAfter("Are you absolutely sure? What if the fate of the universe rested on your decision?", 3 * 1000);

      }
      
      panel.children[0].submit();
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
const log = (msg, preventDupes=true) => {
  if(preventDupes && sentMessages.includes(msg)) return;

  sentMessages.push(msg);
  document.getElementById("chat").insertAdjacentHTML("afterbegin", `
    <div class="chat-message">${msg}</div>
  `)
}

const logAfter = (msg, time, preventDupes=true) => {
  setTimeout(() => log(msg, preventDupes), time);
}