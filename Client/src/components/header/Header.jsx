import React, {useContext, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBell, faBed, faPlane, faCar, faCalendarDays, faImage} from "@fortawesome/free-solid-svg-icons"
import "./header.css";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css
import {format} from "date-fns"
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../contex/SearchContext';
import { AuthContext } from '../../contex/authContext';

const Header = ({type}) => {
  
  const [destination, setDestination] = useState("")
  
  const [openDate, setOpenDate] = useState(false)  
  
  const [openOptions, setOpenOptions] = useState(false);
  
  const [dates, setDates] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1
  })
  
const navigate = useNavigate()

const {user} = useContext(AuthContext)


  const handleOption = (name, operation) => {
    setOptions(prev => {
      return {
        ...prev, [name]: operation === "i" ? options[name] +1 : options[name] -1,
      };
    });
  };

  const {dispatch} = useContext(SearchContext)

  const handleSearch = () => {
    dispatch({type:"NEW_SEARCH", payload:{destination, dates, options}})
    navigate("/hotels", {state: {destination, dates, options}})
  }
  
  return (
    <div className='header'>
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"} >
      <div className='headerList'>
        <div className='headerListItem active'>
          <FontAwesomeIcon icon={faBed} />
          <span>Stays</span>
        </div>
        <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
        </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Airport taxis</span>
          </div>
       </div>
       { type !== "list" && dates !== "" &&
         <>
            <h1 className='headerTitle'>A lifetime of discounts? Its' Genius.</h1>
          <p className='headerDesc'>Get reward for your travels - unlock instant saving of 10% or more with a free booking account</p>
          {!user && <button className='headerBtn'>Sign in / Registration</button>}
          <div className='headerSearch'>
              <div className="headerSearchItem">
              <FontAwesomeIcon icon={faBell}  className="headerIcon"/>
              <input type="text" placeholder="Where are you going?" className="headerSearchInput"  onChange={(e) => setDestination(e.target.value)}/>
              </div>
              <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays}  className="headerIcon"/>
              <span onClick={()=>setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                {  
                  openDate && (
                  <DateRange className='date' minDate={new Date()} editableDateInputs={true} onChange={item => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates}/>
                )}
              </div>
              <div className="headerSearchItem">
              <FontAwesomeIcon icon={faImage}  className="headerIcon"/>
              <span onClick={()=> setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
              {
                openOptions && (<div className="options">
                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button className="optionCounterButton" disabled={options.adult <= 1} onClick={()=> handleOption("adult", "d")}>-</button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button className="optionCounterButton" onClick={()=> handleOption("adult", "i")}>+</button>
                  </div>              
                </div>
                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                      <button className="optionCounterButton" disabled={options.children <= 0} onClick={()=> handleOption("children", "d")}>-</button>
                      <span className="optionCounterNumber">{options.children}</span>
                      <button className="optionCounterButton" onClick={()=> handleOption("children", "i")}>+</button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                      <button className="optionCounterButton" disabled={options.room <= 1} onClick={()=> handleOption("room", "d")}>-</button>
                      <span className="optionCounterNumber">{options.room}</span>
                      <button className="optionCounterButton" onClick={()=> handleOption("room", "i")}>+</button>
                  </div>
                </div>
              </div>
              )}
              </div>
              <div className="headerSearchItem">
                <button className='headerBtn' onClick={handleSearch}>Search</button>
              </div>
          </div>   
         </>
       }
      </div>
    </div>
  )
}

export default Header