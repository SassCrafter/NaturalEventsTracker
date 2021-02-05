import mapboxgl from 'mapbox-gl';
import { fetchData, toggleClassName } from './helperFunctions';
import SearchOptions from './SearchOptions';
import Map from './Map';
import Loader from './Loader';

import '../sass/style.scss';





export class App {
    static init() {
        const optionsToggler = document.getElementById('options-toggler');
        const optionsContainer = document.getElementById('options');

        this.optionsForm = new SearchOptions(optionsToggler);
        this.loader = new Loader('loader');

        optionsToggler.addEventListener('click', () => {
            toggleClassName(optionsToggler, 'open');
            this.optionsForm.toggleForm();
        });
    }

    static async loadMap() {
        //console.log(this.loader);
        const data = await fetchData(this.optionsForm.getSearchString());
        this.map = await new Map(data);
        this.loader.toggle();
    }

    static async updateMap(searchString) {
        this.loader.toggle();
        this.map.clearMarkers();
        const data = await fetchData(searchString);
        this.map.setGeojson(data);
        this.map.setMarkers();
        this.loader.toggle();
    }
}


App.init();
App.loadMap();