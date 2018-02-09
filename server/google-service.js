//Geocode an address.
module.exports = (address, callback) => {
	console.log('address', address)
	var googleMapsClient = require('@google/maps').createClient({
		key: 'AIzaSyADYyBUj0GiRoCkF8SSggEytnKJzXNtNR0'
	})
	googleMapsClient.geocode(
		{
			address: address
		},
		function(err, response) {
			if (!err) {
				const { lat, lng } = response.json.results[0].geometry.location
				callback(lat, lng)
			} else {
				console.log(err)
			}
		}
	)
}
