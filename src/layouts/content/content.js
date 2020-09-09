import template from './content.html'
import Map from "esri/Map";
import MapView from "esri/views/MapView";

export class Content {
  constructor() {
    this.setTemplate();
    this.initMap()
  }
  setTemplate() {
    document.getElementById('body').insertAdjacentHTML( 'afterbegin', template );
  }
  initMap(){
    const map = new Map({
        basemap: "topo-vector"
      });
    
      const view = new MapView({
        container: "mapView", // Reference to the DOM node that will contain the view
        map: map // References the map object created in step 3
      });
  }
}
