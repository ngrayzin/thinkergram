async function post(id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
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
