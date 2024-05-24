import Cookies from "js-cookie";

const Cookies = () => {
    const token = Cookies.get("token");
    console.log(token);
  return (
    <div>Cookies</div>
  )
}

export default Cookies