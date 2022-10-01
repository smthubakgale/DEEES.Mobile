
// URL Redirect 
function url_render(param)
{ 
    var ids = ((""+param).indexOf(",") == -1) ? [param] : (""+param).split(",");
    var prods = [];

    $.each(ids, (k, item) =>
    {  
        var prod = producttable.where({ Idx: item });

        if (prod.length > 0) {
            prods.push(prod[0]);
        }
    })
     
    if (prods.length > 0)
    { 
        $(".s2").attr("res", "");

        remPop('bsc_src', 'left');
        var a = $(".s2").children().first();
        var str = "";

        $.each(prods, (k, item) => {
            var f = a.clone();
            f.find(".prod_img").attr("src", item.Image);
            f.find(".prod_prc").html(item.Price);
            f.find(".prod_name").html(item.Name);

            var c = categorytable.where({ Idx: item.Category });
            f.find(".prod_categ").html((c.length == 0) ? "-" : c[0].Name);

            var c = liketable.where({ Idx: item.Idx });
            f.find(".prod_like").html((c.length == 0) ? "-" : c[0].QTY);

            var c = ratetable.where({ Idx: item.Idx });
            f.find(".prod_rate").html((c.length == 0) ? "-" : c[0].Rating);
            f.find(".prod_rate").parent().attr("name" , item.Idx);

            var c = carttable.where({ Product: item.Idx });
            f.find(".prod_cart").html((c.length == 0) ? 0 : c[0].QTY);
            f.find(".prod_cart").attr("idx", item.Idx);

            str += $("<div/>").html(f).html();
        })
         
        $(".s2").html(str);
        $(".s2").css("display", "block"); 
        $(".s2").attr("res", JSON.stringify(ids));
    }
}
//

function loadBS()
{ 
    var a = $("#bsc_src").find(".src_by_name").find(".aut_dat");

    if (a.attr("loaded") != "true")
    {
        // Name
        a.attr("loaded", "true"); 
        var b = JSON.stringify(producttable.select('x.Name'));
        a.html(b);
        // Price
        var c = [];
        $.each(producttable.select('x.Price'), (k, item) =>
        { 
            c.push(parseFloat(item));
        });

        if (c.length > 0)
        {
            var max = Math.max.apply(Math, c);
            var min = Math.min.apply(Math, c); 

            var b1 = $("#bsc_src").find(".src_by_price").find(".in_sln");
            b1.attr("min", min);
            b1.attr("max", max);
            b1.val(min);

            var b2 = $("#bsc_src").find(".src_by_price").find(".in_slx");
            b2.attr("min", min);
            b2.attr("max", max);
            b2.val(max);

            rn_min(b1);
            rn_max(b2);

            $("#bsc_src").find(".src_by_price").find(".r_min").html(min);
            $("#bsc_src").find(".src_by_price").find(".r_max").html(max);
        }
        // Category 
        var a = $("#bsc_src").find(".src_by_categ").find(".aut_dat");
        var g = $.unique(producttable.select('x.Category'));
         
        var c = [];
        $.each(g, (k, item) =>
        {
            var nm = categorytable.where({ Idx: item });
            if (nm.length > 0) {
                c.push(nm[0].Name)
            }
        })
        a.html(JSON.stringify(c));
        // Supplier
        var a = $("#bsc_src").find(".src_by_supp").find(".aut_dat");
        var g = $.unique(producttable.select('x.Supplier'));
         
        var c = [];
        $.each(g, (k, item) =>
        {
            var nm = suppliertable.where({ Idx: item });
            if (nm.length > 0)
            {
                var str = nm[0].LastName;
                $.each(nm[0].Names, (k, item) =>
                {
                    str += " " + item;
                })
                c.push(str)
            }
        })
        a.html(JSON.stringify(c));
        //
    }
     
    getPop('bsc_src', 'left');
}
function setres1(tag)
{
    $(tag).parent().css("display", "none");
    var v = $(tag).html();

    var c = producttable.where({ Name: v });

    if (c.length > 0) {
        var ids = [];
        $.each(c, (k, item) => { ids.push(item.Idx) })

        $(tag).parent().parent().find(".rs1").html(v);
        $(tag).parent().parent().find(".rs1").attr("idx", JSON.stringify(ids));
        $(tag).parent().parent().find(".aut_sr").css("display", "flex")
    }
    else {

        $(tag).parent().parent().find(".aut_sr").css("display", "none")
    }
}

