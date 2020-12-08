import axios from "axios";

axios.post(
    'http://localhost:8080/api/prob',
    {
        "board": [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, -1, 1, 0, 0, 0], [0, 0, 0, 1, -1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
        "cur_player": 1
    })
    .then(function (response) {
        console.log(response.data);
        // alert(response.data);
    })
    .catch(function (error) {
        alert(error);
    });
