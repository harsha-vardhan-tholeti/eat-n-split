import React from "react";
import Button from "../../utils/button/Button";

function Friend({ friend, toggleSelect, setToggleSelect, bills }) {
  const handleSelect = (id) => {
    setToggleSelect((prevId) => (prevId !== id ? id : ""));
  };

  return (
    <div className="flex justify-center items-center p-4 hover:bg-[#fff4e6] rounded">
      <div className="mr-6 basis-4/12">
        <img
          className="rounded-full"
          src={
            friend.imageURL !== "https://i.pravatar.cc/64"
              ? friend.imageURL
              : `https://i.pravatar.cc/64?${friend.id}`
          }
          alt=""
        />
      </div>
      <div className="mr-6 basis-4/5">
        <h3 className="text-xl font-bold tracking-widest">
          {friend.name[0].toUpperCase() + friend.name.slice(1)}
        </h3>

        {!friend.money && (
          <p className="text-black">You and {friend.name} are even</p>
        )}
        {friend.money < 0 && (
          <p className="text-lime-400">
            {friend.name} owe you {Math.abs(friend.money)}
          </p>
        )}
        {friend.money > 0 && (
          <p className="text-red-400">
            You owe {friend.name} {friend.money}
          </p>
        )}
      </div>
      <div className="basis-2/12 flex justify-end">
        <Button onClick={() => handleSelect(friend.id)}>
          {toggleSelect !== friend.id ? "Select" : "Close"}
        </Button>
      </div>
    </div>
  );
}

export default Friend;
