import { UserCade } from "./components/UserCard";
import "./styles.css";
import axios from "axios";
import { User } from "./types/api/userapi";
import { useState } from "react";
import { UserProfile } from "./types/useProfile";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState<Array<UserProfile>>([]);
  const onClickuser = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserInfo(data);
      })
      .catch(() => {
        //例外処理的役割
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      }); //finallyでなにがあろうと絶対最後に来る処理を書ける
  };

  return (
    <div className="App">
      <button onClick={onClickuser}>データの取得</button>
      <br />
      {error ? (
        <p>データの取得に失敗しました</p>
      ) : loading ? (
        <p>lodaing...</p>
      ) : (
        <>
          {userInfo.map((user) => (
            <UserCade key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
