let promise = new Promise((resolve, reject) => {
  let success = false;

  if (success) {
    resolve("Data");
  } else {
    reject("Error");
  }
});

// promise.then(
//   (res) => {
//     console.log(res);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

// promise
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
