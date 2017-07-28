 //Get hhtpbin response in repsonseasJsonobject
var repsonseasJson= response.content.asJSON;

// Now start reading pincode api response 
pinCodeObj=context.session["pinCodeObjSend"];
 
 pinCodeObj.waitForComplete();
 
 if (!pinCodeObj.isSuccess()) {
        throw 'Error contacting pincode web service';
    }
    
 else {
     pinCodeResponse= pinCodeObj.getResponse();
     
     if(pinCodeResponse.status != 200) {
        throw 'Error returned from pincode web service: ' + pinCodeResponse.status;
     }else{
         print(pinCodeResponse.status);
         var pincodeResponseContent=pinCodeResponse.content.asJSON;
         //var lat = geocodeResponse.results[0].geometry.location.lat
         var postOfficeCount=pincodeResponseContent.PostOffice.length;
         
        print (pincodeResponseContent)
 
 
    var postOfficeName ="";
 
    for(var i=0;i<postOfficeCount;i++){
        if(i===0){
             postOfficeName="{" +pincodeResponseContent.PostOffice[i].Name;
        }
     
        else {
            if(i== (postOfficeCount-1)) {
                postOfficeName=postOfficeName+","+pincodeResponseContent.PostOffice[i].Name+"}";
            }else{
             postOfficeName=postOfficeName+","+pincodeResponseContent.PostOffice[i].Name;
            }
        }
    }
    repsonseasJson.PostOfficeCount=postOfficeCount;
    repsonseasJson.PostOfficeName=postOfficeName;
 //repsonseasJson.postOffice1=postOffice1;
//repsonseasJson.pincode=pincodeResponseContent;
 
    response.content= JSON.stringify(repsonseasJson,null,2);
    }     
 }