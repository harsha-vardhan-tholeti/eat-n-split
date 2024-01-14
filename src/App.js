import "./App.css";
import Friend from "./components/friend/Friend";
import AddFriend from "./components/add-friend/AddFriend";
import Button from "./utils/button/Button";
import { useEffect, useState } from "react";
import SplitBill from "./components/split-bill/SplitBill";

function App() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const storedFriends = localStorage.getItem("friends");
    if (storedFriends) {
      const parsedFriends = JSON.parse(storedFriends);
      setFriends(parsedFriends);
    }
  }, []);

  const [toggleAddFriend, setToggleAddFriend] = useState(false);
  const [toggleSelect, setToggleSelect] = useState("");

  const handleAddFriendToggle = () => {
    setToggleAddFriend((prev) => !prev);
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center font-mono">
        <div className="flex">
          <div>
            {friends.map((friend) => (
              <Friend
                key={friend.id}
                friend={friend}
                toggleSelect={toggleSelect}
                setToggleSelect={setToggleSelect}
              />
            ))}
            {!toggleAddFriend && (
              <div className="flex justify-end mr-6 my-4">
                <Button onClick={handleAddFriendToggle}>Add Friend</Button>
              </div>
            )}

            {toggleAddFriend && (
              <div className="p-2 float-right">
                <>
                  <AddFriend setFriends={setFriends} />
                  <div>
                    <div className="flex justify-end mt-4">
                      <Button onClick={handleAddFriendToggle}>Close</Button>
                    </div>
                  </div>
                </>
              </div>
            )}
          </div>
          {toggleSelect && (
            <SplitBill
              friends={friends}
              toggleSelect={toggleSelect}
              setFriends={setFriends}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
