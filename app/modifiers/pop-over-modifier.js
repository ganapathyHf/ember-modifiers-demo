import Modifier from 'ember-modifier';

export default class PopOverModifier extends Modifier {
	constructor() {
		super(...arguments);
	}

	didInstall() {
		document.addEventListener('click', this.handleClick);
		document.addEventListener('keydown', this.handleKeyDown);
	}

	didReceiveArguments() {
		const { isOpen, isClosing, remove, animationDelay, renderInPlace } = this.args.named;
		this.isOpen = isOpen;
		this.isClosing = isClosing;
		this.remove = remove;
		this.animationDelay = animationDelay;
		this.renderInPlace = renderInPlace;
		if (this.isClosing) {
			this.handleClose(this.element);
		} else if (this.isOpen) {
			const { element } = this;
			const parentElement = document.getElementById(element.dataset.parentId);
			this.adjustPopOver(element, parentElement, renderInPlace);
			this.animatePopOver(element);
		}
	}

	adjustPopOver = (popOverContent, parentElement, renderInPlace) => {
		if (!renderInPlace) {
			popOverContent.style.top = `${parentElement.offsetTop + parentElement.offsetHeight + 2}px`;
			popOverContent.style.left = `${parentElement.offsetLeft}px`;
		}
		let windowHeight = window.screen.height;
		let windowWidth = window.screen.width;
		let popOverHeight = popOverContent.offsetHeight;
		let popOverWidth = popOverContent.width;
		let topOffset, leftOffset;
		if (renderInPlace) {
			topOffset = popOverContent.offsetTop + parentElement.offsetTop + parentElement.offsetHeight;
			leftOffset = popOverContent.offsetLeft + parentElement.offsetLeft;
		} else {
			topOffset = popOverContent.offsetTop;
			leftOffset = popOverContent.offsetLeft;
		}
		if ((windowHeight - topOffset) < popOverHeight && (popOverHeight < topOffset)) {
			if (renderInPlace) {
				popOverContent.style.top = 'inherit';
				popOverContent.style.bottom = '100%';
			} else {
				popOverContent.style.top = `${parentElement.offsetTop - popOverHeight - 2}px`;
			}
		}
		if (windowWidth > popOverWidth && (windowWidth - leftOffset) < popOverWidth) {
			if (renderInPlace) {
				let newLeft = windowWidth - (popOverWidth + leftOffset);
				popOverContent.style.left = newLeft;
			}
		}
	};

	animatePopOver = (popOverContent) => {
		popOverContent.classList.remove('hf-slide-out-down');
		popOverContent.classList.add('hf-slide-in-up');
	};

	handleKeyDown = (event) => {
		if (this.element && event.keyCode === 27) {
			this.handleClose(this.element);
		}
	}

	handleClick = (event) => {
		if ((this.element && !this.element.contains(event.target)) || event.target.dataset.popOver === 'close') {
			this.handleClose(this.element);
		}
	}

	handleClose = (element) => {
		element.classList.remove('hf-slide-in-up');
		element.classList.add('hf-slide-out-down');
		setTimeout(() => {
			this.remove();
		}, this.animationDelay);
	};

	willRemove() {
		document.removeEventListener('click', this.handleClick);
		document.removeEventListener('keydown', this.handleKeyDown);
	}
}