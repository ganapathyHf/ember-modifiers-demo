import Modifier from 'ember-modifier';

export default class PopOverModifier extends Modifier {
	constructor() {
		super(...arguments);
	}

	didInstall() {
		document.addEventListener('click', this.handleClick);
		document.addEventListener('keydown', this.handleKeydown);
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
			this.animatePopOver(this.element);
		}
  }

	animatePopOver = (popOverContent) => {
    popOverContent.classList.remove('hf-slide-out-down');
    popOverContent.classList.add('hf-slide-in-up');
	}
	
	adjustPopOver = (popOverContent, parentElement, renderInPlace) => {
		if (!renderInPlace) {
			popOverContent.style.top = `${parentElement.offsetTop + parentElement.offsetHeight + 2}px`;
			popOverContent.style.left = `${parentElement.offsetLeft}px`;
		}
    let windowHeight = window.screen.height;
    let windowWidth = window.screen.width;
    let popoverHeight = popOverContent.offsetHeight;
		let popoverWidth = popOverContent.offsetHeight;
		let topOffset, leftOffset;
		if (renderInPlace) {
			topOffset = popOverContent.offsetTop + parentElement.offsetTop + parentElement.offsetHeight;
			leftOffset = popOverContent.offsetLeft + parentElement.offsetLeft;
		} else {
			topOffset = popOverContent.offsetTop;
			leftOffset = popOverContent.offsetLeft;
		}
		if ((windowHeight - topOffset) < popoverHeight && (popoverHeight < topOffset)) {
			if (renderInPlace) {
				popOverContent.style.top = 'inherit';
				popOverContent.style.bottom = '100%';
			} else {
				popOverContent.style.top = `${parentElement.offsetTop - popoverHeight - 2}px`;
			}
		}
		if (windowWidth > popoverWidth && (windowWidth - leftOffset) < popoverWidth) {
			if (renderInPlace) {
				let newLeft = windowWidth - (popoverWidth + leftOffset);
				popOverContent.style.left = newLeft;
			}
		}
	};
	
	handleClick = (event) => {
    if ((this.element && !this.element.contains(event.target)) || event.target.dataset.popOver === 'close') {
      this.handleClose(this.element);
    }
  }

  handleKeydown = (event) => {
    if (this.element && event.keyCode === 27) {
      this.handleClose(this.element);
    }
	}
	
	willRemove() {
		document.removeEventListener('click', this.handleClick);
		document.removeEventListener('keydown', this.handleKeydown);
	}

  handleClose = (element) => {
    element.classList.remove('hf-slide-in-up');
    element.classList.add('hf-slide-out-down');
    setTimeout(() => {
			this.remove();
			this.popOverContent = null;
    }, this.animationDelay);
  }
}
