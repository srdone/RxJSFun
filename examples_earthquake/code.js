var quakes = Rx.DOM.jsonpRequest({
    url: QUAKE_URL,
    jsonpCallback: 'eqfeed_callback'
})
.flatMap(function (dataset) {
    return Rx.Observable.fromArray(dataset.response.features);
})
.map(function (quake) {
    return {
        lat: quake.geometry.coordinates[1],
        lng: quake.geometry.coordinates[0],
        size: quake.properties.mag * 1000
    };
});

quakes.subscribe(function (quake) {
    L.circle([quake.lat, quake.lng], quake.size).addTo(map);
});