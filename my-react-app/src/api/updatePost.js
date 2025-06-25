async function post(id, data) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    redirect: "follow",
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}posts/${id}`,
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
