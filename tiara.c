#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include "DHT.h"
#include <ESP32Servo.h>

// ================= PIN & HARDWARE =================
#define DHTPIN 27
#define DHTTYPE DHT22
const int soilPin = 32;  // Sensor Kapasitif ADC
const int servoPin = 26; // Motor Servo SG90

// ================= OBJECT =================
DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);
Servo myServo;

// ================= KALIBRASI REGRESI LINEAR =================
float a = -0.0157;
float b = 45.4;

// ================= SERVO POSISI (FULL 90 DERAJAT) =================
const int tengah = 90;
const int kanan  = 180; // Full Kanan (Untuk BASAH)
const int kiri   = 0;   // Full Kiri (Untuk KERING)

// ================= STATE MACHINE (ANTI-SPAM) =================
enum SystemState { IDLE, SORTING, DONE };
SystemState currentState = IDLE;
unsigned long servoStartTime = 0;
const unsigned long servoDelay = 10000; // Tahan servo 10 detik

// ================= TIMER =================
unsigned long lastSend = 0;
const unsigned long sendInterval = 3000; // Baca data tiap 3 detik

// ================= FUNGSI BACA ADC =================
int readADCstable(int pin) {
  long total = 0;
  for (int i = 0; i < 10; i++) {
    total += analogRead(pin);
    delay(5);
  }
  return total / 10;
}

// ================= FUNGSI BACA DHT22 =================
bool readDHT(float &suhu, float &hum) {
  suhu = dht.readTemperature();
  hum  = dht.readHumidity();
  return (!isnan(suhu) && !isnan(hum));
}

// ================= FUNGSI KONVERSI KADAR =================
float hitungKadar(int adc) {
  return constrain((a * adc) + b, 0, 100);
}

// ================= FUNGSI STATUS & LOGIKA ARAH =================
String statusJagung(float kadar) {
  // 1. KOSONG: Murni dan tegak lurus HANYA jika di bawah 5.0%
  if (kadar < 5.0) {
    return "KOSONG"; 
  }
  // 2. KERING: Mulai dari 5.0% pass sampai di bawah 10.0%
  else if (kadar >= 5.0 && kadar < 10.0) {
    return "KERING";
  }
  // 3. AMAN: 10.0% sampai 14.0%
  else if (kadar >= 10.0 && kadar <= 14.0) {
    return "AMAN";
  }
  // 4. BASAH: Di atas 14.0%
  else {
    return "BASAH"; 
  }
}

// ================= SETUP =================
void setup() {
  Serial.begin(115200);

  // Inisialisasi LCD
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Inisialisasi...");

  // Inisialisasi Sensor
  dht.begin();
  analogReadResolution(12);

  // Inisialisasi Servo (Pakai trik detach agar tidak getar)
  myServo.setPeriodHertz(50);
  myServo.attach(servoPin);
  myServo.write(tengah);
  delay(1000);
  myServo.detach();

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("SISTEM READY");
  Serial.println("\n=== SYSTEM READY (MODE OFFLINE) ===");
  delay(2000);
}

// ================= LOOP UTAMA =================
void loop() {

  // --- 1. PROSES PEMBACAAN (TIAP 3 DETIK) ---
  if (millis() - lastSend >= sendInterval) {
    lastSend = millis();

    int adc = readADCstable(soilPin);
    float suhu = 0, hum = 0;
    readDHT(suhu, hum);

    float kadar = hitungKadar(adc);
    
    // Panggil fungsi status (hanya butuh parameter kadar sekarang)
    String status = statusJagung(kadar);

    // --- CETAK SERIAL MONITOR ---
    Serial.println("-------------------------");
    Serial.print("ADC: "); Serial.println(adc);
    Serial.print("Kadar: "); Serial.print(kadar); Serial.println(" %");
    Serial.print("Suhu: "); Serial.print(suhu); Serial.println(" C");
    Serial.print("RH: "); Serial.print(hum); Serial.println(" %");
    Serial.print("Status: "); Serial.println(status);
    
    // --- CETAK LCD ---
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("K:");
    lcd.print(kadar, 1);
    lcd.print("% ");
    lcd.print(status);

    lcd.setCursor(0,1);
    lcd.print("T:");
    lcd.print(suhu, 1);
    lcd.print("C H:");
    lcd.print(hum, 0);


    // --- 2. LOGIKA ANTI-SPAM & KONTROL SERVO ---
    
    // A. RESET SISTEM JIKA KOSONG
    if (status == "KOSONG" && currentState == DONE) {
      currentState = IDLE;
      Serial.println(">>> Wadah Kosong. Sistem Siap Menerima Jagung Baru.");
    }

    // B. EKSEKUSI BUANG JAGUNG
    if (status != "KOSONG" && currentState == IDLE) {
      Serial.println("\n>>> MENDETEKSI JAGUNG! MEMULAI SORTIR...");
      
      myServo.attach(servoPin); // Nyalakan motor
      
      if (status == "BASAH") {
        Serial.println(">>> BASAH -> KANAN FULL (180)");
        myServo.write(kanan);
      } 
      else if (status == "KERING") {
        Serial.println(">>> KERING -> KIRI FULL (0)");
        myServo.write(kiri);
      }
      else if (status == "AMAN") {
        Serial.println(">>> AMAN -> TETAP TENGAH (90)");
        myServo.write(tengah);
      }
      
      currentState = SORTING;     
      servoStartTime = millis();  
    }
  }

  // --- 3. AUTO KEMBALI KE TENGAH (SETELAH 10 DETIK) ---
  if (currentState == SORTING && (millis() - servoStartTime >= servoDelay)) {
    Serial.println("\n>>> Waktu Habis. Pintu Kembali Ditutup (Tengah).");
    
    myServo.write(tengah);
    delay(800);             // Tunggu mekanik berputar ke tengah
    myServo.detach();       // Matikan sinyal supaya anti-getar
    
    currentState = DONE;    // Kunci sistem
  }
}