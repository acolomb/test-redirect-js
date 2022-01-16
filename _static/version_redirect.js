const urlParams = new URLSearchParams(window.location.search);
const versionParam = urlParams.get('version');

console.log('Script called with parameter:', versionParam);


var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});


function findBestVersion(version, available) {
    var bestVersion = '';
    // Start with highest version number, using natural sorting
    available.sort(collator.compare).reverse();
    // 
    const found = available.some(function (candidate) {
        if (version.startsWith(candidate)) {
            // Direct prefix match
            bestVersion = candidate;
            return true;
        }
        if (collator.compare(candidate, version) < 0) {
            // Available version is numerically lower than requested
            if (version.startsWith(bestVersion.slice(0, bestVersion.lastIndexOf('.')))) {
                // Use the next higher one if it only differs in last component
            /*
            } else if (version.startsWith(candidate.slice(0, candidate.lastIndexOf('.')))) {
                // Use the lower version if it only differs in last component
                bestVersion = candidate;
            */
            } else {
                bestVersion = '';
            }
            // Stop checking older versions
            return true;
        }
        bestVersion = candidate;
        return false;
    });
    return found ? bestVersion : '';
}

function redirectToVersion(version) {
    window.location.href;
    window.location.replace;
}

if (versionParam) {
    var versionsAvailable = [];
    $.getJSON( "versions.json", function (data) {
        console.log('versions list', data);
        versionsAvailable = data.entries;
        const useVersion = findBestVersion(versionParam, versionsAvailable);

        console.log('best match', useVersion);
    });

    var testData = [];
    $.getJSON( "testdata.json", function (testData) {
        //testData = testData.map(a => a + '-foo');
        testData.sort(collator.compare).reverse();
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
