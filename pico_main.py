import network
import requests
import json
import time
from machine import Pin, PWM

# ==========================================
# 1. HARDWARE PINS CONFIGURATION
# ==========================================
led0 = Pin(0, Pin.OUT)
led1 = Pin(1, Pin.OUT)
led2 = Pin(2, Pin.OUT)

IN1 = Pin(14, Pin.OUT)
IN2 = Pin(15, Pin.OUT)
EN12 = PWM(Pin(16))
EN12.freq(1000)
EN12.duty_u16(int(65535 * 0.80))

# ==========================================
# 2. LOCAL WIFI CONFIGURATION
# ==========================================
SSID = "Mahesh's A55"
PASSWORD = "binka1865"

# The API Endpoint on your laptop
SERVER_URL = "http://10.178.78.85:3001/api/state"

# ==========================================
# MOTOR HELPER FUNCTIONS
# ==========================================
def motor_forward():
    IN1.high()
    IN2.low()

def motor_reverse():
    IN1.low()
    IN2.high()

def motor_stop():
    IN1.low()
    IN2.low()

def leds_on():
    led0.value(1)
    led1.value(1)
    led2.value(1)

def leds_off():
    led0.value(0)
    led1.value(0)
    led2.value(0)

# Start safely OFF
leds_off()
motor_stop()

# ==========================================
# WIFI CONNECTION
# ==========================================
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
if not wlan.isconnected():
    print('Connecting to WiFi...', end='')
    wlan.connect(SSID, PASSWORD)
    while not wlan.isconnected():
        print(".", end="")
        time.sleep(0.5)
print('\n✅ Connected!')
print('Pico IP:', wlan.ifconfig()[0])

# ==========================================
# INFINITE POLLING LOOP
# ==========================================
print("Starting HTTP Polling from:", SERVER_URL)

while True:
    try:
        # Fetch the latest state from the laptop
        response = requests.get(SERVER_URL, timeout=2)
        command = response.json()
        response.close() # Always close the connection
        
        led_val = command.get("led", "OFF")
        motor_val = command.get("motor", "STOP")
        
        print(f"📡 Fetched Data -> LED: {led_val} | Motor: {motor_val}")

        # --- LED Control ---
        if led_val == "ON":
            leds_on()
        else:
            leds_off()

        # --- Motor Control ---
        if motor_val == "FORWARD":
            motor_forward()
        elif motor_val == "REVERSE":
            motor_reverse()
        else:
            motor_stop()
            
    except OSError as e:
        print("Network Error or Timeout:", e)
        # Re-connect wifi if disconnected
        if not wlan.isconnected():
             print("Lost WiFi connection, reconnecting...")
             wlan.connect(SSID, PASSWORD)
    except ValueError as e:
        print("JSON Decode Error:", e)
    except Exception as e:
        print("❌ Unexpected Error:", e)
        
    # Poll every 0.5 seconds
    time.sleep(0.5)
