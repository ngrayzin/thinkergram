async function getOnePost(id) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}posts/${id}`,
      requestOptions
    );
    const result = await response.json();

    if (result) {
      return result;
    }
  } catch (error) {
    // RETURN ERROR
    console.log(error);
    return { error: true };
  }
}
export default getOnePost;
