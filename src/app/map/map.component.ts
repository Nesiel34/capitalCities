import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
import cities from "../../assets/cities.json";
import { Feature, ICities } from "./interface/ICities.interface";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone:true,
})
export class MapComponent implements OnInit {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
  private mapView: any;

  ngOnInit(): void {
    this.createMap();
  }

  private createMap() {
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/GraphicsLayer', 'esri/Graphic'], { css: true })
      .then(([Map, MapView, GraphicsLayer, Graphic]) => {
        const citiesData = cities as ICities;
        console.log(citiesData);
        const jerusalemGeometry = citiesData.features.find((city: Feature) => city.properties.CITY_NAME === 'Jerusalem')?.geometry.coordinates;
        const map = new Map({
          basemap: 'streets-navigation-vector'
        });

        this.mapView = new MapView({
          container: this.mapViewEl.nativeElement,
          map,
          center:jerusalemGeometry,
          zoom: 6
        });

        const citiesLayer = new GraphicsLayer();
        map.add(citiesLayer);

        // Sample cities data (replace with your data)

        citiesData.features.forEach((city:Feature) => {
          const point = {
            type: 'point',
            longitude: city.geometry.coordinates[0],
            latitude: city.geometry.coordinates[1]
          };

          const citySymbol = {
            type: 'simple-marker',
            color: [242, 44, 61], // Red color
            outline: {
              color: [255, 255, 255],
              width: 1
            }
          };

          const cityAttributes = {
            name: city.properties.CITY_NAME,
            population: city.properties.POP
          };

          const cityGraphic = new Graphic({
            geometry: point,
            symbol: citySymbol,
            attributes: cityAttributes,
            popupTemplate: {
              title: '{name}',
              content: 'Population: {population}'
            }
          });

          citiesLayer.add(cityGraphic);
        });

        this.mapView.when(() => {
          citiesLayer.on('click', (event:any) => {
            const graphic = event.graphic;
            const attributes = graphic.attributes;

            this.mapView.popup.open({
              title: attributes.name,
              content: `Population: ${attributes.population}`,
              location: event.mapPoint
            });
          });
        });
      })
      .catch((err) => console.error(err));
  }
}
