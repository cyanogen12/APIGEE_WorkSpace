var cacheObject =context.getVariable("accessEntityCacheObject");
var whitelistedIps="";
var emailaddress="";
var clientIP=context.getVariable("proxy.client.ip")


//print(cacheObject);
var cacheJsonObj =JSON.parse(cacheObject);
//print(cacheJsonObj);
var attributes = cacheJsonObj.App.Attributes.Attribute;

for(var i=0;i<attributes.length;i++){
 	var attributeName=attributes[i].Name;
    if(attributeName==="whitelistedips"){
        whitelistedIps=attributes[i].Value;
    }
    else if(attributeName==="emailaddress"){
      	emailaddress=attributes[i].Value;
      	context.setVariable("emailaddress",emailaddress)
    }

}

print("whitelistedIps: "+whitelistedIps);
print("emailaddress:"+emailaddress)
print("clientIP:"+ clientIP)

var allowedIPsArray=whitelistedIps.split(",");

for (var i = 0; i < allowedIPsArray.length; i++) {
     if(clientIP.trim() === allowedIPsArray[i].trim()){
     	print("Client IP is listed in Allowed IPs");	
 		break;
 	}	
 	else if(i=== allowedIPsArray.length-1){
 		throw 'ClientIPNotAllowed';
 	}
 }