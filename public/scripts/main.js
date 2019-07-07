window.onload = () => {
  Array.from(document.getElementsByClassName("panel")).forEach(panel => {
    panel.onclick = () => panel.children[0].submit();
  });
}
