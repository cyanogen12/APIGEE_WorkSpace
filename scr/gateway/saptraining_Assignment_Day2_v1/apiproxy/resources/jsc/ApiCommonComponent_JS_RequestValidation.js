 var allowedVerbs=(context.getVariable("AllowedVerbs")).split(',');
 var allowedHeaders=(context.getVariable("AllowedHeaders")).split(',');
 var maxHeaderSize=context.getVariable("MaxHeaderSize");
 var maxPayloadSize=context.getVariable("MaxPayloadSize");
 var maxRequestUrlSize=context.getVariable("MaxRequestUrlSize");
 
 var reqVerb= context.getVariable("request.verb");
 var reqHeaders =context.getVariable("request.headers.names");
 //convert fro TreeMap to String
 reqHeaders = reqHeaders + '';
// convert from "[A, B, C]" to an array of strings: ["A", "B", "C"]
reqHeaders = reqHeaders.slice(1, -1).split(', ');
 var reqUriLength =context.getVariable("request.uri").length;
 var reqContentSize=context.getVariable("request.header.Content-Length");
 var reqContent=context.getVariable("request.content");

//Check if request HTTP Verb is in allowed HTTP Verbs List 
 var reqVerbAllowed = containsObject(reqVerb,allowedVerbs);
 if(reqVerbAllowed === false){
     context.setVariable('flow.myapi.error.message', 'Request Verb Not Allowed');
     throw new Error("Request Verb Not Allowed");
 }
 
 //Check if request HTTP Headers contain mandatory HTTP headers  
 for (i = 0; i < allowedHeaders.length; i++) {
         var reqHeaderAllowed = false;
         reqHeaderAllowed=containsObject(allowedHeaders[i],reqHeaders);
         if(reqHeaderAllowed === false){
            context.setVariable('flow.myapi.error.message', 'Mandatory Headers Not Present');
            //print("allowedHeaders[i]="+allowedHeaders[i]);
            throw new Error("Mandatory Headers Not Present");
         }
}

//Check request Header Size.

if(reqUriLength > maxRequestUrlSize){
    context.setVariable('flow.myapi.error.message', 'URILengthExceeded');
            //print("allowedHeaders[i]="+allowedHeaders[i]);
            throw new Error("URILengthExceeded");
}

if((reqVerb=== "POST") &&  (reqContent.length > maxPayloadSize)){
    context.setVariable('flow.myapi.error.message', 'InvalidPayload');
            //print("allowedHeaders[i]="+allowedHeaders[i]);
            throw new Error("InvalidPayload");
}

if(reqHeaders.length > maxHeaderSize){
    context.setVariable('flow.myapi.error.message', 'InvalidHeaderSize');
            //print("allowedHeaders[i]="+allowedHeaders[i]);
            throw new Error("InvalidHeaderSize");
}
 
 
print("reqVerb="+reqVerb +", AllowedVerbs="+allowedVerbs+", Allowed="+reqVerbAllowed);
print("reqHeaders"+reqHeaders+", reqHeaderAllowed="+reqHeaderAllowed);
print("allowedHeaders: "+allowedHeaders);
print("reqContent"+reqContent);
print("reqUriLength"+reqUriLength);
print("reqContentSize"+reqContentSize);
print("reqContent Length"+reqContent.length);

function containsObject(obj, list) {
    var i;
    var trimObj=obj.trim();
    for (i = 0; i < list.length; i++) {
        //print("i="+i+", list[i]="+list[i]+", obj="+trimObj);
        if (list[i].trim() === trimObj) {
            return true;
        }
    }

    return false;
}

