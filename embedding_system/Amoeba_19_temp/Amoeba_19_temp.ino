#include "Adafruit_VL53L0X.h"
#include <Wire.h>
#include <Adafruit_MLX90614.h>
#include <SoftwareSerial.h>
#include <Servo.h>
SoftwareSerial mySerial(10, 11);

Adafruit_VL53L0X lox = Adafruit_VL53L0X();
Adafruit_MLX90614 mlx = Adafruit_MLX90614();
//Servo myservo;

//const int servo_pin = 9;

void setup() {
  Serial.begin(9600);
  mySerial.begin(9600);
  //myservo.attach(9, 580, 2300);

  // wait until serial port opens for native USB devices
  while (! Serial) {
    delay(1);
  }
  mlx.begin(); 
  Serial.println("Adafruit VL53L0X test");
  if (!lox.begin()) {
    Serial.println(F("Failed to boot VL53L0X"));
    while(1);
  }
  // power 
  Serial.println(F("VL53L0X API Simple Ranging example\n\n")); 
}

const int close_angle = 170;
const int open_angle = 120;

void loop() {
  // Close the servo
  //myservo.write(close_angle);
  
  VL53L0X_RangingMeasurementData_t measure;
  double sum = 0;
  while (!mySerial.available()) {}  //等到右方板傳送字元才到下一步
  char serial_result = mySerial.read();
 // Serial.println(serial_result,HEX);
  if (serial_result == 'Y') { //接收到阿米巴傳來的指令 -> "給我溫度"

     // Open the servo
     //myservo.write(open_angle);
     delay(100);
     Serial.print("Reading a measurement... ");
     int n=5;
     while(n){
        lox.rangingTest(&measure, false); // pass in 'true' to get debug data printout!
        if (measure.RangeStatus != 4) {  // phase failures have incorrect data
     
          double distance = measure.RangeMilliMeter;
          double temper = mlx.readObjectTempC()+4.5;
          //Serial.print("Distance (mm): "); Serial.println(distance);
          //Serial.println();
          if(distance <110 && distance >20 && temper < 43 && temper > 30){
            Serial.print(n);
            sum += temper;
//            Serial.print("Distance (mm): "); Serial.println(distance );
//            Serial.println();
//            Serial.print("Ambient = "); Serial.print(temper); 
//            Serial.print("*C\toriginal = "); Serial.print(temper); Serial.println("*C"); 
//            Serial.println();
            n--;
            delay(1000);
          }
          delay(10);
        }
      }
      Serial.println();
      if(sum){
            Serial.print("average = ");
            Serial.println(sum/5);
            mySerial.print(sum/5);
       }
       if (mySerial.read()){
          Serial.println("GET");
          mySerial.flush();
          // Close the servo
          //myservo.write(close_angle);
       }
    }
  
      
  delay(1000);
}
