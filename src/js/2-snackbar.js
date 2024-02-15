
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form'); //Елемент форми

form.addEventListener('submit', (event) => {  // Обробка події сабміту форми
    event.preventDefault(); // Щоб сторінка не перезавантажувалась

    const delay =  parseInt(document.querySelector('input[name="delay"]').value); // Отримуємо значення затримки
    
    form.delay.value = undefined; //Очищення значення поля delay

    const promise = new Promise((resolve, reject) => {     // Створюємо новий проміс
        setTimeout(() => {                                //Встановлення таймауту
            if (form.state.value == 'fulfilled'){
                resolve(delay); //resolve
            }
            else{
                reject(delay);  //reject
            }
        }, delay);
    });

    
    promise                      //Обробка результату промісу
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
            message: `❌ Rejected promise in ${delay}ms`, // Повідомлення при невдалому виконанні промісу
            position: 'topRight',
      });
    });
    });