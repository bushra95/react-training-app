import axios from "axios";

function httpRequest(
  _method,
  _endPoint,
  _data = {},
  _params = {},
  onSuccess,
  onError
) {
  axios({
    url: _endPoint,
    method: _method,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    data: _data,
    params: _params
  })
    .then((res) => {
      onSuccess(res);
    })
    .catch(function (e) {
      if (e.response)
        if (e.response.status === 401) {
          onError(e);
        }
      onError(e);
    });
}

export default httpRequest;
