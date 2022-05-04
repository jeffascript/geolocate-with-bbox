# geolocate with  bbox & longlat

A Geo bound box App. Results in a Geojson from a bbox or Latlng input powered by a free API from openstreetmap.com


####  Add this on your .env in server folder 
`OSM_URL=https://www.openstreetmap.org/api/0.6/map?bbox=`

#### START CMD

`yarn dev`

N/B: The shared file is linked within the module and accessible by `client` and `server` via `yarn link @jeff/shared`


Points to note:

No caching or db used since:
1. The data does change frequently/abruptly.
2. The data is provided through an API that has low down time, so we can easily query it using fetch.
3. We don't care if the user can see the HTTP request in the "Network" tab of their browser's inspector. In other words, there are no security concerns in exposing this request to the client.
4. We're not being charged for every API request, so we don't have a particular interest in limiting the number of requests.


--- To improve,
  1. Deploy with Docker
  2. ...
