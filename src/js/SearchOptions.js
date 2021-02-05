import {toggleClassName} from './helperFunctions';
import {App} from './index';

export default class {
    constructor(togglerEl) {
        this.toggler = togglerEl;
        this.form = document.getElementById('options-form');
        this.optionsInput = this.form.querySelector('#category-input');
        this.rawSearchString = 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories';
        this.form.addEventListener('submit', this.submitHandler.bind(this));

        //this.locations = this.fetchData(this.rawSearchString + '/8');
    }

    getSearchString() {
       return this.createSearchString();
    }

    submitHandler(e) {
        e.preventDefault();
        this.searchString = this.createSearchString()
        this.toggleForm();
        toggleClassName(this.toggler, 'open');
        App.updateMap(this.searchString);
    }

    createSearchString() {
        const category = this.optionsInput.value;;
        const searchString = this.rawSearchString + `/${category}`;
        return searchString;
    }

    

    toggleForm() {
        toggleClassName(this.form.closest('.options'), 'open');
    }

}