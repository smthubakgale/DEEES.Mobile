
$(window).on("load", function ()
{
    var a = $(".s2").children().first();
    var str = "";

    $.each(carttable, (k, item) =>
    { 
        var prod = producttable.where({ Idx: item.Product });
         
        if (prod.length > 0)
        {
            var p = prod[0];

            var categ = categorytable.where({ Idx: p.Category });

            if (categ.length > 0)
            {
                var c = categ[0];

                var f = a.clone();
                f.find(".prod_name").html(p.Name);
                f.find(".prod_img").attr("src", p.Image);
                f.find(".prod_categ").html(c.Name);

                f.find(".c_start").html(item.Start);
                f.find(".c_end").html(item.End);

                f.find(".c_add1").html(item.Address1);
                f.find(".c_city1").html(item.City1);
                f.find(".c_country1").html(item.Country1);
                f.find(".c_lat1").html(item.Latitude1);
                f.find(".c_lon1").html(item.Longitude1);

                f.find(".c_add2").html(item.Address2);
                f.find(".c_city2").html(item.City2);
                f.find(".c_country2").html(item.Country2);
                f.find(".c_lat2").html(item.Latitude2);
                f.find(".c_lon2").html(item.Longitude2);

                f.find(".c_trvtime").html(item.Traveltime);
                f.find(".c_est_time").html(item.Estimateddistance);
                f.find(".c_est_price").html(item.Estimatedprice);
                f.find(".c_qty").html(item.QTY);

                str += $("<div/>").html(f).html();
            } 
        }

    })
    $(".s2").html(str);
    $(".s2").css("display", "block");

})

function editItem(tag)
{
    getPop('crt_spc', 'left');
}
function remItem(tag)
{
    alert("TODO : Remove Item");
}

function addCart()
{
    layout('redirect2', 'checkout.html'); 
}
