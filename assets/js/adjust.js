
// GUI Navigation
$(document).ready(function ()
{ 
    if (isMobile())
    {

        if ($("#frm").length > 0)  // Layout
        {
            var url = "" + jsBridge.invokeCurrent();
            url = (url == "") ? "home.html" : url;

            if (url.indexOf("/") == -1) {
                $("#frm").attr("src", url);
            }
            else { 
                url = url.split("/");
                $("#frm").attr("src", url[0]);

                if (url[1] == "exit")
                {
                    getPop('mnu_ext', 'center');
                }
            }
        }
        else
        {                                              // Page 
            var url = "" + jsBridge.invokeCurrent();
            url = (url == "") ? "home.html" : url;

            if (url.indexOf("/") != -1) {
                url = url.split("/");
                 
                var param = url[1];
                 
                $.globalEval("url_render(" + param + ")"); 
            }
        }
    }
    else {
        $("#frm").attr("src", "register.html");
    }
})

function redirect(tag)
{
    var page = $(tag).attr("name");

    if (isMobile()) {

        if ($("#frm").length > 0)  // Layout
        {
            jsBridge.invokeNext(page)

            $("#frm").attr("src", page);
            adj();
            remPop('mnu_src', 'left');
        }
        else {                     // Page 

        }
    }
    else {

       try{
            $("#frm").attr("src", page);
            adj();
            remPop('mnu_src', 'left');
       }
       catch{}
    }
}

function exit_app()
{
    jsBridge.invokeExit();
}
// --------- GUI Resize : Layout && Page 
$(document).ready(function () { adj(); })

function adj()
{
    var w = $("main").outerWidth();
    var z = w / 948;                   // w was 948
    $(".adjust").css("zoom", z);

    setTimeout(function () {
        $(".adjust").animate({ opacity: 1 }, 400);

    }, 600);

    try {

        var h = $(window).outerHeight();
        var h1 = $(".tp_mn").outerHeight();

        $("#frm").css("min-height", (95 / 100) * (h - z * h1) + "px");
        $("#frm").css("max-height", (95 / 100) * (h - z * h1) + "px");

        $(".pop_up").css("min-height", (h / z) + "px");
        $(".pop_up").css("max-height", (h / z) + "px");

        $(".mnu_tab").css("height", (h / z) + "px");
        $(".mnu_das").css("min-height", (h / z) + "px");

    }
    catch { }
}
function isMobile() {
    return false;
}
// 
 
