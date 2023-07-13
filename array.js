// just a testing file
// let arr = [
//   [
//     {
//       0: "http://the-internet.herokuapp.com/img/avatars/Original-Facebook-Geek-Profile-Avatar-2.jpg",
//     },
//     {
//       1: "http://the-internet.herokuapp.com/img/avatars/Original-Facebook-Geek-Profile-Avatar-5.jpg",
//     },
//     {
//       2: "http://the-internet.herokuapp.com/img/avatars/Original-Facebook-Geek-Profile-Avatar-1.jpg",
//     },
//   ],
//   [
//     {
//       0: "http://the-internet.herokuapp.com/img/avatars/Original-Facebook-Geek-Profile-Avatar-6.jpg",
//     },
//     {
//       1: "http://the-internet.herokuapp.com/img/avatars/Original-Facebook-Geek-Profile-Avatar-1.jpg",
//     },
//     {
//       2: "http://the-internet.herokuapp.com/img/avatars/Original-Facebook-Geek-Profile-Avatar-1.jpg",
//     },
//   ],
// ];

// for (const elem of arr) {
//   for (let i = 0; i <= elem.length; i++) {
//     console.log(elem[i][0]);
//   }
// }

const arrayOfObjects = [
  [
    {
      0: "http://the-internet.herokuapp.com/img/avatars/Original-Facebook-Geek-Profile-Avatar-2.jpg",
    },
    {
      1: "http://the-internet.herokuapp.com/img/avatars/Original-Facebook-Geek-Profile-Avatar-5.jpg",
    },
    {
      2: "http://the-internet.herokuapp.com/img/avatars/Original-Facebook-Geek-Profile-Avatar-1.jpg",
    },
  ],
  [
    {
      0: "http://the-internet.herokuapp.com/img/avatars/Original-Facebook-Geek-Profile-Avatar-2.jpg",
    },
    {
      1: "http://the-internet.herokuapp.com/img/avatars/Original-Facebook-Geek-Profile-Avatar-1.jpg",
    },
    {
      2: "http://the-internet.herokuapp.com/img/avatars/Original-Facebook-Geek-Profile-Avatar-1.jpg",
    },
  ],
];

for (let i = 0; i < arrayOfObjects[0].length; i++) {
  let arr1 = arrayOfObjects[0];
  let arr2 = arrayOfObjects[1];
  if (arr1.length === arr2.length) {
    if (arr1[i][i] === arr2[i][i]) {
      console.log(true);
    } else {
      console.log(false);
    }
  }
}
