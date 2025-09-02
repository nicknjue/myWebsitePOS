const foodPrices = {
  'Chapo': 20,
  'Ugali': 15,
  'Rice': 25,
  'Beans': 30,
  'Ndengu': 35,
  'Beef': 150
};

// Disable typing in servings
function preventTyping(e) {
  e.preventDefault();
}

document.querySelectorAll('.servings-input-quantity').forEach(input => {
  input.addEventListener('keydown', preventTyping);
});

// == vs === example
let a = '5';
let b = 5;
console.log(a == b);  // true
console.log(a === b); // false

// Parse quantity with fallback
function parseQuantity(value) {
  let qty = parseInt(value);
  if (!qty) qty = 1;
  return qty;
}

// Toggle servings
function toggleServings(foodItem) {
  const checkbox = document.getElementById(foodItem);
  const servingsDiv = document.getElementById(foodItem + '-servings');
  servingsDiv.style.display = checkbox.checked ? 'block' : 'none';
  calculateTotal();
}

// Calculate total
function calculateTotal() {
  let total = 0;
  let hasSelected = false;

  Object.keys(foodPrices).forEach(item => {
    const checkbox = document.getElementById(item);
    if (checkbox && checkbox.checked) {
      hasSelected = true;
      const qty = parseQuantity(document.getElementById(item + '-qty').value);
      total += foodPrices[item] * qty;
    }
  });

  document.getElementById('orderTotal').style.display = hasSelected ? 'block' : 'none';
  document.getElementById('totalAmount').textContent = total;
}

// Clear form
function clearForm() {
  document.getElementById('contactForm').reset();
  document.querySelectorAll('.servings-input').forEach(div => div.style.display = 'none');
  document.getElementById('orderTotal').style.display = 'none';
  document.getElementById('totalAmount').textContent = 0;
  document.querySelectorAll('.error-message').forEach(div => div.style.display = 'none');
}

// Validation helpers
function showError(inputId, errorId, msg) {
  document.getElementById(inputId).classList.add('error');
  document.getElementById(errorId).textContent = msg;
  document.getElementById(errorId).style.display = 'block';
}
function hideError(inputId, errorId) {
  document.getElementById(inputId).classList.remove('error');
  document.getElementById(errorId).style.display = 'none';
}

// On form submit
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let isValid = true;

  const name = document.getElementById('cname').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const prefs = document.getElementById('prefs').value.trim();
  const town = document.getElementById('town').value;
  const fooditems = document.querySelectorAll("input[name='food[]']:checked");
  const paymentMethod = document.querySelector("input[name='mode']:checked");

  if (name.length < 5) {
    showError('cname', 'nameError', "Name must be at least 5 characters");
    isValid = false;
  } else hideError('cname', 'nameError');

  if (!/^\d{10}$/.test(phone)) {
    showError('phone', 'phoneError', "Phone must be 10 digits (e.g. 0712345678)");
    isValid = false;
  } else hideError('phone', 'phoneError');

  if (fooditems.length === 0) {
    document.getElementById('food-items').style.border = '1px solid red';
    document.getElementById('foodError').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('food-items').style.border = 'none';
    document.getElementById('foodError').style.display = 'none';
  }

  if (!paymentMethod) {   
    document.getElementById('modeError').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('modeError').style.display = 'none';
  }

  if (!town) {
    document.getElementById('townError').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('townError').style.display = 'none';
  }

  if (isValid) {
    let items = [];
    fooditems.forEach(item => {
      const qty = document.getElementById(item.value + '-qty').value;
      items.push(`${item.value}(${qty})`);
    });

    alert(`🧾 Order Details:
Name: ${name}
Phone: ${phone}
Email: ${email}
Town: ${town}
Food Items: ${items.join(', ')}
Payment Method: ${paymentMethod.value}
Preferences: ${prefs}
Total: KSh ${document.getElementById('totalAmount').textContent}`);
  }
});
