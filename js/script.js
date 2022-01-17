function getRandNum(min,max){
  return min + Math.floor(Math.random() * (max-min+1))
}

function verdict(val){
  return +val < 4 ? `Are you seriously??  Just ${val} right answers? LoL you are really retard)))` : +val < 7 ?  `Some schoolboys have betters results then you. Hahahaha))` : +val < 9 ? `Allright, ${val} right answers is not bad, but you can better.` : +val  < 10 ? `Good job dudde, you was near to excellent work, try again and done all 10/10, goodluck! We trust in you!` : 'Omg omg!! all 10/10 right answers!! Are you cheater? no, i know, you are Wonderkind!'
}

let history = {
  tasks: [],
  rightAnswer: [],
  userAnswer: [],
  totalRightAnswers: 0,
}

function random(){
  document.getElementsByName('firstNum')[0].value = getRandNum(0,100)
  document.getElementsByName('secondNum')[0].value = getRandNum(0,100)
  const operations = ['+','-','*','/']
  document.getElementById('operation').innerHTML = operations[getRandNum(0,3)]
  if (document.getElementById('operation').innerHTML == '/')
    document.getElementsByName('secondNum')[0].value = getRandNum(1,100)
  
  document.getElementsByName('answer')[0].value = ''
  
  const resultDiv = document.getElementById('result')
  resultDiv.innerText = '_______'
  resultDiv.style.color='black'
  
  document.getElementById('tasksCount').innerHTML = +document.getElementById('tasksCount').innerText+1
  
  document.getElementById('btn').setAttribute('onclick','check()')
  document.getElementById('btn').innerText = 'check'
} 

function check(){
  const fNum = +document.getElementsByName('firstNum')[0].value
  const sNum = +document.getElementsByName('secondNum')[0].value
  const operation = document.getElementById('operation').innerText
  history.tasks.push(`${fNum} ${operation} ${sNum}`)
  
  let result
  if (operation == '+')
    result = fNum + sNum
  else if (operation == '-')
    result = fNum - sNum
  else if (operation == '*')
    result = fNum * sNum
  else 
    result = fNum / sNum
  history.rightAnswer.push(+result.toFixed(2))
  
  let answer = document.getElementsByName('answer')[0].value
  if (answer == '')
    answer = 'no answer'
  history.userAnswer.push(answer)
  answer = parseFloat(answer)
  
  const resultDiv = document.getElementById('result')
  if (answer != 'no answer' && answer.toFixed(2) == result.toFixed(2)){
    resultDiv.innerText = 'Correct!'
    resultDiv.style.color='green'
  } else {
    resultDiv.innerText = 'Incorrect!'
    resultDiv.style.color='red'
  }

  const btn = document.getElementById('btn')
  if (document.getElementById('tasksCount').innerText != '10'){
    btn.setAttribute('onclick','random()')
    btn.innerText = 'Next'
  } else {
    btn.setAttribute('disabled','disabled')
    btn.innerText = 'Tasks complated!'
    const rows = document.querySelectorAll('.rows')
    
    rows.forEach((r,index,arr) => {
      const tds = arr[index].getElementsByTagName('td')
      for(let i = 0; i < 3; i++){
        tds[i].innerText = i == 0 ? history.tasks[index] : i == 1 ? history.rightAnswer[index] : history.userAnswer[index]
      }
      if (tds[1].innerText == tds[2].innerText){
        tds[2].style.backgroundColor = 'green'
        history.totalRightAnswers++
      } else
        tds[2].style.backgroundColor = 'red'
    })
    document.getElementById('totalRightAnswers').innerText = history.totalRightAnswers
    document.getElementById('verdict').innerHTML = verdict(history.totalRightAnswers)
    
    document.getElementById('res').style.display='block'
  }
}
