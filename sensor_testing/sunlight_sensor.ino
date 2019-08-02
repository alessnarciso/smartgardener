void setup()
{
  // to potentiometer ground, potentiometer positive to 5V pin
  // in series with 4.7k ohm R to ground
  pinMode(A2, INPUT);
  
  // to led positive side, in series with 220 ohm R to ground
  pinMode(5, OUTPUT); 
  
  Serial.begin(9600);
}

void loop()
{
  // reading the value from the sensor
  sensorValue = analogRead(A0);
  
  // printing the sensor output
  Serial.println(sensorValue);
}
