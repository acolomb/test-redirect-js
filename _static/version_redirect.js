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
            //console.log('using previous best match', bestVersion, element, version);
            return true;
        }
        bestVersion = element;
        return false;
    });
    return bestVersion;
}

function stripVersionPath(path, versions) {
    var slash = path.indexOf('/', 1);
    if (slash != -1) {
        if (versions.indexOf(path.slice(1, slash)) != -1) {
            path = path.slice(slash);
        }
    }
    return path;
}

function redirectToPath(newPath) {
    const hash = window.location.href.indexOf('#');
    if (hash != -1) {
        newPath += window.location.href.slice(hash);
    }

    console.log('redirect?', newPath, window.location.pathname);
    if (newPath && newPath != window.location.pathname) {
        window.location.replace(newPath);
    }
}

function checkVersionRedirect(target, available) {
    const useVersion = findBestVersion(target, available);
    console.log('best match', useVersion);
    const tail = stripVersionPath(window.location.pathname, available + [target]);

    var newPath = '';
    if (useVersion) {
        newPath += '/' + version;
    }
    if (tail) {
        newPath += tail;
    }
    redirectToPath(newPath);
}

function testVersionData(available) {
    $.getJSON("testdata.json").then(function (testData) {
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


const urlParams = new URLSearchParams(window.location.search);
const versionParam = urlParams.get('version');

console.log('Script called with parameter:', versionParam);


if (versionParam) {
    $.getJSON("versions.json").then(function (data) {
        testVersionData(data.entries);
        checkVersionRedirect(data.entries, versionParam);
    });
}
