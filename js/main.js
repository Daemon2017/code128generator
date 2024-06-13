const prefixHeadersID = "prefixHeadersID"
const prefixID = "prefixID"
const fromHeadersID = "fromHeadersID"
const fromID = "fromID"
const toHeadersID = "toHeadersID"
const toID = "toID"
const modeID = "modeID"

function setMode() {
    var prefixHeaders = document.getElementById(prefixHeadersID);
    prefixHeaders.innerHTML = "";
    var prefix = document.getElementById(prefixID);
    prefix.innerHTML = "";
    var fromHeaders = document.getElementById(fromHeadersID);
    fromHeaders.innerHTML = "";
    var from = document.getElementById(fromID);
    from.innerHTML = "";
    var toHeaders = document.getElementById(toHeadersID);
    toHeaders.innerHTML = "";
    var to = document.getElementById(toID);
    to.innerHTML = "";
    switch (document.getElementById(modeID).value) {
      case 'no':
        break;
      case 'single':
        var kitLabelLeftDiv = document.createElement("div");
        kitLabelLeftDiv.setAttribute("class", "column");
        prefixHeaders.appendChild(kitLabelLeftDiv);
        var kitLabelLeft = document.createElement("label");
        kitLabelLeft.setAttribute("for", "kitID");
        kitLabelLeft.innerHTML = "Номер набора:";
        kitLabelLeftDiv.appendChild(kitLabelLeft);
        var kitLabelRightDiv = document.createElement("div");
        kitLabelRightDiv.setAttribute("class", "column");
        prefixHeaders.appendChild(kitLabelRightDiv);
        var kitLabelRight = document.createElement("label");
        kitLabelRight.setAttribute("for", "kitID");
        kitLabelRight.innerHTML = "Kit ID:";
        kitLabelRightDiv.appendChild(kitLabelRight);
        var prefixText = document.createElement("textarea");
        prefixText.id = "kitID";
        prefixText.setAttribute("rows", "1");
        prefixText.setAttribute("wrap", "off");
        prefixText.setAttribute("style", "width: 100%");
        prefix.appendChild(prefixText);
        break;
      case 'list':
        var kitLabelLeftDiv = document.createElement("div");
        kitLabelLeftDiv.setAttribute("class", "column");
        prefixHeaders.appendChild(kitLabelLeftDiv);
        var kitLabelLeft = document.createElement("label");
        kitLabelLeft.setAttribute("for", "kitID");
        kitLabelLeft.innerHTML = "Номера наборов (построчно):";
        kitLabelLeftDiv.appendChild(kitLabelLeft);
        var kitLabelRightDiv = document.createElement("div");
        kitLabelRightDiv.setAttribute("class", "column");
        prefixHeaders.appendChild(kitLabelRightDiv);
        var kitLabelRight = document.createElement("label");
        kitLabelRight.setAttribute("for", "kitID");
        kitLabelRight.innerHTML = "Kit IDs (line by line):";
        kitLabelRightDiv.appendChild(kitLabelRight);
        var prefixText = document.createElement("textarea");
        prefixText.id = "kitsID";
        prefixText.setAttribute("rows", "10");
        prefixText.setAttribute("wrap", "off");
        prefixText.setAttribute("style", "width: 100%");
        prefix.appendChild(prefixText);
        break;
      case 'range':
        var prefixLabelLeftDiv = document.createElement("div");
        prefixLabelLeftDiv.setAttribute("class", "column");
        prefixHeaders.appendChild(prefixLabelLeftDiv);
        var prefixLabelLeft = document.createElement("label");
        prefixLabelLeft.setAttribute("for", "kitPrefixID");
        prefixLabelLeft.innerHTML = "Префикс:";
        prefixLabelLeftDiv.appendChild(prefixLabelLeft);
        var prefixLabelRightDiv = document.createElement("div");
        prefixLabelRightDiv.setAttribute("class", "column");
        prefixHeaders.appendChild(prefixLabelRightDiv);
        var prefixLabelRight = document.createElement("label");
        prefixLabelRight.setAttribute("for", "kitPrefixID");
        prefixLabelRight.innerHTML = "Prefix:";
        prefixLabelRightDiv.appendChild(prefixLabelRight);
        var prefixText = document.createElement("textarea");
        prefixText.id = "kitPrefixID";
        prefixText.setAttribute("rows", "1");
        prefixText.setAttribute("wrap", "off");
        prefixText.setAttribute("style", "width: 100%");
        prefix.appendChild(prefixText);
        var fromLabelLeftDiv = document.createElement("div");
        fromLabelLeftDiv.setAttribute("class", "column");
        fromHeaders.appendChild(fromLabelLeftDiv);
        var fromLabelLeft = document.createElement("label");
        fromLabelLeft.setAttribute("for", "kitFromID");
        fromLabelLeft.innerHTML = "Начало:";
        fromLabelLeftDiv.appendChild(fromLabelLeft);
        var fromLabelRightDiv = document.createElement("div");
        fromLabelRightDiv.setAttribute("class", "column");
        fromHeaders.appendChild(fromLabelRightDiv);
        var fromLabelRight = document.createElement("label");
        fromLabelRight.setAttribute("for", "kitFromID");
        fromLabelRight.innerHTML = "From:";
        fromLabelRightDiv.appendChild(fromLabelRight);
        var fromText = document.createElement("textarea");
        fromText.id = "kitFromID";
        fromText.setAttribute("rows", "1");
        fromText.setAttribute("wrap", "off");
        fromText.setAttribute("style", "width: 100%");
        from.appendChild(fromText);
        var toLabelLeftDiv = document.createElement("div");
        toLabelLeftDiv.setAttribute("class", "column");
        toHeaders.appendChild(toLabelLeftDiv);
        var toLabelLeft = document.createElement("label");
        toLabelLeft.setAttribute("for", "kitToID");
        toLabelLeft.innerHTML = "Конец:";
        toLabelLeftDiv.appendChild(toLabelLeft);
        var toLabelRightDiv = document.createElement("div");
        toLabelRightDiv.setAttribute("class", "column");
        toHeaders.appendChild(toLabelRightDiv);
        var toLabelRight = document.createElement("label");
        toLabelRight.setAttribute("for", "kitToID");
        toLabelRight.innerHTML = "To:";
        toLabelRightDiv.appendChild(toLabelRight);
        var toText = document.createElement("textarea");
        toText.id = "kitToID";
        toText.setAttribute("rows", "1");
        toText.setAttribute("wrap", "off");
        toText.setAttribute("style", "width: 100%");
        to.appendChild(toText);
        break;
    }
}

