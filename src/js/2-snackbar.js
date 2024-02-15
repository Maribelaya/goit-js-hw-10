
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form'); //Елемент форми

form.addEventListener('submit', (event) => {  // Обробка події сабміту форми
    event.preventDefault(); // Щоб сторінка не перезавантажувалась

    const delay =  parseInt(document.querySelector('input[name="delay"]').value); // Отримуємо значення затримки
    
    form.delay.value = undefined; //Очищення значення поля затримки

    const promise = new Promise((resolve, reject) => {     // Створюємо новий проміс
        setTimeout(() => { //Встановлення таймауту
            if (form.state.value == 'fulfilled'){
                resolve(delay); //resolve
            }
            else{
                reject(delay);  //reject
            }
        }, delay);
    });

    //Обробка результату промісу
    promise
    .then(delay => {
      iziToast.success({
            icon: null,
            message: `✅ Fulfilled promise in ${delay}ms`, // Повідомлення при вдалому виконанні промісу
            position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
            icon: null,
            message: `❌ Rejected promise in ${delay}ms`, // Повідомлення при вдалому виконанні промісу
            position: 'topRight',
      });
    });

        
//   const promise = new Promise((resolve, reject) => {     // Створюємо новий проміс
//     if (document.getElementById('fulfilled').checked) {
//       setTimeout(() => {
//         resolve(delay); // Виконуємо проміс після затримки delay мілісекунд
//       }, delay);
//     } else if (document.getElementById('rejected').checked) {
//       setTimeout(() => {
//         reject(delay); // Відхиляємо проміс після затримки delay мілісекунд
//       }, delay);
//     } else {
//       reject('No option selected');
//     }
  });



 
//   promise      // Обробляємо результати промісу
//     .then((value) => {
//         iziToast.success({
//             title: 'OK',
//             message: `✅ Fulfilled promise in ${delay}ms`, // Повідомлення при вдалому виконанні промісу
//             position: 'topRight',
//         });
        
//     })
//     .catch((value) => {
//         iziToast.error({
//             title: 'Error',
//             message: `❌ Rejected promise in ${delay}ms`, // Повідомлення при вдалому виконанні промісу
//             position: 'topRight',
//         });
      
//     });
// });

//form.addEventListener('submit', createPromise);