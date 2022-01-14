const urlParams = new URLSearchParams(window.location.search);
const versionParam = urlParams.get('version');

console.log('Script called with parameter:', versionParam);


var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});


function findBestVersion(version, available) {
    var bestVersion = '';
    // Start with highest version number, using natural sorting
    available.sort(collator.compare).reverse();
    // 
    available.some(function (element) {
        if (version.startsWith(element)) {
            // Direct prefix match
            bestVersion = element;
            return true;
        }
        if (collator.compare(element, version) < 0) {
            // 
            console.log('using previous best match', bestVersion, element, version);
            return true;
        }
        bestVersion = element;
        return false;
    });
    return bestVersion;
}

function redirectToVersion(version) {
    window.location.href;
    window.location.replace;
}

if (versionParam) {
    var versionsAvailable = [];
    $.getJSON( "/versions.json", function (data) {
        console.log('versions list', data);
        versionsAvailable = data.entries;
        const useVersion = findBestVersion(versionParam, versionsAvailable);

        console.log('best match', useVersion);
    });

    var testData = [];
    $.getJSON( "/testdata.json", function (testData) {
        testData = testData.map(a => a + '-foo').sort(collator.compare).reverse();
        var items = [];
        $.each(testData, function (key, val) {
            items.push("<tr><td>" + val + "</td><td>" + findBestVersion(val, versionsAvailable) + "</td></tr>");
        });
        $( "<table/>", {
            "class": "my-new-list",
            html: items.join( "" )
        }).appendTo( "body" );
    });
}
