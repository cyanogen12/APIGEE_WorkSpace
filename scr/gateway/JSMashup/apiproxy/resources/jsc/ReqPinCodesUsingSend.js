 url =context.getVariable("target.url");
 context.setVariable("target.url", url+"/get");
 context.setVariable("request.verb", "GET");
 
 if (request.queryParams.postalcode === undefined){
     throw '"PinCode" query parameter is required';
   }
 else{
    var headers = {'Content-Type' : 'application/json' }; 
    var pincode=request.queryParams.pincode;
    var myrequest=new Request("http://postalpincode.in/api/pincode/122004", "GET",headers);
    
    var pincodeDetails=httpClient.send(myrequest);
    context.session["pinCodeObjSend"]= pincodeDetails;
 }
 