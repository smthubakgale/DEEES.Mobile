function linkdata(us)
{ 
   try{
    $.globalEval(us); 
    var a = us.substring(3 , us.indexOf("=")).trim();
    a+= "_load()"; 
    $.globalEval(a); 
   }catch{}
} 
 