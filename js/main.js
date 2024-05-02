	const form = document.querySelector('form')
	const inputLeft = document.getElementsByClassName('input-left')
	const inputRight = document.getElementsByClassName('input-right')
	const resultX = document.querySelector('[data-averageX]')
	const resultY = document.querySelector('[data-averageY]')
	const dataErrorX = document.querySelector('[data-errorX]')
	const dataErrorY = document.querySelector('[data-errorY]')
	const formInnerLeft = document.querySelector('.form-inner__left')
	const formInnerRight = document.querySelector('.form-inner__right')
	// Открытие клавиатуры на смартфонах для ввода чисел
	const inputsText = document.getElementsByTagName('input');
	document.addEventListener('DOMContentLoaded', function(){
		if (!('ontouchstart' in window || navigator.maxTouchPoints)){
			inputsText[0].focus()
		} 
	})
		
	for (let item of inputsText){
			// Добавляем атрибут inputmode ко всем тегам input
			item.setAttribute('inputmode', 'decimal')
	}
	
	formInnerLeft.addEventListener('input', inputFocus)
	formInnerLeft.addEventListener('paste', handlePaste)
	formInnerRight.addEventListener('input', inputFocus)
	formInnerRight.addEventListener('paste', handlePaste)
	function inputFocus(event){
		// Заменяем все запятые на точки и удаляем нежелательные символы
		event.target.value = event.target.value.replace(/,/g, '.').replace(/[^\d.,]/g, '');
	}
	function handlePaste(e) {
		let clipboardData = e.clipboardData
		let pastedData = clipboardData.getData('Text')
		if (!pastedData.match(/^[\d.,]+$/)) {
			e.preventDefault()
		}
	}

	// Таблица значений коэффициента К стандартного отклонения
	const table = [
		[null, null, 1.13, 1.69, 2.06, 2.33, 2.53, 2.7, 2.85, 2.97],
		[3.08, 3.17, 3.26, 3.34, 3.41, 3.47, 3.53, 3.59, 3.64, 3.69],
		[3.74, 3.78, 3.82, 3.86, 3.9, 3.93, 3.96, 4.0, 4.03, 4.06],
		[4.09, 4.11, 4.14, 4.16, 4.19, 4.21, 4.24, 4.26, 4.28, 4.3],
		[4.32, 4.34, 4.36, 4.38, 4.4, 4.42, 4.43, 4.45, 4.47, 4.48],
		[4.5, 4.51, 4.53, 4.54, 4.56, 4.57, 4.59, 4.6, 4.61, 4.63],
		[4.64, 4.65, 4.66, 4.68, 4.69, 4.7, 4.71, 4.72, 4.73, 4.74],
		[4.76, 4.76, 4.78, 4.79, 4.8, 4.81, 4.82, 4.82, 4.84, 4.84],
		[4.85, 4.86, 4.87, 4.88, 4.89, 4.9, 4.91, 4.92, 4.92, 4.93],
		[4.94, 4.95, 4.96, 4.96, 4.97, 4.98, 4.99, 4.99, 5.0, 5.01],
		[5.02, 5.02, 5.03, 5.04, 5.04, 5.05, 5.06, 5.06, 5.07, 5.08],
		[5.08, 5.09, 5.1, 5.1, 5.11, 5.11, 5.12, 5.13, 5.13, 5.14],
	]
	const tableP = [
		null,
		12.71,
		4.3,
		3.18,
		2.78,
		2.57,
		2.45,
		2.37,
		2.31,
		2.26,
		2.23,
		2.2,
		2.18,
		2.16,
		2.15,
		2.13,
		2.12,
		2.11,
		2.1,
		2.09,
		2.08,
		2.08,
		2.07,
		2.07,
		2.06,
		2.06,
		2.05,
		2.05,
		2.05,
		2.04,
		2.04,
		2.02,
		2.01,
		2.0,
		1.99,
		1.98,
		1.98,
	]
	// Прослушка событий на отправку формы
	form.addEventListener('submit', calculate)
	function calculate(event) {
		event.preventDefault()
		calcAverageX()
		calcAverageY()
		calcSigmaX()
		calcSigmaY()
		standardDeviationX()
		standardDeviationY()
		arithmeticMeanErrorX()
		arithmeticMeanErrorY()
		averageError()
		findP()
	}

	// Вычисление средней арифметической
	let arithmeticMeanX
	let arithmeticMeanY
	let quantityX
	let quantityY

	function calcAverageX() {
		let sum = 0 // Переменная для суммы
		quantityX = 0 // Переменная для подсчета количества элементов
		for (let item of inputLeft) {
			let value = parseFloat(item.value) * 100
			if (!isNaN(value) && value !== '') {
				// Проверяем, что значение является числом
				sum += value // Добавляем значение к сумме
				quantityX++ // Увеличиваем счетчик
			}
		}
		if (quantityX > 0) {
			// Вычисляем среднее значение
			arithmeticMeanX = sum / quantityX / 100
			console.log(
				`Средняя арифметическая X = %c${arithmeticMeanX}`,
				'color: blue'
			)
			resultX.textContent = arithmeticMeanX.toFixed(1) // Округляем до ближайшего десятого и до первого числа после запятой
		} else {
			resultX.textContent = ''
		}
	}
	function calcAverageY() {
		let sum = 0 // Переменная для суммы
		quantityY = 0 // Переменная для подсчета количества элементов
		for (let item of inputRight) {
			let value = parseFloat(item.value) * 100
			if (!isNaN(value) && value !=='') {
				// Проверяем, что значение является числом
				sum += value // Добавляем значение к сумме
				quantityY++ // Увеличиваем счетчик
			}
		}
		if (quantityY > 0) {
			arithmeticMeanY = sum / quantityY / 100
			console.log(
				`Средняя арифметическая Y = %c${arithmeticMeanY}`,
				'color: blue'
			)
			console.log('====================================')
			resultY.textContent = arithmeticMeanY.toFixed(1) // Округляем до ближайшего десятого и до первого числа после запятой
		} else {
			resultY.textContent = ''
		}
	}
	//==============================================================

	//Вычисление средне квадратического отклонения
	let sigmaX
	function calcSigmaX() {
		let sum = 0 // Переменная для суммы
		for (let item of inputLeft) {
			if (!isNaN(item.value) && item.value !== '') {
				let value = parseFloat(item.value) * 100000
				value = (value - arithmeticMeanX * 100000) ** 2 / 10000000000
				sum += value
			}
		}
		const resultSigmaX = document.querySelector('[data-sigmaX]')
		if (quantityX > 0) {
			sigmaX = Math.sqrt(sum / quantityX)
			resultSigmaX.textContent = `${arithmeticMeanX.toFixed(
				1
			)} ± ${sigmaX.toFixed(1)}`
			console.log(
				`Среднее квадратическое отклонение X = %c${sigmaX}`,
				'color: blue'
			)
		} else {
			resultSigmaX.textContent = ''
		}
	}
	let sigmaY
	function calcSigmaY() {
		let sum = 0 // Переменная для суммы
		for (let item of inputRight) {
			if (!isNaN(item.value) && item.value !== '') {
				let value = parseFloat(item.value) * 100000
				value = (value - arithmeticMeanY * 100000) ** 2 / 10000000000
				sum += value
			}
		}
		const resultSigmaY = document.querySelector('[data-sigmaY]')
		if(quantityY > 0) {
			sigmaY = Math.sqrt(sum / quantityY)
			resultSigmaY.textContent = `${arithmeticMeanY.toFixed(
				1
			)} ± ${sigmaY.toFixed(1)}`
			console.log(
				`Среднее квадратическое отклонение Y = %c${sigmaY}`,
				'color: blue'
			)
			console.log('====================================')
		} else {
			resultSigmaY.textContent = ''
		}
	}
	//==============================================================

	// Стандартное отклонение
	let resultStandardDeviationX
	let resultStandardDeviationY
	let maxX
	let minX
	let getValueFromTableX
	function standardDeviationX() {
		let firstDigit
		let secondDigit

		if (quantityX > 1 && quantityX <= 9) {
			getValueFromTableX = table[0][quantityX]
		} else if (quantityX <= 99) {
			firstDigit = parseInt(quantityX.toString()[0], 10)
			secondDigit = parseInt(quantityX.toString()[1], 10)
			getValueFromTableX = table[firstDigit][secondDigit]
		} else if (quantityX > 99 && quantityX <= 119) {
			firstDigit = parseInt(quantityX.toString().substring(0, 2), 10)
			secondDigit = parseInt(quantityX.toString()[1], 10)
			getValueFromTableX = table[firstDigit][secondDigit]
		} else {
			getValueFromTableX = '';
		}
		//*******************************************************************
		let numbers = [] // Массив для хранения числовых значений инпутов
		for (let velInput of inputLeft){
			const value = parseFloat(velInput.value) // Преобразуем значение инпута в число
			if (!isNaN(value)) {
				// Проверяем, является ли преобразованное значение числом
				numbers.push(value) // Добавляем значение в массив, если оно является числом
			}
		}
		const standardDeviationX = document.querySelector(
			'[data-standardDeviationX]'
		)
		if (quantityX > 1) {
			// Проверяем, есть ли в массиве числа
			maxX = Math.max(...numbers) // Находим максимальное значение
			minX = Math.min(...numbers) // Находим минимальное значение
			resultStandardDeviationX = (maxX - minX) / getValueFromTableX
			console.log(
				`Стандартное отклонение X = %c${resultStandardDeviationX}`,
				'color: blue'
			)
			standardDeviationX.textContent = resultStandardDeviationX.toFixed(1)
		} else {
			standardDeviationX.textContent = '';
			resultStandardDeviationX = '';
		}
	}
	let maxY
	let minY
	let getValueFromTableY
	function standardDeviationY() {
		let firstDigit;
		let secondDigit;

		if (quantityY > 1 && quantityY <= 9) {
			getValueFromTableY = table[0][quantityY]
		} else if (quantityY <= 99) {
			firstDigit = parseInt(quantityY.toString()[0], 10)
			secondDigit = parseInt(quantityY.toString()[1], 10)
			getValueFromTableY = table[firstDigit][secondDigit]
		} else if (quantityY > 99 && quantityY <= 119) {
			firstDigit = parseInt(quantityY.toString().substring(0, 2), 10)
			secondDigit = parseInt(quantityY.toString()[2], 10)
			getValueFromTableY = table[firstDigit][secondDigit]
		} else {
			getValueFromTableY = '';
		}
		//*******************************************************************
		let numbers = [] // Массив для хранения числовых значений инпутов
		for (let valInput of inputRight){
			const value = parseFloat(valInput.value) // Преобразуем значение инпута в число
			if (!isNaN(value)) {
				// Проверяем, является ли преобразованное значение числом
				numbers.push(value) // Добавляем значение в массив, если оно является числом
			}
		}
		const standardDeviationY = document.querySelector(
			'[data-standardDeviationY]'
		)
		if (quantityY > 1) {
			// Проверяем, есть ли в массиве числа
			maxY = Math.max(...numbers) // Находим максимальное значение
			minY = Math.min(...numbers) // Находим минимальное значение
			resultStandardDeviationY = (maxY - minY) / getValueFromTableY
			console.log(
				`Стандартное отклонение Y = %c${resultStandardDeviationY}`,
				'color: blue'
			)
			console.log('====================================')
			standardDeviationY.textContent = resultStandardDeviationY.toFixed(1)
		} else {
			standardDeviationY.textContent = '';
			resultStandardDeviationY = '';
		}
	}
	//==============================================================

	// Стандартная ошибка среднего арифметического значения (m)
	let mX
	let mY
	function arithmeticMeanErrorX() {
		if (quantityX > 1 && quantityX < 30) {
			mX = resultStandardDeviationX / Math.sqrt(quantityX - 1)
			console.log(
				`Стандартная ошибка среднего арифметического значения (m) X = %c${mX}`,
				'color: blue'
			)
		} else if (quantityX >= 30) {
			mX = resultStandardDeviationX / Math.sqrt(quantityX)
			console.log(
				`Стандартная ошибка среднего арифметического значения (m) X = %c${mX}`,
				'color: blue'
			)
		} 
		if (quantityX > 1 ){
			dataErrorX.textContent = mX.toFixed(1)
		} else {
			dataErrorX.textContent = ''
		}
	}
	function arithmeticMeanErrorY() {
		if (quantityY > 1 && quantityY < 30) {
			mY = resultStandardDeviationY / Math.sqrt(quantityY - 1)
			console.log(
				`Стандартная ошибка среднего арифметического значения (m) Y = %c${mY}`,
				'color: blue'
			)
		} else if (quantityY >= 30) {
			mY = resultStandardDeviationY / Math.sqrt(quantityY)
			console.log(
				`Стандартная ошибка среднего арифметического значения (m) Y = %c${mY}`,
				'color: blue'
			)
		}
		if (quantityY > 1) {
			dataErrorY.textContent = mY.toFixed(1)
			console.log('====================================')
		} else {
			dataErrorY.textContent = ''
		}
	}
	//==============================================================

	// Стандартная ошибка разности (t)
	let finishedResult
	function averageError() {
		const dataFinishResult = document.querySelector('[data-finishResult]')
		if (quantityX > 1 && quantityY > 1) {
			ResultFirst =
				(arithmeticMeanX - arithmeticMeanY) / Math.sqrt(mX ** 2 + mY ** 2);
			finishedResult = Math.abs(ResultFirst);	
			console.log(
				`Стандартная ошибка разности (t) %c${finishedResult}`,
				'color: blue'
			)
			dataFinishResult.textContent = finishedResult.toFixed(2)
		} else {
			dataFinishResult.textContent = ''
		}
	}
	//==============================================================

	// Число степеней свободы и достоверность различий
	let f
	let getPFromTableP
	const paragraph = document.createElement('p')
	const pMore = document.createElement('p')
	const pLess = document.createElement('p')
	function findP() {
		if(quantityX > 1 && quantityY > 1) {
			f = quantityX + quantityY - 2
			console.log(`Число степеней свободы = %c${f}`, 'color: blue')
			if (f <= 30) {
				getPFromTableP = tableP[f]
			} else if (f > 30 && f <= 40) {
				getPFromTableP = tableP[31]
			} else if (f > 40 && f <= 50) {
				getPFromTableP = tableP[32]
			} else if (f > 50 && f <= 60) {
				getPFromTableP = tableP[33]
			} else if (f > 60 && f <= 80) {
				getPFromTableP = tableP[34]
			} else if (f > 80 && f <= 100) {
				getPFromTableP = tableP[35]
			} else if (f > 100 && f <= 120) {
				getPFromTableP = tableP[36]
			}
			console.log(
				`Граничное значение при 5%-ном уровне значимости (p=0,05) = %c${getPFromTableP}`,
				'color: blue'
			)
			const container = document.querySelector('.container')
			if (finishedResult > getPFromTableP) {
				paragraph.textContent = `Граничное значение (при p = 0,05) = ${getPFromTableP}`
				paragraph.style.cssText =
					'font-size: 1.5rem; font-weight: 700; text-align: center; margin-top: 20px; color: #fff; text-shadow: 0 0 5px #000'
				container.append(paragraph)
				pMore.textContent = 'различия достоверны!'
				pMore.style.cssText =
					'text-transform: uppercase; font-weight: 700; color: green; text-shadow: none; text-align: center; font-size: 1.5rem; margin-top: 10px'
				container.append(pMore)
			} else if (finishedResult < getPFromTableP) {
				paragraph.textContent = `Граничное значение (при p = 0,05) = ${getPFromTableP}`
				paragraph.style.cssText =
					'font-size: 1.5rem; font-weight: 700; text-align: center; margin-top: 20px; color: #fff; text-shadow: 0 0 5px #000'
				container.append(paragraph)
				pLess.textContent = 'различия не достоверны!'
				pLess.style.cssText =
					'text-transform: uppercase; font-weight: 700; color: red; text-shadow: none; text-align: center; font-size: 1.5rem; margin-top: 10px'
				container.append(pLess)
			} else {
				paragraph.textContent = '';
				pLess.textContent = '';
				pMore.textContent =  '';
			}
		}
	}

	//==============================================================

	// Кнопка добавления инпутов
	const btnAdd = document.querySelector('[data-btn]')
	btnAdd.addEventListener('click', function (event) {
		event.preventDefault()
		addInputs()
	})
	let addInputLeft =
		'<input class="input-left" inputmode="decimal" type="text"/>';
	let addInputRight =
		'<input class="input-right" inputmode="decimal" type="text"/>';
	function addInputs() {
		for(let i = 0; i < 5; i++){
			formInnerLeft.insertAdjacentHTML('beforeend', addInputLeft)
			formInnerRight.insertAdjacentHTML('beforeend', addInputRight)
		}
	}
	const btnAddTen = document.querySelector('#btn10');
	btnAddTen.addEventListener('click', function(event){
		event.preventDefault();
		for (let i = 0; i < 10; i++) {
			formInnerLeft.insertAdjacentHTML('beforeend', addInputLeft)
			formInnerRight.insertAdjacentHTML('beforeend', addInputRight)
		}
	})
	//==============================================================

	// Прослушка событий для кнопки ОЧИСТИТЬ 
	const resetBtn = document.querySelector('[type="reset"]')
	resetBtn.addEventListener('click', reset) 
	function reset (){
		// Функция (анонимная) внутри функции заключается в скобки, затем объявляется немедленный вызов ();
		;(function () {
			// Находим контейнеры, где могут быть динамически добавленные элементы
			let leftContainer = document.querySelector('.form-inner__left')
			let rightContainer = document.querySelector('.form-inner__right')

			// Удаляем все кроме первых 10 input элементов, предполагая, что они были там изначально
			let leftInputs = leftContainer.querySelectorAll('input')
			let rightInputs = rightContainer.querySelectorAll('input')

			if (leftInputs.length > 10) {
				for (let i = 10; i < leftInputs.length; i++) {
					leftInputs[i].remove()
				}
			}

			if (rightInputs.length > 10) {
				for (let i = 10; i < rightInputs.length; i++) {
					rightInputs[i].remove()
				}
			}
		})()
		;(function () {
			const containerForCalcResult = document.querySelector(
				'.form-inner__row-result'
			)
			const calcResult = containerForCalcResult.querySelectorAll('.result')
			calcResult.forEach(function (text) {
				text.textContent = ''
			})
			paragraph.remove()
			pMore.remove()
			pLess.remove()
		})()
		if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
			inputsText[0].focus()
		}
		// ДОБАВЛЕНО*************************************************
		;(function () {
			dataNone.forEach(function (item) {
				item.classList.add('none')
			})
		})()
		dataLessX.classList.add('none')
		dataLessY.classList.add('none')
		dataMoreX.classList.add('none')
		dataMoreY.classList.add('none')
		resetResultAllX();
		resetResultAllY();
	}

	// НОВОЕ************************************
