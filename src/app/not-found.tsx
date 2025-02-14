import Error from "../components/error";

const NotFound = () => {
  return <Error code={404} message="Oops! This page does not exist!" />;
};

export default NotFound;
