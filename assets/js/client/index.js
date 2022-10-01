

$(window).on("load", function ()
{ 
    s1();
})

function s1()
{
    var a = $(".s1").children().first();
    var str = "";

    $.each(producttable, (k, item) =>
    {
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

        var c = carttable.where({ Product: item.Idx });
        f.find(".prod_cart").html((c.length == 0) ? 0 : c[0].QTY);


        str += $("<div/>").html(f).html();
    })
    $(".s1").html(str);

    s2();
}
function s2()
{

    var a = $(".s2").children().first();
    var str = "";

    $.each(categorytable, (k, item) =>
    {
        var f = a.clone(); 
        f.find(".categ_name").html(item.Name);
        f.find(".categ_idx").html(k + 1);

        str += $("<div/>").html(f).html();
    })
    $(".s2").html(str);

    s3();
}
function s3()
{

    var a = $(".s3").children().first();
    var str = "";

    $.each(suppliertable, (k, item) => {
        var f = a.clone();
        f.find(".sup_img").attr("src", item.Image);

        var c = (item.Names.length == 0) ? "" : item.Names[0]; 
        f.find(".sup_fname").html(c);

        f.find(".sup_lname").html(item.LastName);
        f.find(".sup_lend").html(item.Lendings);

        var c = parseInt(item.Rating);
        var d = parseFloat(item.Rating) - parseFloat(c.toString());
        var fn1 = true; var fn2 = false;

        var s = "";
        for (var i = 0; i < 5; i++)
        {
            if (fn1) {
                if (i < c) {

                    s += '<span class="fa fa-star"></span>';
                }
                if (i == c) { 
                    fn1 = false;
                    fn2 = true; 
                }
            }

            if (fn2) {
                fn2 = false;
                if (d > 0) {
                    s += '<span class="fa fa-star-half-alt"></span>'; 
                }
            }
        }
        f.find(".sup_rat").html(s);

        str += $("<div/>").html(f).html();
    })
    $(".s3").html(str);
     
}