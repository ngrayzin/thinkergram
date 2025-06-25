async function post(data) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    redirect: "follow",
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}posts`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    // RETURN ERROR
    console.log(error);
    return { error: true };
  }
}
export default post;
