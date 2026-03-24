# Edge AI DevKit / IoT Control Dashboard

## Brief About the Project
This project is an IoT-based control system that allows you to remotely control hardware components (LEDs and a motor) using a web dashboard. It consists of a **Node.js Server** that hosts a web interface and an API, and a **Raspberry Pi Pico W** that connects to WiFi, polls the server for commands, and controls the connected hardware. 

The web dashboard provides real-time status and interactive buttons to turn the LEDs ON/OFF and move the motor FORWARD/REVERSE/STOP.

## Deployment
Currently, this project is designed to run locally on your network. There is no active online deployment link. The Node.js server acts as the central hub on your local machine, and the Raspberry Pi Pico connects to it over the local Wi-Fi.

## Code to Run and Save on the Pico Board

To get the Raspberry Pi Pico W working with the dashboard, you need to use the `pico_main.py` file.

### Steps to Setup the Pico:

1. **Hardware Test (Optional)**: 
   You can run `hardware_test.py` from Thonny IDE first to verify that your LEDs (Pins 0, 1, 2) and Motor driver (Pins 14, 15, 16) are wired correctly and working.

2. **Configure the Main Code**:
   Open `pico_main.py` in Thonny (or your preferred MicroPython IDE) and update the following details:
   - `SSID`: Your WiFi network name.
   - `PASSWORD`: Your WiFi password.
   - `SERVER_URL`: The IP address of the machine running your Node.js server (e.g., `http://<YOUR_SERVER_IP>:3001/api/state`).

3. **Save to the Board**:
   To ensure the script runs automatically every time the Pico is powered on, **save `pico_main.py` directly onto the Raspberry Pi Pico board and name it `main.py`**. 

## Running the Local Interface

1. Ensure you have Node.js installed.
2. Install dependencies (if not already installed):
   ```bash
   npm install express
   ```
3. Run the server:
   ```bash
   node server.js
   ```
4. Open a web browser and go to the IP address printed in the terminal (e.g. `http://10.178.78.85:3001`) to access the dashboard.
