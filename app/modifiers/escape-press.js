import { modifier } from "ember-modifier";

export default modifier((element, [callback]) => {
  function handleKeyDown(event) {
    if (event.keyCode === 27) {
      callback();
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("click", handleKeyDown);
  };
});