// Based on https://github.com/shramov/leaflet-plugins
// GridLayer like https://avinmathew.com/leaflet-and-google-maps/ , but using MutationObserver instead of jQuery


// 🍂class GridLayer.GoogleMutant
// 🍂extends GridLayer
function googleMutant() {
    L.GridLayer.GoogleMutant = L.GridLayer.extend({
        options: {
            minZoom: 0,
            maxZoom: 21, // can be 23, but ugly if more than maxNativeZoom
            tileSize: 256,
            subdomains: 'abc',
            errorTileUrl: '',
            attribution: '',	// The mutant container will add its own attribution anyways.
            opacity: 1,
            continuousWorld: false,
            noWrap: false,
            // 🍂option type: String = 'roadmap'
            // Google's map type. Valid values are 'roadmap', 'satellite' or 'terrain'. 'hybrid' is not really supported.
            type: 'roadmap',
            maxNativeZoom: 21
        },

        initialize: function (options) {
            L.GridLayer.prototype.initialize.call(this, options);

            this._ready = !!window && !!window.maps;
            this._isMounted = true;

            this._GAPIPromise = this._ready ? Promise.resolve(window.maps) : new Promise(function (resolve, reject) {
                var checkCounter = 0,
                    intervalId = null;

                intervalId = setInterval(function () {
                    if (checkCounter >= 10) {
                        clearInterval(intervalId);
                        return reject(new Error('window.google not found after 10 attempts'));
                    }
                    if (!!window && !!window.maps && !!window.maps) {
                        clearInterval(intervalId);
                        return resolve(window.maps);
                    }
                    ++checkCounter;
                }, 500);
            });

            this.once('spawned', function () {
                if (this._subLayers) {
                    //restore previously added google layers
                    for (var layerName in this._subLayers) {
                        this._subLayers[layerName].setMap(this._mutant);
                    }
                }
            });

            // Couple data structures indexed by tile key
            this._tileCallbacks = {};	// Callbacks for promises for tiles that are expected
            this._freshTiles = {};	// Tiles from the mutant which haven't been requested yet

            this._imagesPerTile = (this.options.type === 'hybrid') ? 2 : 1;

            this._boundOnMutatedImage = this._onMutatedImage.bind(this);
        },

        onAdd: function (map) {
            L.GridLayer.prototype.onAdd.call(this, map);
            this._initMutantContainer();

            this._GAPIPromise.then(function () {
                if (!this._isMounted) {
                    return;
                }
                this._ready = true;

                this._initMutant();

                map = this._map;
                if (!map) { return; }
                var moveevent = this.options.updateWhenIdle ? 'moveend' : 'move';
                map.on(moveevent, this._update, this);
                this.once('remove', function () {
                    this._map.off(moveevent, this._update, this);
                });
                //handle layer being added to a map for which there are no Google tiles at the given zoom
                google.maps.event.addListenerOnce(this._mutant, 'idle', function () {
                    if (!this._map) { return; }
                    this._checkZoomLevels();
                    this._mutantIsReady = true;
                }.bind(this));

                //20px instead of 1em to avoid a slight overlap with google's attribution
                map._controlCorners.bottomright.style.marginBottom = '20px';
                map._controlCorners.bottomleft.style.marginBottom = '20px';

                this._update();

            }.bind(this));
        },

        onRemove: function (map) {
            L.GridLayer.prototype.onRemove.call(this, map);
            this._observer.disconnect();
            map._container.removeChild(this._mutantContainer);

            google.maps.event.clearListeners(map, 'idle');
            if (this._mutant) {
                google.maps.event.clearListeners(this._mutant, 'idle');
            }
            map.off('viewreset', this._reset, this);
            map.off('move', this._update, this);
            map.off('moveend', this._update, this);
            map.off('zoomend', this._handleZoomAnim, this);
            map.off('resize', this._resize, this);

            if (map._controlCorners) {
                map._controlCorners.bottomright.style.marginBottom = 0;
                map._controlCorners.bottomleft.style.marginBottom = 0;
            }
            this._isMounted = false;
        },

        // @method addGoogleLayer(name: String, options?: Object): this
        // Adds layer with the given name and options to the google Map instance.
        // `name`: one of the google maps API layers, with it's constructor available in `google.maps` object.
        // currently following values supported: 'TrafficLayer', 'TransitLayer', 'BicyclingLayer'.
        // `options`: see https://developers.google.com/maps/documentation/javascript/reference/map
        addGoogleLayer: function (googleLayerName, options) {
            if (!this._subLayers) this._subLayers = {};
            this._GAPIPromise.then(function () {
                var Constructor = google.maps[googleLayerName];
                var googleLayer = new Constructor(options);
                if (this._mutant) { googleLayer.setMap(this._mutant); } // otherwise it will be added on 'spawned'
                this._subLayers[googleLayerName] = googleLayer;
            }.bind(this));
            return this;
        },

        // @method removeGoogleLayer(name: String): this
        // Removes layer with the given name from the google Map instance.
        removeGoogleLayer: function (googleLayerName) {
            this._GAPIPromise.then(function () {
                var googleLayer = this._subLayers && this._subLayers[googleLayerName];
                if (googleLayer) {
                    googleLayer.setMap(null);
                    delete this._subLayers[googleLayerName];
                }
            }.bind(this));
            return this;
        },

        _initMutantContainer: function () {
            if (!this._mutantContainer) {
                this._mutantContainer = L.DomUtil.create('div', 'leaflet-google-mutant leaflet-top leaflet-left');
                this._mutantContainer.id = '_MutantContainer_' + L.Util.stamp(this._mutantContainer);
                this._mutantContainer.style.zIndex = 800; //leaflet map pane at 400, controls at 1000
                this._mutantContainer.style.pointerEvents = 'none';

                L.DomEvent.off(this._mutantContainer);

            }
            this._map.getContainer().appendChild(this._mutantContainer);

            this.setOpacity(this.options.opacity);
            var style = this._mutantContainer.style;
            style.width = '100%';
            style.height = '100%';

            this._attachObserver(this._mutantContainer);
        },

        _initMutant: function () {
            if (this._mutant) {
                // reuse old _mutant, just make sure it has the correct size
                return;
            }

            var map = new google.maps.Map(this._mutantContainer, {
                center: { lat: 0, lng: 0 },
                zoom: 0,
                tilt: 0,
                mapTypeId: this.options.type,
                disableDefaultUI: true,
                keyboardShortcuts: false,
                draggable: false,
                disableDoubleClickZoom: true,
                scrollwheel: false,
                streetViewControl: false,
                styles: this.options.styles || {},
                backgroundColor: 'transparent'
            });

            this._mutant = map;

            google.maps.event.addListenerOnce(map, 'idle', function () {
                var nodes = this._mutantContainer.querySelectorAll('a');
                for (var i = 0; i < nodes.length; ++i) {
                    nodes[i].style.pointerEvents = 'auto';
                }
            }.bind(this));

            // 🍂event spawned
            // Fired when the mutant has been created.
            this.fire('spawned', { mapObject: map });
        },

        _attachObserver: function _attachObserver(node) {
            // 		console.log('Gonna observe', node);

            if (!this._observer)
                this._observer = new MutationObserver(this._onMutations.bind(this));

            // pass in the target node, as well as the observer options
            this._observer.observe(node, { childList: true, subtree: true });

            // if we are reusing an old _mutantContainer, we must manually detect
            // all existing tiles in it
            Array.prototype.forEach.call(
                node.querySelectorAll('img'),
                this._boundOnMutatedImage
            );
        },

        _onMutations: function _onMutations(mutations) {
            for (var i = 0; i < mutations.length; ++i) {
                var mutation = mutations[i];
                for (var j = 0; j < mutation.addedNodes.length; ++j) {
                    var node = mutation.addedNodes[j];

                    if (node instanceof HTMLImageElement) {
                        this._onMutatedImage(node);
                    } else if (node instanceof HTMLElement) {
                        Array.prototype.forEach.call(
                            node.querySelectorAll('img'),
                            this._boundOnMutatedImage
                        );

                        // Check for, and remove, the "Google Maps can't load correctly" div.
                        // You *are* loading correctly, you dumbwit.
                        if (node.style.backgroundColor === 'white') {
                            L.DomUtil.remove(node);
                        }

                        // Check for, and remove, the "For development purposes only" divs on the aerial/hybrid tiles.
                        if (node.textContent.indexOf('For development purposes only') === 0) {
                            L.DomUtil.remove(node);
                        }

                        // Check for, and remove, the "Sorry, we have no imagery here"
                        // empty <div>s. The [style*="text-align: center"] selector
                        // avoids matching the attribution notice.
                        // This empty div doesn't have a reference to the tile
                        // coordinates, so it's not possible to mark the tile as
                        // failed.
                        Array.prototype.forEach.call(
                            node.querySelectorAll('div[draggable=false][style*="text-align: center"]'),
                            L.DomUtil.remove
                        );
                    }
                }
            }
        },

        // Only images which 'src' attrib match this will be considered for moving around.
        // Looks like some kind of string-based protobuf, maybe??
        // Only the roads (and terrain, and vector-based stuff) match this pattern
        _roadRegexp: /!1i(\d+)!2i(\d+)!3i(\d+)!/,

        // On the other hand, raster imagery matches this other pattern
        _satRegexp: /x=(\d+)&y=(\d+)&z=(\d+)/,

        // On small viewports, when zooming in/out, a static image is requested
        // This will not be moved around, just removed from the DOM.
        _staticRegExp: /StaticMapService\.GetMapImage/,

        _onMutatedImage: function _onMutatedImage(imgNode) {
            // 		if (imgNode.src) {
            // 			console.log('caught mutated image: ', imgNode.src);
            // 		}

            var coords,
                match = imgNode.src.match(this._roadRegexp),
                sublayer = 0;

            if (match) {
                coords = {
                    z: match[1],
                    x: match[2],
                    y: match[3]
                };
                if (this._imagesPerTile > 1) {
                    imgNode.style.zIndex = 1;
                    sublayer = 1;
                }
            } else {
                match = imgNode.src.match(this._satRegexp);
                if (match) {
                    coords = {
                        x: match[1],
                        y: match[2],
                        z: match[3]
                    };
                }
                // 			imgNode.style.zIndex = 0;
                sublayer = 0;
            }

            if (coords) {
                var tileKey = this._tileCoordsToKey(coords);
                imgNode.style.position = 'absolute';
                imgNode.style.visibility = 'hidden';

                var key = tileKey + '/' + sublayer;
                // console.log('mutation for tile', key)
                //store img so it can also be used in subsequent tile requests
                this._freshTiles[key] = imgNode;

                if (key in this._tileCallbacks && this._tileCallbacks[key]) {
                    // console.log('Fullfilling callback ', key);
                    //fullfill most recent tileCallback because there maybe callbacks that will never get a
                    //corresponding mutation (because map moved to quickly...)
                    this._tileCallbacks[key].pop()(imgNode);
                    if (!this._tileCallbacks[key].length) { delete this._tileCallbacks[key]; }
                } else {
                    if (this._tiles[tileKey]) {
                        //we already have a tile in this position (mutation is probably a google layer being added)
                        //replace it
                        var c = this._tiles[tileKey].el,
                            oldImg = (sublayer === 0) ? c.firstChild : c.firstChild.nextSibling,
                            cloneImgNode = this._clone(imgNode);

                        c.replaceChild(cloneImgNode, oldImg);
                    }
                }
            } else if (imgNode.src.match(this._staticRegExp)) {
                imgNode.style.visibility = 'hidden';
            }
        },


        createTile: function (coords, done) {
            var key = this._tileCoordsToKey(coords),
                tileContainer = L.DomUtil.create('div');

            tileContainer.dataset.pending = this._imagesPerTile;
            done = done.bind(this, null, tileContainer);

            for (var i = 0; i < this._imagesPerTile; ++i) {
                var key2 = key + '/' + i;
                if (key2 in this._freshTiles) {
                    var imgNode = this._freshTiles[key2];
                    tileContainer.appendChild(this._clone(imgNode));
                    --tileContainer.dataset.pending;
                    // 				console.log('Got ', key2, ' from _freshTiles');
                } else {
                    this._tileCallbacks[key2] = this._tileCallbacks[key2] || [];
                    this._tileCallbacks[key2].push((function (c/*, k2*/) {
                        return function (imgNode) {
                            c.appendChild(this._clone(imgNode));
                            --c.dataset.pending;
                            if (!parseInt(c.dataset.pending)) { done(); }
                            // 						console.log('Sent ', k2, ' to _tileCallbacks, still ', c.dataset.pending, ' images to go');
                        }.bind(this);
                    }.bind(this))(tileContainer/*, key2*/));
                }
            }

            if (!parseInt(tileContainer.dataset.pending)) {
                L.Util.requestAnimFrame(done);
            }
            return tileContainer;
        },

        _clone: function (imgNode) {
            var clonedImgNode = imgNode.cloneNode(true);
            clonedImgNode.style.visibility = 'visible';
            return clonedImgNode;
        },

        _checkZoomLevels: function () {
            //setting the zoom level on the Google map may result in a different zoom level than the one requested
            //(it won't go beyond the level for which they have data).
            var zoomLevel = this._map.getZoom(),
                gMapZoomLevel = this._mutant.getZoom();

            if (!zoomLevel || !gMapZoomLevel) return;

            if ((gMapZoomLevel !== zoomLevel) || //zoom levels are out of sync, Google doesn't have data
                (gMapZoomLevel > this.options.maxNativeZoom)) { //at current location, Google does have data (contrary to maxNativeZoom)
                //Update maxNativeZoom
                this._setMaxNativeZoom(gMapZoomLevel);
            }
        },

        _setMaxNativeZoom: function (zoomLevel) {
            if (zoomLevel !== this.options.maxNativeZoom) {
                this.options.maxNativeZoom = zoomLevel;
                this._resetView();
            }
        },

        _update: function () {
            // zoom level check needs to happen before super's implementation (tile addition/creation)
            // otherwise tiles may be missed if maxNativeZoom is not yet correctly determined
            if (this._mutant) {
                var center = this._map.getCenter(),
                    _center = new google.maps.LatLng(center.lat, center.lng);

                this._mutant.setCenter(_center);

                var zoom = this._map.getZoom(),
                    fractionalLevel = zoom !== Math.round(zoom),
                    mutantZoom = this._mutant.getZoom();

                //ignore fractional zoom levels
                if (!fractionalLevel && (zoom !== mutantZoom)) {
                    this._mutant.setZoom(zoom);

                    if (this._mutantIsReady) this._checkZoomLevels();
                    //else zoom level check will be done later by 'idle' handler
                }
            }

            L.GridLayer.prototype._update.call(this);
        },

        _resize: function () {
            var size = this._map.getSize();
            if (this._mutantContainer.style.width === size.x &&
                this._mutantContainer.style.height === size.y)
                return;
            this.setElementSize(this._mutantContainer, size);
            if (!this._mutant) return;
            google.maps.event.trigger(this._mutant, 'resize');
        },

        _handleZoomAnim: function () {
            if (!this._mutant) return;

            var center = this._map.getCenter(),
                _center = new google.maps.LatLng(center.lat, center.lng);

            this._mutant.setCenter(_center);
            this._mutant.setZoom(Math.round(this._map.getZoom()));
            var gZoom = this._mutant.getZoom();

            // for (let key of Object.keys(this._freshTiles)) {
            // IE-compatible code, in ecmascript5:
            for (var key in Object.keys(this._freshTiles)) {
                if (gZoom !== parseFloat(key.split(':')[2]) /* tileZoom */) { // @utilmind: gZoom is number.
                    delete this._freshTiles[key];
                }
            }
        },

        // Agressively prune _freshtiles when a tile with the same key is removed,
        // this prevents a problem where Leaflet keeps a loaded tile longer than
        // GMaps, so that GMaps makes two requests but Leaflet only consumes one,
        // polluting _freshTiles with stale data.
        _removeTile: function (key) {
            if (!this._mutant) return;

            //give time for animations to finish before checking it tile should be pruned
            setTimeout(this._pruneTile.bind(this, key), 1000);

            return L.GridLayer.prototype._removeTile.call(this, key);
        },

        _getLargeGMapBound: function (googleBounds) {
            var sw = googleBounds.getSouthWest(),
                ne = googleBounds.getNorthEast(),
                swLat = sw.lat(),
                swLng = sw.lng(),
                neLat = ne.lat(),
                neLng = ne.lng(),
                latDelta = Math.abs(neLat - swLat),
                lngDelta = Math.abs(neLng - swLng);

            return L.latLngBounds([[swLat - latDelta, swLng - lngDelta], [neLat + latDelta, neLng + lngDelta]]);
        },

        _pruneTile: function (key) {
            var gZoom = this._mutant.getZoom(),
                tileZoom = key.split(':')[2],
                googleBounds = this._mutant.getBounds(),
                gMapBounds = this._getLargeGMapBound(googleBounds);

            if (!googleBounds) {
                return;
            }

            for (var i = 0; i < this._imagesPerTile; ++i) {
                var key2 = key + '/' + i;
                if (key2 in this._freshTiles) {
                    var tileBounds = this._map && this._keyToBounds(key),
                        stillVisible = this._map && tileBounds.overlaps(gMapBounds) && (parseFloat(tileZoom) === gZoom); // @utilmind: TileZoom is string, gZoom is number.

                    if (!stillVisible) delete this._freshTiles[key2];
                    //                              console.log('Prunning of ', key, (!stillVisible))
                }
            }
        }
    });


    // 🍂factory gridLayer.googleMutant(options)
    // Returns a new `GridLayer.GoogleMutant` given its options
    L.gridLayer.googleMutant = function (options) {
        return new L.GridLayer.GoogleMutant(options);
    };
    return L;
}