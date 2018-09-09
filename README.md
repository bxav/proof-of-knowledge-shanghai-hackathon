# Proof Of Knowledge
This project was developed under 48 hrs for  http://www.blockchainlabs.org/week2018/hack-shanghai-en.html

## Get it sttarted 

### Architecture
> https://github.com/bxav/proof-of-knowledge-shanghai-hackathon/blob/master/architecture.pdf

### Get the code locally
```
git clone https://github.com/bxav/proof-of-knowledge-shanghai-hackathon

# Run one organization without dcore in the middle
docker-compose up -d
(cd lms-dashboard; npm start)
(cd city-app-prototype; ionic serve)
(cd iot-lock-prototype; ionic serve)
(cd iot-lock-prototype; npm run run:android) #build for android
# ToDo containerised all the frontend apps


# Run multi organizations with dcore in the middle
docker-compose up -f docker-compose.dcore.yml -d

```

### Folder Structure

```bash
|city-app-prototype : Prototype of smart city application that allow you to read a course/test/assessment and send back results
|iot-lock-prototype : Prototype of door lock that unlock only if your are certificated
|lms-api : Rest API that manage the course and score for the system (PHP/Symfony/api-platform)
|lms-dashboard : Dashboard to create courses and tests. Connect to the lms-api
```
