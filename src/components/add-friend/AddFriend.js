import { useState } from "react";
import Button from "../../utils/button/Button";

function AddFriend({ setFriends }) {
  const [friend, setFriend] = useState({ name: "", imageURL: "" });

  const updateFriend = (e) => {
    const { name, value } = e.target;
    setFriend((prevFriend) => ({
      ...prevFriend,
      id: Date.now(),
      [name]: value,
    }));
  };

  const addFriend = (e) => {
    e.preventDefault();
    setFriends((prevFriends) => {
      const updatedFriends = [...prevFriends, friend];
      localStorage.setItem("friends", JSON.stringify(updatedFriends));
      return updatedFriends;
    });
    setFriend({ name: "", imageURL: "" });
  };

  return (
    <div className="bg-[#fff4e6] p-3 rounded-md">
      <form onSubmit={addFriend}>
        <div className="flex justify-between items-center my-2 te">
          <label className="mr-2" htmlFor="name">
            👫 Friend name
          </label>
          <input
            className="h-8 text-center p-4"
            type="text"
            name="name"
            id="name"
            value={friend.name}
            onChange={updateFriend}
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="mr-2" htmlFor="image">
            🌄 Image URL
          </label>
          <input
            className="h-8 text-center p-4"
            type="text"
            name="imageURL"
            id="image"
            value={friend.imageURL}
            onChange={updateFriend}
          />
        </div>
        <div className="flex justify-end mt-4 mb-2">
          <Button>Add</Button>
        </div>
      </form>
    </div>
  );
}

export default AddFriend;