// Порядок вычисления достоверности различий
//******************************************
//**********************НОВЫЕ ПЕРЕМЕННЫЕ*******************
let dataNone = document.querySelectorAll('[data-none]')
const dataLessX = document.querySelector('[data-lessX]')
const dataMoreX = document.querySelector('[data-moreX]')
const dataLessY = document.querySelector('[data-lessY]')
const dataMoreY = document.querySelector('[data-moreY]')
//*****************************************
form.addEventListener('submit', calc)
function calc() {
	removeClassNone()
	howCalcArithmeticMeanX()
	howCalcArithmeticMeanY()
	howCalcMeanSquareDeviationX()
	howCalcMeanSquareDeviationY()
	howCalcStandardDeviationX()
	howCalcStandardDeviationY()
	howCalcStandardErrorX()
	howCalcStandardErrorY()
	howCalcMeanDifferenceError()
	howCalcDegreesOfFreedom()
	if (quantityX == 0) {
		resetResultAllX();
	}
	if (quantityY == 0) {
		resetResultAllY();
	}
}
//------------------------------------------
function removeClassNone() {
	dataNone.forEach(function (item) {
		item.classList.remove('none')
	})
}
// Среднее арифметическое
let dividendX1 = document.querySelector('[data-dividendX]')
let divisorX1 = document.querySelector('[data-divisorX]')
let quotientX1 = document.querySelector('[data-quotientX]')
function howCalcArithmeticMeanX() {
	let sumStringTop = '' // Строка для накопления значений
	for (let item of inputLeft) {
		if (!isNaN(item.value) && item.value !== '') {
			let digit = item.value
			sumStringTop += `${digit} + ` // Добавляем значение к строке
		}
	}
	if (sumStringTop.endsWith(' + ')) {
		// Убираем последний лишний " + " из строки
		sumStringTop = sumStringTop.slice(0, -3)
	}
	if (quantityX > 0) {
		dividendX1.textContent = sumStringTop
		divisorX1.textContent = quantityX
		quotientX1.textContent = `= ${arithmeticMeanX.toFixed(1)}`
	}
}
let dividendY1 = document.querySelector('[data-dividendY]')
let divisorY1 = document.querySelector('[data-divisorY]')
let quotientY1 = document.querySelector('[data-quotientY]')
function howCalcArithmeticMeanY() {
	let sumStringTop = '' // Строка для накопления значений
	for (let item of inputRight) {
		if (!isNaN(item.value) && item.value !== '') {
			let digit = item.value
			sumStringTop += `${digit} + ` // Добавляем значение к строке
		}
	}
	if (sumStringTop.endsWith(' + ')) {
		// Убираем последний лишний " + " из строки
		sumStringTop = sumStringTop.slice(0, -3)
	}
	if (quantityY > 0) {
		dividendY1.textContent = sumStringTop
		divisorY1.textContent = quantityY
		quotientY1.textContent = `= ${arithmeticMeanY.toFixed(1)}`
	}
}
// Средне квадратическое отклонение
let dividendX2 = document.querySelector('[data-dividendX-second]')
let divisorX2 = document.querySelector('[data-divisorX-second]')
let calcResultX2 = document.querySelector('[data-quotientX-second]')
function howCalcMeanSquareDeviationX(){
	dividendX2.closest('.dividend').classList.remove('after')

	let sumString = '' // Строка для накопления значений
	for (let item of inputLeft) {
		if (!isNaN(item.value) && item.value !== '') {
			sumString += `(${item.value} - ${arithmeticMeanX.toFixed(1)})² + `// Добавляем значение к строке
		}
	}
	if (sumString.endsWith(' + ')) {
		// Убираем последний лишний " + " из строки
		sumString = sumString.slice(0, -3)
	}
	if (quantityX > 0) {
		dividendX2.classList.remove('after'); // Удаление степени
		dividendX2.textContent = sumString
		divisorX2.textContent = quantityX
		calcResultX2.textContent = `= ${arithmeticMeanX.toFixed(1)} ± ${sigmaX.toFixed(1)}`
	}
}
let dividendY2 = document.querySelector('[data-dividendY-second]')
let divisorY2 = document.querySelector('[data-divisorY-second]')
let calcResultY2 = document.querySelector('[data-quotientY-second]')
function howCalcMeanSquareDeviationY(){
	dividendY2.closest('.dividend').classList.remove('after')

	let sumString = '' // Строка для накопления значений
	for (let item of inputRight) {
		if (!isNaN(item.value) && item.value !== '') {
			sumString += `(${item.value} - ${arithmeticMeanY.toFixed(1)})² + `// Добавляем значение к строке
		}
	}
	if (sumString.endsWith(' + ')) {
		// Убираем последний лишний " + " из строки
		sumString = sumString.slice(0, -3)
	}
	if (quantityY > 0) {
		dividendY2.classList.remove('after')
		dividendY2.textContent = sumString
		divisorY2.textContent = quantityY
		calcResultY2.textContent = `= ${arithmeticMeanY.toFixed(
			1
		)} ± ${sigmaY.toFixed(1)}`
	}
}
// Стандартное отклонение 
let dividendX3 = document.querySelector('#dividendX');
let divisorX3 = document.querySelector('#divisorX')
let calcResultX3 = document.querySelector('#calcResultX')
function howCalcStandardDeviationX(){
	if (quantityX > 1) {
		dividendX3.textContent = `${maxX} - ${minX}`;
		divisorX3.textContent = getValueFromTableX;
		calcResultX3.textContent = ` = ${resultStandardDeviationX.toFixed(1)}`;
	} else {
		dividendX3.textContent = '';
		divisorX3.textContent = '';
		calcResultX3.textContent = '';
	}
}
let dividendY3 = document.querySelector('#dividendY');
let divisorY3 = document.querySelector('#divisorY');
let calcResultY3 = document.querySelector('#calcResultY');
function howCalcStandardDeviationY(){
	if (quantityY > 1) {
		dividendY3.textContent = `${maxY} - ${minY}`
		divisorY3.textContent = getValueFromTableY
		calcResultY3.textContent = ` = ${resultStandardDeviationY.toFixed(1)}`
	} else {
		dividendY3.textContent = '';
		divisorY3.textContent = '';
		calcResultY3.textContent = '';
	}
}
// Стандартная ошибка Ср. Ар.
let topLessX = document.querySelector('#topLessX');
let bottomLessX = document.querySelector('#bottomLessX');
let calcResultLessX = document.querySelector('#calcResultLessX');
let topMoreX = document.querySelector('#topMoreX')
let bottomMoreX = document.querySelector('#bottomMoreX')
let calcResultMoreX = document.querySelector('#calcResultMoreX')
function howCalcStandardErrorX(){
	if (quantityX > 1 && quantityX < 30){
		dataLessX.classList.remove('none')
		topLessX.textContent = resultStandardDeviationX.toFixed(1)
		bottomLessX.textContent = `√(${quantityX} - 1)`;
		calcResultLessX.textContent = ` = ${mX.toFixed(1)}`
	} else if (quantityX >= 30){
		dataMoreX.classList.remove('none')
		topMoreX.textContent = resultStandardDeviationX.toFixed(1)
		bottomMoreX.textContent = `√${quantityX}`
		calcResultMoreX.textContent = ` = ${mX.toFixed(1)}`
	} else {
		dataLessX.classList.add('none')
		topLessX.textContent.textContent = '';
		bottomLessX.textContent.textContent = '';
		calcResultLessX.textContent.textContent = '';

		dataMoreX.classList.add('none')
		topMoreX.textContent.textContent = '';
		bottomMoreX.textContent.textContent = '';
		calcResultMoreX.textContent.textContent = '';
	}
}
let topLessY = document.querySelector('#topLessY')
let bottomLessY = document.querySelector('#bottomLessY')
let calcResultLessY = document.querySelector('#calcResultLessY')
let topMoreY = document.querySelector('#topMoreY')
let bottomMoreY = document.querySelector('#bottomMoreY')
let calcResultMoreY = document.querySelector('#calcResultMoreY')
function howCalcStandardErrorY(){
	if (quantityY > 1 && quantityY < 30) {
		dataLessY.classList.remove('none')
		topLessY.textContent = resultStandardDeviationY.toFixed(1)
		bottomLessY.textContent = `√(${quantityY} - 1)`
		calcResultLessY.textContent = ` = ${mY.toFixed(1)}`
	} else if (quantityY >= 30) {
		dataMoreY.classList.remove('none')
		topMoreY.textContent = resultStandardDeviationY.toFixed(1)
		bottomMoreY.textContent = `√${quantityY}`
		calcResultMoreY.textContent = ` = ${mY.toFixed(1)}`
	} else {
		dataLessY.classList.add('none')
		topLessY.textContent.textContent = ''
		bottomLessY.textContent.textContent = ''
		calcResultLessY.textContent.textContent = ''

		dataMoreY.classList.add('none')
		topMoreY.textContent.textContent = ''
		bottomMoreY.textContent.textContent = ''
		calcResultMoreY.textContent.textContent = ''
	}
}
// t коэффициент
let meanDiffTop = document.querySelector('[data-meanDiffTop]');
let meanDiffBottom = document.querySelector('[data-meanDiffBottom]');
let meanDiffResult = document.querySelector('[data-meanDiffResult]');
function howCalcMeanDifferenceError(){
	if (quantityX > 1 && quantityY > 1){
		meanDiffTop.textContent = `${arithmeticMeanX.toFixed(1)} - ${arithmeticMeanY.toFixed(1)}`;
		meanDiffBottom.textContent = `√(${mX.toFixed(1)} - ${mY.toFixed(1)})`
		meanDiffResult.textContent = ` = ${finishedResult.toFixed(2)}`
	} else {
		meanDiffTop.textContent = '';
		meanDiffBottom.textContent = '';
		meanDiffResult.textContent = '';
	}
}
// Число степеней свободы
let fn = document.querySelector('.fn');
function howCalcDegreesOfFreedom(){
	if (quantityX > 1 && quantityY > 1){
		fn.textContent = `${quantityX} + ${quantityY} - 2 = ${f}`
	} else {
		fn.textContent = '';
	}
}

// Функция очистки значений в делимом - делителе - частном для первого столбца
function resetResultAllX (){
	let arrWithVarX = [
		dividendX1, divisorX1, quotientX1, dividendX2, divisorX2, calcResultX2, dividendX3, divisorX3, calcResultX3, topLessX, bottomLessX, calcResultLessX, topMoreX, bottomMoreX, calcResultMoreX, meanDiffTop, meanDiffBottom, meanDiffResult, fn
	]
	arrWithVarX.forEach((item) => {
		item.textContent = ''
	})
}
function resetResultAllY (){
	let arrWithVarY = [
		dividendY1, divisorY1, quotientY1, dividendY2, divisorY2, calcResultY2, dividendY3, divisorY3,calcResultY3, topLessY, bottomLessY, calcResultLessY, topMoreY, bottomMoreY, calcResultMoreY, meanDiffTop, meanDiffBottom, meanDiffResult, fn
	]
	arrWithVarY.forEach((item) => {
		item.textContent = ''
	})
}