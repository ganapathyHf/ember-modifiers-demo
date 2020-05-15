import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PopOverTriggerComponent extends Component {
	@action
	handleTriggerClick(e) {
		e.stopPropagation();
		this.args.handleTriggerClick();
	}
}