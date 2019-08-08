//Full Sensor Setup
#include "DHT.h"

#define soilSensorPin A1 
#define DHTPIN 1     // what pin we're connected to
#define DHTTYPE DHT22   // DHT 22  (AM2302)

float soilSensorValue = 0; 
float lightSensorValue = 0; 

// soil/light LED pins
int RGB_red = 5;
int RGB_green = 6;
int RGB_blue = 7;


DHT dht(DHTPIN, DHTTYPE);
void setup()
{
  // to potentiometer ground, potentiometer positive to 5V pin
  // in series with 4.7k ohm R to ground
  pinMode(A2, INPUT);
  
  // to led positive side, in series with 220 ohm R to ground
  pinMode(5, OUTPUT); 

  // LED setup
  pinMode(RGB_red, OUTPUT);
  pinMode(RGB_green, OUTPUT);
  pinMode(RGB_blue, OUTPUT);

  // DHT setup
  dht.begin();
  
  Serial.begin(9600);
}

void loop()
{
  // reading the value from the light sensor
  lightSensorValue = analogRead(A0);
  
  // soil sensor reading
 for (int i = 0; i <= 100; i++) 
 { 
   soilSensorValue = soilSensorValue + analogRead(soilSensorPin); 
   delay(1); 
 } 
 
  soilSensorValue = soilSensorValue/100.0; 

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius
  float t = dht.readTemperature();

  // sensor values from DHT
  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  
  /* 
   *  conversions for moisture sensor and photoresistor resistance readings 
   *  to more meaningful values 
   */
  float soilMoisturePercent = (1043.67 - soilSensorValue)/1043.67 * 100;
  float lightPercent = (1023.00 - lightSensorValue)/1023.00 * 100;

  // for LED output
  float plantHealthScore = (soilMoisturePercent + lightPercent)/200 * 100;

  // config LED outputs
  // soil moisture and light level
  /* soil:
   * cases: red if immediate water needed, 
   * purple if water needed
   * blue if water level sufficient
   * green if good water level
   */
  /* light: (blinking)
   * cases: blink purple if cloudy, 
   * cyan if average sunny, low intensity
   * yellow if high intensity
  */
  
  // red
  if(plantHealthScore < 50.0)
  {
    digitalWrite(RGB_red, LOW);
    digitalWrite(RGB_green, HIGH);
    digitalWrite(RGB_blue, HIGH);
    
  }
  
  // yellow
  else if (plantHealthScore >= 50.0 && plantHealthScore < 60.0)
  {
    digitalWrite(RGB_red, LOW);
    digitalWrite(RGB_green, LOW);
    digitalWrite(RGB_blue, HIGH);
  }

  // blue
  else if(plantHealthScore >= 60.0 && plantHealthScore < 80.0)
  {
    digitalWrite(RGB_red, HIGH);
    digitalWrite(RGB_green, HIGH);
    digitalWrite(RGB_blue, LOW);
  }

  // green
  else if(plantHealthScore >= 80.0)
  {
    digitalWrite(RGB_red, HIGH);
    digitalWrite(RGB_green, LOW);
    digitalWrite(RGB_blue, HIGH);
  }

  
  // printing the sensor outputs on serial monitor
  
  //Serial.print("Photoresistance: ");
  //Serial.print(lightSensorValue);
  Serial.print("Light Intensity: ");
  Serial.print(lightPercent);
  Serial.print(" %");
  Serial.print("\t");
  //Serial.print("\t");
  Serial.print("Soil Moisture: ");
  //Serial.println(soilSensorValue); 
  Serial.print(soilMoisturePercent); 
  Serial.println(" %");
  
  Serial.print("Humidity: "); 
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("\t");
  Serial.print("Temperature: "); 
  Serial.print(t);
  Serial.println(" *C ");

  Serial.print("Total Plant Health Score: "); 
  Serial.print(plantHealthScore);
  Serial.println(" %");
  delay(1000);
}
