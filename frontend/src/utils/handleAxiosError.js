export function handleAxiosError(error) {
  let errorMessage = "An unexpected error occurred"; // Default message

  if (error.response) {
    // The server responded with a status outside the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    errorMessage = error.response.data.message || "An unexpected error occurred";
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
    errorMessage = "No response from the server. Please check your network connection.";
  } else {
    // Something else happened in setting up the request that triggered an error
    console.log('Error', error.message);
    errorMessage = "Error setting up the request.";
  }

  return errorMessage;
}