function sendRequest() {
    document.getElementById("errorTextareaID").value = "";
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.response.byteLength > 256) {
                var blob = new Blob([xhr.response], { type: "octet/stream" });
                var fileName = "result.zip";
                saveAs(blob, fileName);
                document.getElementById("errorTextareaID").value = "Success!";
            } else {
                var error = String.fromCharCode.apply(null, new Uint8Array(this.response));
                document.getElementById("errorTextareaID").value = JSON.parse(error)['error'];
            }
        }
    }
    xhr.responseType = "arraybuffer";

    var endpoint = ""
    switch (document.getElementById(modeID).value) {
        case 'single':
            xhr.open("POST", "https://bba422lhvfiplopgu5cr.containers.yandexcloud.net/generate");
            xhr.setRequestHeader("text", document.getElementById("kitID").value);
            break;
        case 'list':
            xhr.open("POST", "https://bba422lhvfiplopgu5cr.containers.yandexcloud.net/generate_list");
            var kits = document.getElementById("kitsID").value.replace(/\n/g, ",");
            xhr.setRequestHeader("list", kits);
            break;
        case 'range':
            xhr.open("POST", "https://bba422lhvfiplopgu5cr.containers.yandexcloud.net/generate_range");
            xhr.setRequestHeader("prefix", document.getElementById("kitPrefixID").value);
            xhr.setRequestHeader("start", document.getElementById("kitFromID").value);
            xhr.setRequestHeader("end", document.getElementById("kitToID").value);
            break;
    }
    xhr.setRequestHeader("Content-Type", "text/plain");

    xhr.send();
}