const axios = require('axios')
function createRequest() {
    let workshopId = Math.random() + 1;
    let lineId = Math.random() + 1
    let controllerId = (Math.random() + 1) * 18
    let controllerType = (Math.random() + 1) * 3
    let value = Math.random() * 300

    let data = {
        workshopId:     Math.round(workshopId),
        lineId:         Math.round(lineId),
        sensorId:   Math.round(controllerId),
        sensorType: Math.round(controllerType),
        value:          Math.round(value),
    }
    try{
        axios.post('http://127.0.0.1:3000/request/add',data)
    }
    catch (e) {
        console.log(e);
    }
    console.log(data);
}
setInterval(createRequest, 3000);
