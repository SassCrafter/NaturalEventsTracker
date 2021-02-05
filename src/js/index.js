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
        const mapStyleToggler = document.getElementById('map-style');

        this.optionsForm = new SearchOptions(optionsToggler);
        this.loader = new Loader('loader');

        optionsToggler.addEventListener('click', () => {
            toggleClassName(optionsToggler, 'open');
            this.optionsForm.toggleForm();
        });

        mapStyleToggler.addEventListener('click', (e) => {
            toggleClassName(e.target, 'disabled');
            const togglerIsActive = e.target.dataset.active;
            const isActive = togglerIsActive === 'true' ? true : false;
            const styleStr =  isActive ? 'streets-v11' : 'dark-v10';
            e.target.dataset.active = !isActive;
            this.map.map.setStyle('mapbox://styles/mapbox/' + styleStr);
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