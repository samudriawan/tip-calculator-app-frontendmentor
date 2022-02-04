const inputBill = document.getElementById('bill');
const radioList = document.querySelectorAll('input[type=radio]');
// const inputTip = document.querySelector('input[name=tip]:checked');
const inputPerson = document.getElementById('person');

const customTipInput = document.getElementById('tip-custom-input');
const customTipRadio = document.getElementById('tip-custom-radio');

const resetBtn = document.getElementById('resetBtn');

window.onload = () => {
	document.getElementById('form').reset();
	disableReset();
};

// get input radio checked value
function radioCheckedValue() {
	for (let i = 0, j = radioList.length; i < j; i++) {
		if (radioList[i].checked) {
			// console.log(radioList[i].value);
			return radioList[i].value;
		}
	}
}

// when custom tip is clicked, coresponding radio is checked
customTipInput.addEventListener('click', () => {
	customTipRadio.checked = true;
});

customTipInput.addEventListener('input', () => {
	const customValue = customTipInput.value;
	customTipRadio.value = customValue;
	// console.log(customTipRadio.value);
});

// disable reset button
function disableReset() {
	if (!inputIsValid()) {
		resetBtn.disabled = true;
	}
}

// check if input is empty
function inputIsEmpty() {
	if (inputBill.value == '' && document.querySelector('input[type=radio]:checked') == null && inputPerson.value == '') {
		return true;
	}
	return false;
}

// check if input is valid
function inputIsValid() {
	if (inputBill.value == '' || inputBill.value == '0') {
		return false;
	} else if (document.querySelector('input[type=radio]:checked') == null) {
		return false;
	} else if ((customTipRadio.checked && customTipRadio.checked.value == '0') || (customTipRadio.checked && customTipRadio.checked.value == '')) {
		return false;
	} else if (inputPerson.value == '0' || inputPerson.value == '') {
		return false;
	} else {
		return true;
	}
}

// displaying error when input person is 0 or empty
inputPerson.addEventListener('input', () => {
	const errPerson = document.getElementById('error-person');
	if (inputPerson.value == '0' || inputPerson.value == '') {
		errPerson.classList.remove('d-none');
		inputPerson.style.outline = '3px solid #d68577';
	} else {
		errPerson.classList.add('d-none');
		inputPerson.style.outline = null;
	}
	// console.log(inputPerson.value);
});

// calculate total amount per person
function calculateTotal(bill, tip, person) {
	let total = (bill * (1 + tip / 100)) / person;
	return total.toFixed(2);
}

// // calculate tip amount per person
function calculateTip(bill, tip, person) {
	let tipAmount = (bill * (tip / 100)) / person;
	return tipAmount.toFixed(2);
}

// displaying the result when an input is modified and valid
document.querySelectorAll('input').forEach((element) => {
	element.addEventListener('input', () => {
		// if input is empty disable reset button
		if (inputIsEmpty()) {
			resetBtn.disabled = true;
		} else {
			resetBtn.disabled = false;
		}

		let billAmount = inputBill.value;
		let tipValue = radioCheckedValue();
		let numberOfPerson = inputPerson.value;

		// if input is valid display result
		if (inputIsValid()) {
			let tipResult = calculateTip(billAmount, tipValue, numberOfPerson);
			let totalResult = calculateTotal(billAmount, tipValue, numberOfPerson);

			document.getElementById('tip-person').innerHTML = tipResult;
			document.getElementById('total-person').innerHTML = totalResult;
		} else {
			document.getElementById('tip-person').innerHTML = '0.00';
			document.getElementById('total-person').innerHTML = '0.00';
		}
	});
});

// reset button
resetBtn.addEventListener('click', () => {
	document.getElementById('form').reset();
	document.getElementById('tip-person').innerHTML = '0.00';
	document.getElementById('total-person').innerHTML = '0.00';
	resetBtn.disabled = true;
});
