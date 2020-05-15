import Component from '@glimmer/component';
import { isPresent } from '@ember/utils';

export default class PopOverContentComponent extends Component {
	get renderInPlace() {
		if (isPresent(this.args.renderInPlace)) {
			return JSON.parse(this.args.renderInPlace) || true;
		}
		return true;
	}
}