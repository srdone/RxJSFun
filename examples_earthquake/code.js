var quakes = Rx.Observable
    .interval(5000)
    .flatMap(function () {
        return Rx.DOM.jsonpRequest({
            url: QUAKE_URL,
            jsonpCallback: 'eqfeed_callback'
        }).retry(3);
    })
    .flatMap(function (dataset) {
        return Rx.Observable.fromArray(dataset.response.features);
    })
    .distinct(function (quake) {
        return quake.properties.code;
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