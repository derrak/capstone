// const form = document.querySelector('form');
// const itemName = document.querySelector('#name');
// const cost = document.querySelector('#cost');
// const error = document.querySelector('#error');

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   if(itemName.value && cost.value){
//     const item = {
//       name: itemName.value,
//       cost: parseInt(cost.value)
//     };

//     db.collection('expenses').add(item).then(response => {
//       error.textContent = "";
//       itemName.value = "";
//       cost.value = "";
//     })
//   } else {
//     error.textContent = 'Please enter values before submitting'
//   }
// })