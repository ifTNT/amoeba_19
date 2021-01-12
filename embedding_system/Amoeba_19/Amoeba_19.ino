int LED = 13;
#include <SoftwareSerial.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <NfcTag.h>
SoftwareSerial mySerial(0, 1); // RX, TX
double temp;

char ssid[] = "chin";     // your network SSID (name)
char pass[] = "123abc456def";  // your network password

char mqttServer[] = "iot.cht.com.tw";

char clientId[]       = "amebaClient";
char clientUser[]     = "DKS75FFBRE2KA1BKHZ";
char clientPass[]     = "DKS75FFBRE2KA1BKHZ";
char publishTopic[]   = "/v1/device/25622793175/rawdata";
char publishPayload[512] = "";

int status  = WL_IDLE_STATUS;    // the Wifi radio's status

void callback(char* topic, byte* payload, unsigned int length) {
  // handle message arrived
}

WiFiClient wifiClient;
PubSubClient client(mqttServer, 1883, callback, wifiClient);

void setup() {
  while(!Serial);
  pinMode(LED, OUTPUT);
  mySerial.begin(9600);
  mySerial.setTimeout(100);
  NfcTag.appendRtdUri("vireality.world");
  NfcTag.begin();
}

void loop() {
  // Reconnect to WiFi if connection loss
  if(status != WL_CONNECTED){
    while (status != WL_CONNECTED) {
      Serial.print("Attempting to connect to SSID: ");
      Serial.println(ssid);
      // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
      status = WiFi.begin(ssid, pass);
  
      // wait 10 seconds for connection:
      delay(10000);
    }
  }
  Serial.println("Reading teamperature");
  mySerial.write('Y');   //在 TX 送出字元 Y 給對方

  unsigned long long timer_begin = millis();
  while (!mySerial.available()){
    // Added timeout to prevent deadlock
    if(millis()-timer_begin>=10000) return;  
  } 
  temp = mySerial.parseFloat();
  mySerial.write("Get");
  char float_str[6];
  //dtostrf(temp, 4, 2, float_str);
  Serial.println(temp);
  sprintf(publishPayload, "[{'id':'temp','value':['%.1f']}]", temp);
  Serial.println("Connecting to MQTT");
  if(client.connect(clientId, clientUser, clientPass)){
    Serial.println("Connected to MQTT broker");
    Serial.print("Publishing ");
    Serial.println(publishPayload);
  
    if(client.publish(publishTopic, publishPayload)){
      Serial.println("Message published");
    }
  }else{
    status = WL_IDLE_STATUS;
  }
  client.loop();
}

void led_blink() {
  digitalWrite(LED, HIGH);
  delay(1000);
  digitalWrite(LED, LOW);
  delay(500);
}
