const urlParams = new URLSearchParams(window.location.search);
const versionParam = urlParams.get('version');

console.log('Script called with parameter:', versionParam);


var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

const VERSIONS_LIST = "/versions.json";
const TEST_DATA = "/testdata.json";

const getVersions = $.getJSON(VERSIONS_LIST).then(function (data) {
    // Start with highest version number, using natural sorting
    data.entries.sort(collator.compare).reverse();
    return data.entries;
});

function findBestVersion(version, available) {
    var bestVersion = '';
    available.some(function (candidate) {
        if (version.startsWith(candidate)) {
            // Direct prefix match
            bestVersion = candidate;
            return true;
        }
        if (collator.compare(candidate, version) < 0) {
            // Available version is numerically lower than requested
            if (version.startsWith(candidate.slice(0, candidate.lastIndexOf('.')))) {
                // Use the lower version if it only differs in last component
                bestVersion = candidate;
            }
            // Stop checking even older versions
            return true;
        }
        bestVersion = candidate;
        return false;
    });
    // Filter out any higher versions which differ in more than the last component
    if (!version.startsWith(bestVersion.slice(0, bestVersion.lastIndexOf('.')))) {
        bestVersion = '';
    }
    return bestVersion;
}

function redirectToVersion(version) {
    window.location.href;
    window.location.replace;
}

if (versionParam) {
    getVersions.then(function (available) {
        const useVersion = findBestVersion(versionParam, available);
        redirectToVersion(useVersion, available);
    });
}

function testVersionData(available) {
    $.getJSON(TEST_DATA).then(function (testData) {
        //testData = testData.map(a => a + '-foo');
        testData.sort(collator.compare).reverse();
        var items = [];
        $.each(testData, function (key, val) {
            items.push("<tr><td>" + val + "</td><td>"
                       + findBestVersion(val, available) + "</td></tr>");
        });
        $("<table/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo("body");
    });
}

getVersions.then(function (available) {
    testVersionData(available);
});
