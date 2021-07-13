import { Select } from './select/select'
import './select/style.scss'

export const selectedValue = {}
export const selectedSize = {}
export const selectedSous = {}

const price = 10;
let finishPrice = 0;

const select = new Select('#select', {
  placeholder: 'Выбери пожалуйста вид пиццы',
  data: [
    { id: '1', value: 'Пепперони', price: price },
    { id: '2', value: 'Прошуто', price: price },
    { id: '3', value: 'Куриная', price: price },
    { id: '4', value: 'Деревенская', price: price }
  ],
  onSelect(item) {
    selectedValue.pizza = {
      value: item.value,
      price: item.price
    }
    disabledSize.removeAttribute("disabled", "disabled")
    finishPrice += item.price
  }
})

const selectSize = new Select('#selectSize', {
  placeholder: 'Выбери пожалуйста размер пиццы',
  data: [
    { id: '1', value: '16 cm ', price: 0 },
    { id: '2', value: '24 cm ', price: 3 },
    { id: '3', value: '30 cm ', price: 6 },
    { id: '4', value: '35 cm ', price: 10 }
  ],
  onSelect(item) {
    selectedSize.size = {
      value: item.value,
      price: item.price,
    }
    disabledSous.removeAttribute("disabled", "disabled")
    finishPrice += item.price
  }
})

const selectSous = new Select('#selectSous', {
  placeholder: 'Выбери пожалуйста вид соуса',
  data: [
    { id: '1', value: 'Сырный', price: 1 },
    { id: '2', value: 'Кисло-сладкий', price: 1 },
    { id: '3', value: 'Барбекю', price: 1 },
    { id: '4', value: 'Чесночный', price: 1 }
  ],
  onSelect(item) {
    selectedSous.sous = {
      value: item.value,
      price: item.price
    }
    finishPrice += item.price
  }
})

const btn = document.getElementById('btn')

btn.onclick = () => {
  const pizza = document.getElementById('pizza')
  pizza.innerHTML = `Ваша пицца - " ${selectedValue.pizza.value} " (стоимость пиццы - ${selectedValue.pizza.price} BYN)`

  const size = document.getElementById('size')
  size.innerHTML = `Ваш размер - " ${selectedSize.size.value} " (доплата за размер + ${selectedSize.size.price} BYN)`

  const sous = document.getElementById('sous')
  sous.innerHTML = `Ваш соус - " ${selectedSous.sous.value} " (доплата за соус + ${selectedSous.sous.price} BYN)`

  const sum = document.getElementById('sum')
  sum.innerHTML = `Сумма Вашего заказа - " ${finishPrice} BYN "`
  finishPrice = 0
}

const disabledSous = document.getElementById('selectSous')
const disabledSize = document.getElementById('selectSize')

const selectedPlaceholder = document.getElementById('placeholder')
if (selectedPlaceholder.innerHTML === 'Выбери пожалуйста вид пиццы') {
  disabledSize.setAttribute("disabled", "disabled")
  disabledSous.setAttribute("disabled", "disabled")
}




