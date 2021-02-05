export default class {
    constructor(loaderId) {
    	this.loader = document.getElementById(loaderId);
    }

    toggle() {
    	this.loader.classList.toggle('visible');
    }
}