var express = require('express');
var router = express.Router();


router.get('/estados', function(req, res, next) {
		connection.query('SELECT distinct edo FROM Inmuebles', function (error, results, fields) {
	  		if(error){
	  			res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  			//If there is error, we send the error in the error section with 500 status
	  		} else {
  				res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  				//If there is no error, all is good and response is 200OK.
	  		}
  		});
});

/* GET users listing. */
router.get('/:estado', function(req, res, next) {
	var estado=req.params.estado;
	if(estado){
		connection.query('SELECT nombre,edo,cd, colonia,calle,no,foto,latitud, longitud'+
		' FROM Inmuebles'+
		' WHERE edo='+"'"+estado+"';", function (error, results, fields) {
	  		if(error){
	  			res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  			//If there is error, we send the error in the error section with 500 status
	  		} else {
  				res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  				//If there is no error, all is good and response is 200OK.
	  		}
  		});
	}
});

module.exports = router;