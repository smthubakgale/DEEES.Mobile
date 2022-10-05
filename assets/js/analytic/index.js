  
// UserTable 
var sc1 = null;
function usertable_load()
{ 
    setTimeout(function()
    { 
        sc1 = $(".ustb").clone();
        var str = "";
    
        var data = (usertable.length == 0)? [] : usertable[0];
        var keys = (usertable.length == 0)? [] : usertable[1];
    
        $.each(data , (k , itm)=>
        {  
             var f = ( ((k + 1) %2) == 0) ? sc1.find(".tbrB").first().clone() : sc1.find(".tbrA").first().clone(); 
             // Add Data
                f.find(".idx").html(itm.Idx);
                f.find(".fn").html(itm.FirstName);
                f.find(".ln").html(itm.LastName);
                f.find(".eml").html(itm.EmailAddress);
                f.find(".idn").html(itm.IDnumber);
                f.find(".phn").html(itm.Phone);
                f.find(".pass").html(itm.Password);
                f.find(".ut").html(itm.UserType);
     
                var im = (itm.Image == "" || itm.Image == null) ? "assets/img/img.png" : itm.Image; 
                f.find(".imge").attr("src" , im); 
                // Delete 
                   f.find(".dlt").attr("name" , keys[k]);
                // Update
                   f.find(".upd").attr("name" , keys[k]);
               //
               str += $("<div/>").html(f).html(); 
        })
        $(".ustb").html(str); 
        $(".ustb").css("display","block");

    },1000); 
     
}

// 