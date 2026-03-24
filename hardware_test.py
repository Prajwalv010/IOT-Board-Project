from machine import Pin, PWM
from time import sleep

# --- LEDs on GPIO 0, 1, 2 ---
led0 = Pin(0, Pin.OUT)
led1 = Pin(1, Pin.OUT)
led2 = Pin(2, Pin.OUT)

# --- Motor: IN1=14, IN2=15, EN12=16 (PWM) ---
IN1 = Pin(14, Pin.OUT)
IN2 = Pin(15, Pin.OUT)
EN12 = PWM(Pin(16))
EN12.freq(1000)
EN12.duty_u16(int(65535 * 0.80))  # 80% speed

# ===== TEST 1: Blink all LEDs 3 times =====
print("TEST 1: Blinking LEDs on GPIO 0, 1, 2...")
for i in range(3):
    led0.value(1)
    led1.value(1)
    led2.value(1)
    print(f"  LEDs ON  (blink {i+1})")
    sleep(1)
    led0.value(0)
    led1.value(0)
    led2.value(0)
    print(f"  LEDs OFF (blink {i+1})")
    sleep(1)

# ===== TEST 2: Motor Forward for 3 sec =====
print("TEST 2: Motor FORWARD for 3 seconds...")
IN1.high()
IN2.low()
sleep(3)

# ===== TEST 3: Motor Reverse for 3 sec =====
print("TEST 3: Motor REVERSE for 3 seconds...")
IN1.low()
IN2.high()
sleep(3)

# ===== STOP everything =====
IN1.low()
IN2.low()
EN12.duty_u16(0)
led0.value(0)
led1.value(0)
led2.value(0)
print("✅ All tests done. Everything OFF.")
