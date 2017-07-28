 if (request.queryParams.postalcode === undefined){
     throw '"PinCode" query parameter is required';
   }
 else{
    var pincode=request.queryParams.pincode;
    var pincodeDetails=httpClient.get("http://postalpincode.in/api/pincode/122004");
    context.session["pinCodeObj"]= pincodeDetails;
 }
 