import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
	get rootCategories() {
		return this.model.rejectBy('parent.id');
	}
}