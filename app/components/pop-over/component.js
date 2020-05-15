import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PopOverComponent extends Component {
	@tracked isOpen = false;
	@tracked isClosing = false;

	@action 
	openPopOver() {
		this.isOpen = true;
	}

	@action 
	closePopOver() {
		this.isClosing = true;
	}

	@action
	removePopOver() {
		this.isOpen = false;
		this.isClosing = false;
	}

	@action
	togglePopOver() {
		if (this.isOpen) {
			this.closePopOver();
		} else {
			this.openPopOver();
		}
	}
}