import { modifier } from 'ember-modifier';

export default modifier((element, [callback]) => {
	function handleClick(event) {
		if (!element.contains(event.target)) {
			callback();
		}
	}

	function handleKeyDown(event) {
		if (event.keyCode === 27) {
			callback();
		}
	}

	document.addEventListener('click', handleClick);
	document.addEventListener('keydown', handleKeyDown);

	return () => {
		document.removeEventListener('click', handleClick);
		document.removeEventListener('keydown', handleKeyDown);
	};

});