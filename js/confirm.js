// js for confirm page
function renderOrderSummary() {
  const containers = document.querySelectorAll('.order-summary');
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  let total = 0;
  let html = '';
 // update the order detail
  for (const [name, item] of Object.entries(cart)) {
    total += item.price * item.quantity;
    html += `
      <div class="cart-item" style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        margin-bottom: 20px;
      ">
        <div style="flex: 1;">
          <div><strong>Product:</strong> ${name}</div>
          <div><strong>Price:</strong> $${item.price}</div>
          <div><strong>Quantity:</strong> ${item.quantity}</div>
          <div><strong>Subtotal:</strong> $${(item.price * item.quantity).toFixed(2)}</div>
        </div>
        <div style="width: 100px; flex-shrink: 0;">
          <img src="${item.image}" alt="${name}" style="width: 100%; border-radius: 8px;" />
        </div>
      </div>
      <hr/>
    `;
  }
  // show the total order price
  html += `<div style="margin-top: 20px;"><strong>Total:</strong> $${total.toFixed(2)}</div>`;
  containers.forEach(container => (container.innerHTML = html));
}
// submit the order
function setupFormSubmitHandler() {
  document.querySelectorAll(".submit-btn").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Your order has been submitted successfully! 😀");
    });
  });
}
// Display the correct section when a delivery method is selected
function updateDeliverySections() {
  document.querySelectorAll("form.checkout-form").forEach(form => {
    const selected = form.querySelector('input[name="deliveryMethod"]:checked')?.value;
    const deliverySection = form.querySelector('#delivery-section');
    const pickupSection = form.querySelector('#pickup-section');

    if (deliverySection)
      deliverySection.style.display = (selected === 'delivery' || selected === 'point') ? 'block' : 'none';

    if (pickupSection)
      pickupSection.style.display = selected === 'pickup' ? 'block' : 'none';
  });
}
// track the options user select and update the form
function setupDeliveryToggle() {
  document.querySelectorAll("form.checkout-form").forEach(form => {
    form.querySelectorAll('input[name="deliveryMethod"]').forEach(radio => {
      radio.addEventListener('change', () => {
        updateDeliverySections();
        syncRadioBetweenForms(radio.value);
      });
    });
  });

  updateDeliverySections();
}
// Synchronize all input fields and radio button states between desktop and mobile
function syncForms() {
  const forms = document.querySelectorAll("form.checkout-form");
  if (forms.length < 2) return;

  const [formA, formB] = forms;

  function syncField(name) {
    const inputA = formA.querySelector(`[name="${name}"]`);
    const inputB = formB.querySelector(`[name="${name}"]`);
    if (inputA && inputB) {
      inputA.addEventListener('input', () => inputB.value = inputA.value);
      inputB.addEventListener('input', () => inputA.value = inputB.value);
    }
  }
  // List of form fields to synchronise
  const fieldNames = [
    'email', 'name', 'address', 'city', 'zip',
    'pickup-name', 'pickup-time',
    'cardname', 'cardnumber', 'expiry', 'cvv'
  ];
  fieldNames.forEach(syncField);
  // Synchronise the "subscribe" checkbox state
  const cbA = formA.querySelector('#subscribe');
  const cbB = formB.querySelector('#subscribe');
  if (cbA && cbB) {
    cbA.addEventListener('change', () => cbB.checked = cbA.checked);
    cbB.addEventListener('change', () => cbA.checked = cbB.checked);
  }

  ['delivery', 'pickup', 'point'].forEach(value => {
    const rA = formA.querySelector(`input[name="deliveryMethod"][value="${value}"]`);
    const rB = formB.querySelector(`input[name="deliveryMethod"][value="${value}"]`);
    if (rA && rB) {
      rA.addEventListener('change', () => {
        if (rA.checked) {
          rB.checked = true;
          updateDeliverySections();
        }
      });
      rB.addEventListener('change', () => {
        if (rB.checked) {
          rA.checked = true;
          updateDeliverySections();
        }
      });
    }
  });
}
// Synchronize the status of all forms when switching delivery methods
function syncRadioBetweenForms(value) {
  document.querySelectorAll(`input[name="deliveryMethod"][value="${value}"]`).forEach(input => {
    input.checked = true;
  });
  updateDeliverySections();
}
// Determine the display mode based on the page size
function setupViewportObserver() {
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if ((lastWidth < 1024 && window.innerWidth >= 1024) ||
        (lastWidth >= 1024 && window.innerWidth < 1024)) {
      updateDeliverySections();
    }
    lastWidth = window.innerWidth;
  });
}
// reload and initialize the page
window.addEventListener("load", () => {
  renderOrderSummary();
  setupFormSubmitHandler();
  setupDeliveryToggle();
  setupViewportObserver();
  syncForms();
});