const urlParams = new URLSearchParams(window.location.search);
const versionParam = urlParams.get('version');

console.log('Hello script!', versionParam);


//const versionsAvailable = require('./versions.json');


function findBestVersion(version, available) {
    var bestVersion = '';
    available.sort().reverse().some(function (element) {
        if (version.startsWith(element)) {
            if (bestVersion.length < element.length) {
                bestVersion = element;
            }
        } else if (bestVersion) {
            // Abort when we already had a prefix match, but advanced past it in
            // the sorted list.
            return true;
        }
        return false;
    });
    return bestVersion;
}

function redirectToVersion(version) {
    
}

if (versionParam) {
    $.getJSON( "versions.json", function (data) {
        console.log('versions list', data);
        var items = [];
        $.each( data.entries, function( key, val ) {
            items.push( "<li id='" + key + "'>" + val + "</li>" );
        });

        $( "<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
        }).appendTo( "body" );
    });
}
