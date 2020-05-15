import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
	@tracked selectedCategory = null;
	get categories() {
		return [
			'Fashion',
			'Groceries',
			'Industrial',
			'Kids',
			'New Borns',
			'Fitness'
		]
	}

	@action
	onCategorySelect(category) {
		this.selectedCategory = category;
	}
}