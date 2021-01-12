var state = 0;
// 0: Unmeasured
// 1: Excceed once
// 2: Excceed twice
// 3: ok

const temp_threshold = 37.5;

function updateTemp(temp) {
  // Update the state
  if (state == 2 || state == 3) return;
  if (temp < temp_threshold) {
    state = 3;
  } else {
    state = Math.min(state + 1, 2);
  }

  // Update the displayed temperature
  document.querySelectorAll(".temp").forEach((e) => {
    e.innerText = temp;
  });

  // Show the coresponsed card
  document.querySelector("#pending").style.display = "none";
  document.querySelector("#ok").style.display = "none";
  document.querySelector("#warning").style.display = "none";
  document.querySelector("#danger").style.display = "none";
  switch (state) {
    case 0:
      document.querySelector("#pending").style.display = "block";
      break;
    case 1:
      document.querySelector("#warning").style.display = "block";
      break;
    case 2:
      document.querySelector("#danger").style.display = "block";
      break;
    case 3:
      document.querySelector("#ok").style.display = "block";
      window.setTimeout(() => {
        // [TODO] Redirect to next page
        alert("redirected");
      }, 2000);
      break;
  }
}

// MQTT subscribtion params
// For demo only, forget security
const device_key = "DKS75FFBRE2KA1BKHZ";
const ws_uri = " wss://iot.cht.com.tw:443/iot/ws/rawdata";
const device_id = "25622793175";
const sensor_id = "temp";
const subscribe_req = `{"ck":"${device_key}","resources":["/v1/device/${device_id}/sensor/${sensor_id}/rawdata"]}`;

// Flag to ignore first data
var firstTemp = true;

var tempSocket = new WebSocket(ws_uri);

tempSocket.onopen = function () {
  tempSocket.send(subscribe_req);
};

tempSocket.onmessage = function (e) {
  // Ignore first data
  if (firstTemp) {
    firstTemp = false;
    return;
  }

  // Parse the message
  let msg = JSON.parse(e.data);

  // Mismatched data
  if (msg.value.length != 1) return;
  updateTemp(msg.value[0]);
};
