import React, { useEffect, useState } from "react";
import Button from "../../utils/button/Button";

function SplitBill({ friends, toggleSelect, setFriends }) {
  const friend = friends.filter((friend) => friend.id === toggleSelect);

  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  const [bill, setBill] = useState({
    id: friend[0].name,
    billValue: "",
    myExpense: "",
    friendExpense: "",
    paying: "You",
  });

  const handleBill = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let updatedFriendExpense = bill.friendExpense;
    if (name === "myExpense") {
      updatedFriendExpense = bill.billValue - value;
    }
    setBill((prev) => ({
      ...prev,
      [name]: value,
      friendExpense: updatedFriendExpense,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const friendToUpdate = friends.find((friend) => friend.id === toggleSelect);
    console.log(friendToUpdate);

    if (friendToUpdate) {
      const prevMoney = friendToUpdate.money || 0;
      const presentMoney =
        bill.paying === "You"
          ? -Number(bill.friendExpense)
          : Number(bill.myExpense);

      const updatedFriends = friends.map((friend) => {
        if (friend.id === toggleSelect) {
          return {
            ...friend,
            money: prevMoney + presentMoney,
          };
        }
        return friend;
      });

      console.log(updatedFriends);
      setFriends(updatedFriends);
      localStorage.setItem("friends", JSON.stringify(updatedFriends));
      setBill({
        id: friend[0].name,
        billValue: "",
        myExpense: "",
        friendExpense: "",
        paying: "You",
      });
    }
  };

  return (
    <div className="bg-[#FFF4E6] rounded-md p-6 ml-4">
      <h1 className="uppercase font-extrabold text-2xl mb-6">
        Split A Bill With {friend[0].name}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center my-2">
          <label className="mr-2" htmlFor="billValue">
            💰 Bill value
          </label>
          <input
            className="h-8 text-center p-4"
            type="text"
            name="billValue"
            id="billValue"
            value={bill.billValue}
            onChange={handleBill}
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="mr-2" htmlFor="myExpense">
            🧍‍♀️ Your expense
          </label>
          <input
            className="h-8 text-center p-4"
            type="text"
            name="myExpense"
            id="myExpense"
            value={bill.myExpense}
            onChange={handleBill}
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="mr-2" htmlFor="friendExpense">
            👫 {friend[0].name}'s expense
          </label>
          <input
            className="h-8 text-center p-4"
            type="text"
            name="friendExpense"
            id="friendExpense"
            value={
              bill.myExpense ? bill.billValue - bill.myExpense : bill.billValue
            }
            onChange={handleBill}
          />
        </div>
        <div className="flex justify-between items-center my-2 te">
          <label className="mr-2" htmlFor="paying">
            🤑 Who is paying the bill
          </label>
          <select
            name="paying"
            id="paying"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FFF4E6] block p-2.5"
            onChange={handleBill}
          >
            <option value="You">You</option>
            <option value={friend[0].name}>{friend[0].name}</option>
          </select>
        </div>
        <div className="flex justify-end">
          <Button>Split Bill</Button>
        </div>
      </form>
    </div>
  );
}

export default SplitBill;
