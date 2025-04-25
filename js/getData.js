function getData(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let respoonseJson = xhr.response;
      response = JSON.parse(respoonseJson);
      callback(response);
    }
  };
  xhr.timeout = 10000;

  xhr.open("get", url);
  xhr.send();
}
