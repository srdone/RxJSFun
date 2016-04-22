import Rx from 'rx';

var observable = Rx.Observable.interval(250);

observable.subscribe(x => console.log(x));