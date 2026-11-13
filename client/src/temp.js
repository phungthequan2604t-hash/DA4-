const dayjs = require('dayjs');


const current = dayjs()
const another = dayjs()
const formatChange = current.format('YYYY-MM-DDTHH:mm')
const anotherChange = another.format('YYYY-MM-DDTHH:mm')

// const another = current.add(1,'day').format('YYYY-MM-DDTHH:mm')
// console.log(formatChange);
// console.log(anotherChange);
// console.log(typeof(anotherChange));
if(formatChange==anotherChange){
    // console.log("THis is fun");
}
else{
    // console.log("nnot so fun");
}
const dataToSend = {
  date: '2024-06-24',
  time: '15:30',
};

const formattedDateTime = dayjs(dataToSend).format("YYYY-MM-DDTHH:mm:ss");

// Send formattedDateTime using your preferred method (e.g., // console.log, API call)
// console.log(formattedDateTime); // Output: 2024-06-24T15:30:00



