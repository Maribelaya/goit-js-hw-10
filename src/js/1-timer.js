// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

//Змінні
let userSelectedDate; //Вказані користувачем дата та час 
let startButton = document.querySelector('[data-start]'); //Кнопка Старту
let timerIntervalId; //Ідентифікатор інтервалу таймера

const dateTimePickrElem = document.querySelector('#datetime-picker'); //Елемент поле вводу - Календар 

const daysElement= document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]'); 
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]'); 


startButton.disabled = true;   //Неактивна кнопка Старт на момент відкриття сторінки


const options = {           //Опції відкриття календаря
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {               //Подія закриття календаря
      if (selectedDates[0] > Date.now())    //Перевірка - обрана дата у майбутньому
      {
        userSelectedDate = selectedDates[0]; //Запис обраної дати у змінну
        startButton.disabled = false;          //Активна кнопка Старт
      } 
      else 
      {
        userSelectedDate = undefined; //Змачення змінної не визначено
        startButton.disabled = true; //Неактивна кнопка Старт
        if(timerIntervalId){
          clearInterval(timerIntervalId);
        }
        //Повідомлення
        iziToast.error({
          message: 'Please choose a date in the future',
          position: 'topRight'
        });
      }
    },
  };

  //Створення календаря
  flatpickr(dateTimePickrElem, options);

  //Відображення відліку часу
  function showTimer(){
    const timeBalance = userSelectedDate - Date.now(); //Різниця часу між поточним та вказаним користувачем
    const { days, hours, minutes, seconds } = convertMs(timeBalance); //Розрахунок залишку часу
  
    if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) //Перевірка значень
    {
      //Відображення значень на екрані
      daysElement.textContent = formatTimerValue(days);
      hoursElement.textContent = formatTimerValue(hours);
      minutesElement.textContent = formatTimerValue(minutes);
      secondsElement.textContent = formatTimerValue(seconds);   
    }

    //Зупинка виклику відображення таймеру щосекунди
    if(timeBalance < 1000 ){
      if(timerIntervalId){
        clearInterval(timerIntervalId);
        startButton.disabled = false; //Активна кнопка Старт
        dateTimePickrElem.disabled = false; //Активний елемент вводу
      }
    }
};

//Додавання 0, якщо кількість символів 1.
function formatTimerValue(value) {
  return String(value).padStart(2, '0');
}

//Подія - натискання кнопки Старт
  startButton.addEventListener('click', () => {
    if (userSelectedDate) {
      startButton.disabled = true; //Неактивна кнопка Старт
      dateTimePickrElem.disabled = true; //Неактивний елемент вводу
      timerIntervalId = setInterval(showTimer, 1000); //Встановлення інтревалу виклику щосекунди
    }
  });

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}