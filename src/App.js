import { useState } from "react";
import "./App.css";
import Box from "./component/Box";

// 1. 유저는 박스 2개를 볼 수 있다(타이틀, 사진, 결과)
// 2. 유저는 박스 하단에 가위바위보 버튼을 볼 수 있다
// 3. 버튼을 클릭하면 클릭한 아이템이 유저 박스에 보인다
// 4. 버튼을 클릭하면 컴퓨터 아이템은 랜덤하게 선택 된다
// 5. 3번, 4번의 아이템을 가지고 누가 이겼는지 승패를 나눈다
// 6. 승패 결과에 따라 테두리 색이 바뀐다. 지면 빨간색, 이기면 초록색, 비기면 검은색으로 변한다

// 유저가 선택한 아이템의 사진과 이름을 가지고 있는 객체
const choice = {
  rock:{
    name:"Rock",
    img:"https://w7.pngwing.com/pngs/813/449/png-transparent-rostrevor-county-down-cloughmore-slieve-martin-rock-stones-and-rocks-stone-rock-boulder.png"
  },
  scissors:{
    name:"Scissors",
    img:"https://cdn.pixabay.com/photo/2017/02/01/10/46/avatar-2029577_1280.png"
  },
  paper:{
    name:"Paper",
    img:"https://www.collinsdictionary.com/images/full/paper_111691001.jpg"
  }
}

function App() {
  const [userSelect,setUserSelect] = useState(null) // 유저가 고른 아이템
  const [computerSelect,setComputerSelect] = useState(null) // 컴퓨터가 고른 아이템
  // 승패의 값을 보여주는 state
  const [result,setResult] = useState("")

  // play => 유저가 선택한 아이템
  const play=(userChoice)=>{
    setUserSelect(choice[userChoice])
    // 유저가 아이템을 선택한 후에 컴퓨터가 무작위로 고른 아이템
    let computerChoice = randomChoice()
    // 컴퓨터가 선택한 아이템을 computerChoice의 값으로 초기화
    setComputerSelect(computerChoice)
    setResult(judgement(choice[userChoice],computerChoice)) // 유저 선택값, 컴퓨터 선택값
  }

// 승패를 판단해주는 judgement 함수
const judgement = (user,computer) => {
  console.log("user",user,"computer",computer) // 유저 선택값, 컴퓨터 선택값

  // user == computer => 비김(tie)
  // user == rock, computer == scissors => 유저 승리
  // user == rock, computer == paper => 유저 패배
  // user =- scissors, computer == paper => 유저 승리
  // user == scissors, computer == rock => 유저 패배
  // user == paper, computer == rock => 유저 패배
  // user paper, computer == scissors => 유저 패배
  if(user.name == computer.name) { // 둘이 같은 걸 내면 무승부
    return "tie"
  }else if(user.name == "Rock") {
    return computer.name == "Scissors"?"win":"lose" // 유저가 바위를 내고 컴퓨터가 가위면 유저 승리, 가위가 아니면 유저 패배
    }else if(user.name=="Scissors") {
      return computer.name == "Paper"?"win":"lose"
    }else if(user.name == "Paper") {
      return computer == "Rock"?"win":"lose"
    }
}

const randomChoice=()=>{
  // 객체의 키값 가위, 바위, 보를 배열의 아이템에 넣기
  let itemArray = Object.keys(choice) // Object.keys() => 객체의 키값만 뽑아서 배열로 만들어주는 함수
  // console.log("item array", itemArray)

  let randomItem = Math.floor(Math.random()*itemArray.length) // 소수점을 버리고 일의 자리만 읽어서 인덱스 번호 판별
  // console.log("random value : ", randomItem)

  // 숫자 대신 선택된 이름이 나오게 변경
  let final = itemArray[randomItem]
  // console.log("final", final)
  return choice[final]
}

  return (
    <div>
      <div className="main">
        <Box title="You" item={userSelect} result={result}></Box>
        <Box title="Computer" item={computerSelect} result={result}></Box>
      </div>

      <div className="main">
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    </div>
  );
}

export default App;
