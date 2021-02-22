import React, { useState, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";

const SearchBar = () => {
  const contactContext = useContext(ContactContext);
  const { searchContact, removeSearch } = contactContext;

  const [searchValue, setSearchValue] = useState("");

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const searchTheContact = (e) => {
    if (e.target.value === null || e.target.value === "") {
      removeSearch();
    } else {
      searchContact(searchValue.toLowerCase());
    }
  };

  return (
    <div className="srch-tab bg-semi-med py-2">
      <div className="container container-med">
        <div className="srch-box">
          <i className="fa fa-search primary"></i>
          <input
            type="text"
            name="search"
            className="search primary pl-1"
            placeholder="Search Contacts"
            onChange={onChange}
            onKeyUp={searchTheContact}
            value={searchValue}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
