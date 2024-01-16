import React, { useEffect, useState } from "react";
import { Users } from "./../Model/DataModel";
import Chip from "./Chip";
import "../Styles/DataStyles.css"; 

const Data = () => {
  const [data, setData] = useState<Users[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState<Users[]>([]);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/users")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  const handleInputClick = () => {
    setIsActive(!isActive);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter the data based on the input value
    const filtered = data.filter((userData) =>
      userData.name.toLowerCase().includes(value.toLowerCase())
    );

    // Exclude the items that are already selected as chips
    const remainingFilteredData = filtered.filter(
      (userData) => !selectedChips.includes(userData.name)
    );

    setFilteredData(remainingFilteredData);
  };

  const handleItemClick = (name: string) => {
    setSelectedChips([...selectedChips, name]);

    // Remove the clicked item from the filteredData
    const updatedFilteredData = filteredData.filter(
      (userData) => userData.name !== name
    );

    setInputValue("");
    setFilteredData(updatedFilteredData);
  };

  const handleChipRemove = (name: string) => {
    // Remove the chip from selectedChips
    const updatedChips = selectedChips.filter((chip) => chip !== name);
    setSelectedChips(updatedChips);

    // Find the index of the item in the original data
    const originalIndex = data.findIndex((userData) => userData.name === name);

    // Insert the item back to its original position in the filteredData
    if (originalIndex !== -1) {
      const updatedFilteredData = [...filteredData];
      updatedFilteredData.splice(originalIndex, 0, data[originalIndex]);
      setFilteredData(updatedFilteredData);
    }
  };

  return (
    <>
      <div className="container">
        <div className="chipsContainer">
          {selectedChips.map((chipName, index) => (
            <Chip
              key={index}
              name={chipName}
              onRemove={() => handleChipRemove(chipName)}
              className="chip"
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="Type to filter users"
          value={inputValue}
          onClick={handleInputClick}
          onChange={handleInputChange}
          className="inputField"
        />
        {isActive && (
          <div>
            {filteredData && filteredData.length > 0 ? (
              <>
                {filteredData.map((userData: Users) => (
                  <div
                    key={userData.id}
                    onClick={() => handleItemClick(userData.name)}
                    className="userDataItem"
                  >
                    {userData.name}
                  </div>
                ))}
              </>
            ) : (
              <div style={{ color: "red" }}>No matching users</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Data;
