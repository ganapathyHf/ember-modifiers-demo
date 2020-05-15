import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {

	@tracked selectedCategory = null;

	get categories() {
		return [
			'Fashion',
			'Groceries',
			'Industrial',
			'Sports',
			'Fitness',
			'Kids',
			'New Borns',
			'Sanitizers'
		]
	}

	@action
	onCategorySelect(category) {
		this.selectedCategory = category;
	}

}