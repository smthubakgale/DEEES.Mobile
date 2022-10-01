
// Client 
function page(func, param) {
    $("#frm")[0].contentWindow.postMessage(func + "(" + JSON.stringify(param) + ")", "*");
}
function layout(func, param) {
    window.top.postMessage(func + "(" + JSON.stringify(param) + ")", "*");
}

function layout2(func, param) { 
    window.top.postMessage(func + "('" + param + "')", "*");
}

function layout3(func, p1 , p2) { 
    window.top.postMessage(func + "('" + p1 + "' , '" + p2 + "')", "*");
}

window.onmessage = function (e) { 
    $.globalEval(e.data);
    try{
        $(".force-mobile")[0].contentWindow.postMessage(e.data, "*"); 
    }
    catch{

    }
}
// Sever
function hGet(ctrl, funct, paramt) {
    var res = jsBridge.invokeGet(paramt, ctrl + 'Controller/' + funct);

    return res;
}
function hPost(ctrl, funct, paramt) {

    var resp = jsBridge.invokePost(paramt, ctrl + 'Controller/' + funct);

    return resp;
}
function hAlert(title, msg) {
    jsBridge.invokeAlert(msg, title);
}

function jAlert(msg)
{  
   try{
        $("#mnu_err").find(".msg").html(msg);
    getPop('mnu_err','center');
    setTimeout(function()
    {
        remPop('mnu_err','center');
    } , 2500);
   }catch{}
}
function jAlert2(msg , col)
{  
   try{
    $("#mnu_err").find(".msg").html(msg);
    $("#mnu_err").find(".alert").css("background-color" , col);
    getPop('mnu_err','center');
    setTimeout(function()
    {
        remPop('mnu_err','center');
    } , 2500);
   }catch{}
}

function jDirect(param)
{
  var a = $("<div/>");
  a.attr("name" , param);
  redirect(a[0]);

}
// 