function setres2(tag) {

    var min = parseFloat($(tag).parent().find(".in_min").html());
    var max = parseFloat($(tag).parent().find(".in_max").html());

    var ids = [];

    $.each(producttable, (k, item) =>
    {
        var prc = parseFloat(item.Price);

        if (min <= prc && prc <= max)
        {
            ids.push(item.Idx);
        }
    })
    
    if (ids.length > 0) {

        $(tag).parent().parent().parent().find(".rs1").attr("idx", JSON.stringify(ids));
        $(tag).parent().parent().parent().find(".rs1").css("display", "flex")
    }
    else {

        $(tag).parent().parent().parent().find(".rs1").css("display", "none")
    }
}
function setres3(tag)
{
    $(tag).parent().css("display", "none");
    var v = $(tag).html();

    var c = [];
    var d = categorytable.where({ Name: v }).select("x.Idx");
     
    $.each(producttable, (k, itm1) =>
    {
        $.each(d, (i, itm2) =>
        { 
            if (itm2 == itm1.Category) {
                c.push(itm1.Idx)
            }
        })
    })
     
    if (c.length > 0) {
        var ids = c;

        $(tag).parent().parent().find(".rs1").html(v);
        $(tag).parent().parent().find(".rs1").attr("idx", JSON.stringify(ids));
        $(tag).parent().parent().find(".aut_sr").css("display", "flex")
    }
    else {

        $(tag).parent().parent().find(".aut_sr").css("display", "none")
    }
}
function setres4(tag)
{
    $(tag).parent().css("display", "none");
    var v = $(tag).html();

    var c = [];
    var d = [];

    $.each(suppliertable, (k, itm1) =>
    {
        var str = itm1.LastName;
        $.each(itm1.Names, (i, itm2) =>
        {
            str += " " + itm2;
        })

        if (v == str)
        {
            d.push(itm1.Idx)
        }  
    })
     
    $.each(producttable, (k, itm1) =>
    {
        $.each(d, (i, itm2) =>
        { 
            if (itm2 == itm1.Supplier) {
                c.push(itm1.Idx)
            }
        })
    })
     
    if (c.length > 0) {
        var ids = c;

        $(tag).parent().parent().find(".rs1").html(v);
        $(tag).parent().parent().find(".rs1").attr("idx", JSON.stringify(ids));
        $(tag).parent().parent().find(".aut_sr").css("display", "flex")
    }
    else {

        $(tag).parent().parent().find(".aut_sr").css("display", "none")
    }
}
function getResults(tag)
{
    var ids = JSON.parse($(tag).parent().find(".rs1").attr("idx"))
    var prods = [];

    $.each(ids, (k, item) =>
    {
        var prod = producttable.where({ Idx: item });
        if (prod.length > 0)
        {
            prods.push(prod[0]);
        }
    })

    if (prods.length > 0)
    {
        remPop('bsc_src', 'left');
        var a = $(".s2").children().first();
        var str = "";

        $.each(prods, (k, item) =>
        { 
            $(".s2").attr("res", "");

            var f = a.clone();
            f.find(".prod_img").attr("src", item.Image);
            f.find(".prod_prc").html(item.Price);
            f.find(".prod_name").html(item.Name);

            var c = categorytable.where({ Idx: item.Category });
            f.find(".prod_categ").html((c.length == 0) ? "-" : c[0].Name);

            var c = liketable.where({ Idx: item.Idx });
            f.find(".prod_like").html((c.length == 0) ? "-" : c[0].QTY);

            var c = ratetable.where({ Idx: item.Idx });
            f.find(".prod_rate").html((c.length == 0) ? "-" : c[0].Rating);
            f.find(".prod_rate").parent().attr("name", item.Idx);

            var c = carttable.where({ Product: item.Idx });
            f.find(".prod_cart").html((c.length == 0) ? 0 : c[0].QTY);
            f.find(".prod_cart").attr("idx" , item.Idx);


            str += $("<div/>").html(f).html();
        })
        $(".s2").html(str);
        $(".s2").css("display", "block");
        $(".s2").attr("res", JSON.stringify(ids));  

    }
}

// QR Code Generate
function loadScan()
{
    var sr = $(".s2").attr("res").replace("[", "").replace("]", "");
    var cn = true;
    while (cn) {
        if (sr.indexOf('"') == -1)
        {
            cn = false;
        }
        sr = sr.replace('"', '');
    }
    sr = sr.trim();
    if (sr != "")
    {
        $("#qr_canv1").html("");

        sr = "https://deees.uj.ac.za/Products/" + sr;

        var param = {
            title: "Logo + quietZoneColor",
            config: {
                text: sr,

                width: 440,
                height: 440,
                colorDark: "#000000",
                colorLight: "#ffffff",

                quietZone: 1,
                quietZoneColor: '#E48380',

                logo: UjLogo,
                logoWidth: 80,
                logoHeight: 80,
                logoBackgroundColor: 'transparent',
                logoBackgroundTransparent: false,

                correctLevel: QRCode.CorrectLevel.H // L, M, Q, H 
            }
        };
        new QRCode(document.getElementById("qr_canv1"), param.config);

        getPop('qrc_src', 'left');
    }
    else {
        jsBridge.invokeAlert("Search for Products First", "Empty Search");
    }
}

function saveQR() {
    var img = $("#qr_canv1").find("canvas")[0].toDataURL('image/png');
    var data = img.substring(img.indexOf(",") + 1, img.length)
    var ret = jsBridge.invokeDownload(data);
    if (ret == "Done") {
        jsBridge.invokeAlert(ret, "Download Successful");
    }
    else {
        jsBridge.invokeAlert(ret , "Download Failed");
    }
}

// Rating  
function rate_product(id, val)
{
    alert("Product "+ id + " rated " + val);
}
// Cart
function cartAdd(tag)
{
    var id = $(tag).find(".prod_cart").attr("idx");
    var prod = producttable.where({ Idx: id });

    if (prod.length > 0)
    {
        if (prod[0].Availability == "Yes")
        {
            getPop('crt_spc', 'left');
        }
        else {
            jsBridge.invokeAlert("Product Unavailable" , "Availability");
        }
    }

}

