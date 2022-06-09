import React, { useEffect, useState } from "react";
import moment from 'moment';

const Todo = () => {
  const [data, setData] = useState("none");
  const [input, setInput] = useState("");
  const [time, setTime] = useState();
  const [inputTime, setInputTime] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [checked,setChecked]=useState(false)
  const[color,setColor]=useState()
  const [task, setTask] = useState([
    {
      id: 1,
      name: "start making a presentation",
      isChecked:true,
      date:" 14-04-2022",
      time: "2:19",
     showColor: "green"
    }

  ]);
  

  const startBtn = () => {
    setData("block");
  };
  const cancelBtn = () => {
    setData("none");
  };
  let addBtn = (e) => {
    e.preventDefault();
    if (!input) {
      let addClass = document.getElementById("valid");
      addClass.classList.add("is-invalid");
    } else {
      const newData = {
        id: Math.random(),
        name: input,
        isChecked:checked,
        date: inputDate,
        time: inputTime,
      showColor: color
        
      };
      setTask([...task, newData]);
      setInput("");
      setData("none");
      let addClass = document.getElementById("valid");
      addClass.classList.remove("is-invalid");
      setInputTime("")
      setInputDate("")
    }
    
   
  } 
// Reminder-----

useEffect(()=>{
 const getDates=()=>{
  let dates=moment()
  let a=inputDate
  switch(true){
    case (moment("14-04-2022").isSame(a)):
  
      setColor("yellow");
  
      break;
  
      case(moment(dates.format('YYYY-MM-DD')).isAfter(a)):
  
      setColor("green")
  
      break;


      default:
        setColor("red")
  }
 }
 getDates()
},[])



    
  // current time on screen
  const onloadHandle = () => {
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMinutes = currentTime.getMinutes();
    let currentTimeStr = currentHour + ":" + currentMinutes;
    setTime(currentTimeStr);
  };
  setInterval(() => {
    onloadHandle();
  }, 1000);
 
  


 
  return (
    <>
      <div className="container">
        <div className="row my-5">
          <div className="col-lg-4 mx-auto main-container">
            <div className="header-container d-flex justify-content-between my-2">
              <div className="time ms-3" id="a" onLoad={onloadHandle}>
                {time}
              </div>
              <div className="media">
                <span>
                  <i className="bi bi-reception-4"></i>
                </span>
                <span>
                  <i className="bi bi-wifi w-4.63px"></i>
                </span>
                <span>
                  <i className="bi bi-battery-full w-18px"></i>
                </span>
              </div>
            </div>
            <div className="add-todoContainer my-3">
              <h3>Today</h3>
              <div>
                <i
                  className="bi bi-plus-circle text-primary"
                  onClick={startBtn}
                ></i>
              </div>
            </div>
            <div id="typeText" style={{ display: `${data}` }}>
              <h6>Add Todo</h6>
              <textarea
                className="form-control"
                id="valid"
                rows="6"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              ></textarea>
              <p>Choose Date and Time</p>
              <div className="date-time">
                <input
                  className="dates"
                  type="date"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)} />
                <input
                  className="times"
                  type="time"
                  value={inputTime}
                  onChange={(e) => {
                    setInputTime(e.target.value);
                  }}
                />
              </div>
              <div className="buttons">
                <button onClick={cancelBtn}>Cancel</button>
                <button onClick={addBtn}>Done</button>
              </div>
            </div>
            <div className="show-todoContainer my-3">
              {              
              task.map((item) => {
                return (
                  <div className="todo-content" key={item.id}>
                    <form action="">
                     
                      <input type="checkbox" value={item.isChecked}
                      onChange={(e)=>{setChecked(e.target.value)}}/>
                    </form>
                    <div className="name">
                      <p>{item.name}</p>
                      <h6 className="date">{item.date}</h6>
                      <h6 className="date">{item.time}</h6>

                      <div
                        className="reminder"  style={{backgroundColor:`${item.showColor}`}} 
                      ></div>
                    </div>
                  </div>
                );
              })}
                
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
