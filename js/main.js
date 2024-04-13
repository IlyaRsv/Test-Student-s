	const form = document.querySelector('form')
	const inputLeft = document.querySelectorAll('.input-left')
	const inputRight = document.querySelectorAll('.input-right')
	const resultX = document.querySelector('[data-averageX]')
	const resultY = document.querySelector('[data-averageY]')
	const dataErrorX = document.querySelector('[data-errorX]')
	const dataErrorY = document.querySelector('[data-errorY]')
	// Открытие клавиатуры на смартфонах для ввода чисел
	const inputsText = document.querySelectorAll('input');
	inputsText[0].focus();
	for (let input of inputsText) {
		input.setAttribute('inputmode', 'numeric')
		// input.setAttribute('pattern', '[0-9]*')
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
		sigmaX()
		sigmaY()
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

	function calcAverageX() {
		let sum = 0 // Переменная для суммы
		let count = 0 // Переменная для подсчета количества элементов
		for (let item of inputLeft) {
			// Если запятая (,), то меняется на точку (.), потому что JS работает
			let valueFirst = item.value.replace(',', '.')
			// только с десятичыми числами только с использованием точки (.)
			let value = parseFloat(valueFirst) * 100
			if (!isNaN(value)) {
				// Проверяем, что значение является числом
				sum += value // Добавляем значение к сумме
				count++ // Увеличиваем счетчик
			}
		}
		if (count > 0) {
			// Вычисляем среднее значение
			arithmeticMeanX = sum / count / 100
			console.log(`Средняя арифметическая X = %c${arithmeticMeanX}`, 'color: blue')
			resultX.textContent = arithmeticMeanX.toFixed(1) // Округляем до ближайшего десятого и до первого числа после запятой
		}
	}
	function calcAverageY() {
		let sum = 0 // Переменная для суммы
		let count = 0 // Переменная для подсчета количества элементов
		for (let item of inputRight) {
			// Замена запятой, если есть (,) на точку (.), потому что JS работает
			let valueFirst = item.value.replace(',', '.')
			// только с десятичыми числами только с использованием точки (.)
			let value = parseFloat(valueFirst) * 100
			if (!isNaN(value)) {
				// Проверяем, что значение является числом
				sum += value // Добавляем значение к сумме
				count++ // Увеличиваем счетчик
			}
		}
		if (count > 0) {
			arithmeticMeanY = sum / count / 100
			console.log(`Средняя арифметическая Y = %c${arithmeticMeanY}`, 'color: blue')
			console.log('====================================')
			resultY.textContent = arithmeticMeanY.toFixed(1) // Округляем до ближайшего десятого и до первого числа после запятой
		}
	}
	//==============================================================

	//Вычисление средне квадратического отклонения
	function sigmaX() {
		let sum = 0 // Переменная для суммы
		let count = 0 // Переменная для подсчета количества элементов
		let firstSigmaX
		for (let item of inputLeft) {
			// Если запятая (,), то меняется на точку (.), потому что JS работает
			let valueFirst = item.value.replace(',', '.')
			// только с десятичыми числами только с использованием точки (.)
			let value = parseFloat(valueFirst) * 100000
			value = (value - arithmeticMeanX * 100000) ** 2 / 10000000000
			sum += value
			count++
			if (!isNaN(value)) {
				firstSigmaX = Math.sqrt(sum / count) // Вычисляем квадратическое отклонение
				const sigma = Math.sqrt(sum / count).toFixed(1)
				const resultSigmaX = document.querySelector('[data-sigmaX]')
				resultSigmaX.textContent = `${arithmeticMeanX.toFixed(1)} ± ${sigma}`
			}
		}
		console.log(`Среднее квадратическое отклонение X = %c${firstSigmaX}`, 'color: blue')
	}
	function sigmaY() {
		let sum = 0 // Переменная для суммы
		let count = 0 // Переменная для подсчета количества элементов
		let firstSigmaY
		for (let item of inputRight) {
			// Если запятая (,), то меняется на точку (.), потому что JS работает
			let valueFirst = item.value.replace(',', '.')
			// только с десятичыми числами только с использованием точки (.)
			let value = parseFloat(valueFirst) * 100000
			value = (value - arithmeticMeanY * 100000) ** 2 / 10000000000
			sum += value
			count++
			if (!isNaN(value)) {
				firstSigmaY = Math.sqrt(sum / count) // Вычисляем квадратическое отклонение
				const sigma = Math.sqrt(sum / count).toFixed(1)
				const resultSigmaY = document.querySelector('[data-sigmaY]')
				resultSigmaY.textContent = `${arithmeticMeanY.toFixed(1)} ± ${sigma}`
			}
		}
		console.log(`Среднее квадратическое отклонение Y = %c${firstSigmaY}`, 'color: blue')
		console.log('====================================')
	}
	//==============================================================

	// Стандартное отклонение
	let resultStandardDeviationX
	let resultStandardDeviationY
	let quantityX
	let quantityY

	function standardDeviationX() {
		let getValueFromTableX
		const inputsLeft = document.querySelectorAll('.input-left')
		// Считаем количество заполненных инпутов
		quantityX = 0
		inputsLeft.forEach((input) => {
			if (input.value !== '') quantityX++
		})

		if (quantityX <= 9) {
			getValueFromTableX = table[0][quantityX]
		} else if (quantityX <= 119) {
			const firstDigit = parseInt(quantityX.toString()[0], 10)
			const secondDigit = parseInt(quantityX.toString()[1], 10)
			getValueFromTableX = table[firstDigit][secondDigit]
		}
		//*******************************************************************
		let numbers = [] // Массив для хранения числовых значений инпутов
		inputsLeft.forEach((input) => {
			const value = parseFloat(input.value.replace(',', '.')) // Преобразуем значение инпута в число
			if (!isNaN(value)) {
				// Проверяем, является ли преобразованное значение числом
				numbers.push(value) // Добавляем значение в массив, если оно является числом
			}
		})
		if (numbers.length > 0) {
			// Проверяем, есть ли в массиве числа
			let max = Math.max(...numbers) // Находим максимальное значение
			let min = Math.min(...numbers) // Находим минимальное значение
			resultStandardDeviationX = (max - min) / getValueFromTableX
			console.log(
				`Стандартное отклонение X = %c${resultStandardDeviationX}`,
				'color: blue'
			)
			const standardDeviationX = document.querySelector(
				'[data-standardDeviationX]'
			)
			standardDeviationX.textContent = resultStandardDeviationX.toFixed(1)
		}
	}
	function standardDeviationY() {
		let getValueFromTableY
		const inputsRight = document.querySelectorAll('.input-right')
		// Считаем количество заполненных инпутов
		quantityY = 0
		inputsRight.forEach((input) => {
			if (input.value !== '') quantityY++
		})

		if (quantityY <= 9) {
			getValueFromTableY = table[0][quantityY]
		} else if (quantityY <= 119) {
			const firstDigit = parseInt(quantityY.toString()[0], 10)
			const secondDigit = parseInt(quantityY.toString()[1], 10)
			getValueFromTableY = table[firstDigit][secondDigit]
		}
		//*******************************************************************
		let numbers = [] // Массив для хранения числовых значений инпутов
		inputsRight.forEach((input) => {
			const value = parseFloat(input.value.replace(',', '.')) // Преобразуем значение инпута в число
			if (!isNaN(value)) {
				// Проверяем, является ли преобразованное значение числом
				numbers.push(value) // Добавляем значение в массив, если оно является числом
			}
		})
		if (numbers.length > 0) {
			// Проверяем, есть ли в массиве числа
			const max = Math.max(...numbers) // Находим максимальное значение
			const min = Math.min(...numbers) // Находим минимальное значение
			resultStandardDeviationY = (max - min) / getValueFromTableY
			console.log(
				`Стандартное отклонение Y = %c${resultStandardDeviationY}`,
				'color: blue'
			)
			console.log('====================================')
			const standardDeviationY = document.querySelector(
				'[data-standardDeviationY]'
			)
			standardDeviationY.textContent = resultStandardDeviationY.toFixed(1)
		}
	}
	//==============================================================

	// Стандартная ошибка среднего арифметического значения (m)
	let mX
	let mY
	function arithmeticMeanErrorX() {
		if (quantityX < 30) {
			mX = resultStandardDeviationX / Math.sqrt(quantityX - 1)
			console.log(
				`Стандартная ошибка среднего арифметического значения (m) X = %c${mX}`,
				'color: blue'
			)
			dataErrorX.textContent = mX.toFixed(1)
		} else if (quantityX >= 30) {
			mX = resultStandardDeviationX / Math.sqrt(quantityX)
			console.log(
				`Стандартная ошибка среднего арифметического значения (m) X = %c${mX}`,
				'color: blue'
			)
		}
	}
	function arithmeticMeanErrorY() {
		if (quantityY < 30) {
			mY = resultStandardDeviationY / Math.sqrt(quantityY - 1)
			console.log(
				`Стандартная ошибка среднего арифметического значения (m) Y = %c${mY}`,
				'color: blue'
			)
			dataErrorY.textContent = mY.toFixed(1)
		} else if (quantityY >= 30) {
			mY = resultStandardDeviationY / Math.sqrt(quantityY)
			console.log(
				`Стандартная ошибка среднего арифметического значения (m) Y = %c${mY}`,
				'color: blue'
			)
		}
		console.log('====================================')
	}
	//==============================================================

	// Стандартная ошибка разности (t)
	let finishedResult
	function averageError() {
		ResultFirst =
			(arithmeticMeanX - arithmeticMeanY) / Math.sqrt(mX ** 2 + mY ** 2);
		finishedResult = Math.abs(ResultFirst);	
		console.log(
			`Стандартная ошибка разности (t) %c${finishedResult}`,
			'color: blue'
		)
		const dataFinishResult = document.querySelector('[data-finishResult]')
		dataFinishResult.textContent = finishedResult.toFixed(2)
	}
	//==============================================================

	// Число степеней свободы и достоверность различий
	let f
	let getPFromTableP
	const paragraph = document.createElement('p')
	const pMore = document.createElement('p')
	const pLess = document.createElement('p')
	function findP() {
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
			'text-transform: uppercase; color: red; text-shadow: none; text-align: center; font-size: 1.5rem; margin-top: 10px'
		container.append(pMore)
		} else if (finishedResult < getPFromTableP) {
			paragraph.textContent = `Граничное значение (при p = 0,05) = ${getPFromTableP}`
			paragraph.style.cssText =
				'font-size: 1.5rem; font-weight: 700; text-align: center; margin-top: 20px; color: #fff; text-shadow: 0 0 5px #000'
			container.append(paragraph)
			pLess.textContent = 'различия не достоверны!'
			pLess.style.cssText =
				'text-transform: uppercase; color: red; text-shadow: none; text-align: center; font-size: 1.5rem; margin-top: 10px'
			container.append(pLess)
		}
	}

	//==============================================================

	// Кнопка добавления инпутов
	const btnAdd = document.querySelector('[data-btn]')
	btnAdd.addEventListener('click', function (event) {
		event.preventDefault()
		addInputs()
	})
	function addInputs() {
		let inputLeft = '<input class="input-left" type="text"/>'
		let inputRight = '<input class="input-right" type="text"/>'
		const formInnerLeft = document.querySelector('.form-inner__left')
		const formInnerRight = document.querySelector('.form-inner__right')
		formInnerLeft.insertAdjacentHTML('beforeend', inputLeft)
		formInnerRight.insertAdjacentHTML('beforeend', inputRight)
		inputsText[0].focus();
	}
	//==============================================================

	// Прослушка событий для кнопки ОЧИСТИТЬ 
	document.querySelector('[type="reset"]').addEventListener('click', reset) 
	function reset (){
		// Функция (анонимная) внутри функции заключается в скобки, затем объявляется немедленный вызов ();
		(function () {
			// Находим контейнеры, где могут быть динамически добавленные элементы
			var leftContainer = document.querySelector('.form-inner__left')
			var rightContainer = document.querySelector('.form-inner__right')
	
			// Удаляем все кроме первых 10 input элементов, предполагая, что они были там изначально
			var leftInputs = leftContainer.querySelectorAll('input')
			var rightInputs = rightContainer.querySelectorAll('input')
	
			if (leftInputs.length > 10) {
				for (var i = 10; i < leftInputs.length; i++) {
					leftInputs[i].remove()
				}
			}
	
			if (rightInputs.length > 10) {
				for (var i = 10; i < rightInputs.length; i++) {
					rightInputs[i].remove()
				}
			}
		})();
		(function () {
			const containerForCalcResult = document.querySelector('.form-inner__row-result');
			const calcResult = containerForCalcResult.querySelectorAll('.result');
			calcResult.forEach(function(text){
				text.textContent = '';
			});
			paragraph.remove();
			pMore.remove();
			pLess.remove();
		})();
		inputsText[0].focus();
	}