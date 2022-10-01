

$(window).on("load", function () {
    loadScan()
})
function loadScan()
{
    var val = JSON.stringify(carttable.select('x.Idx')); 

    var sr = val.replace("[", "").replace("]", "");
    var cn = true;
    while (cn) {
        if (sr.indexOf('"') == -1) {
            cn = false;
        }
        sr = sr.replace('"', '');
    }
    sr = sr.trim();
    var usr = "1";

    if (sr != "") {
        $("#qr_canv1").html("");

        sr = "https://deees.uj.ac.za/Payment/" + sr +"/"+ usr;

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

    }
    else {
        jsBridge.invokeAlert("Search for Products First", "Empty Search");
    }
}

