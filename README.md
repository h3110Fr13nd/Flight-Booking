# Flight-DBMS

A flight booking Django application written in Python, HTML, CSS & Javascript. It uses PostgreSQL Database to store all the data.

### Installation

- Install Docker

  ```bash
  sudo apt  install docker.io
  ```
- Install JRE

  ```bash
  sudo apt install openjdk-11-jre
  ```
- Install Jenkins
- ```bash
  sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
    https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
  echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
    /etc/apt/sources.list.d/jenkins.list > /dev/null
  sudo apt-get update
  sudo apt-get install jenkins
  ```
- Go to Jenkins on 8080 Port
- Create a New Agent
- Add Git Server Plugin with personal access token authentication
- Create a Job with git as Source
- You might need to add jenkins into the sudo group. To allow it to execute Sudo commands:

  ```bash
  visudo -f /etc/sudoers
  ```
  - Add the following at the end of the file
  - ```
    jenkins ALL= NOPASSWD: ALL
    ```
- Execute Shell Commands

  ```
  sudo docker build . -t flight-booking
  sudo docker run -d -p 8000:8000 flight-booking
  ```
- Save and build.
- Flight Booking Website : http://ec2-54-196-232-139.compute-1.amazonaws.com:8001
- Jenkins : http://ec2-54-196-232-139.compute-1.amazonaws.com:8080
