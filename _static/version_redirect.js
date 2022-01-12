const urlParams = new URLSearchParams(window.location.search);
const versionParam = urlParams.get('version');

console.log('Hello script!', versionParam);


//const versionsAvailable = require('./versions.json');


function findBestVersion(version) {
    
}

function redirectToVersion(version) {
    
}

if (versionParam) {
    $.getJSON( "/versions.json", function (data) {
        console.log('versions list', data);
        var items = [];
        $.each( data, function( key, val ) {
            items.push( "<li id='" + key + "'>" + val + "</li>" );
        });

        $( "<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
        }).appendTo( "body" );
    });
}
