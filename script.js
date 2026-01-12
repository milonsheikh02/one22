// Fixed exchange rates (USD)
const FIXED_RATES = {
    BTC: 165870,
    ETH: 5909,
    TRX: 0.540,
    BNB: 1499
};

// Get DOM elements
const exchangeForm = document.getElementById('exchangeForm');
const sendCoinSelect = document.getElementById('sendCoin');
const sendAmountInput = document.getElementById('sendAmount');
const usdValueInput = document.getElementById('usdValue');
const rateInfo = document.getElementById('rateInfo');
const coinHint = document.getElementById('coinHint');

// Update USD value when coin or amount changes
function updateUSDValue() {
    const selectedCoin = sendCoinSelect.value;
    const amount = parseFloat(sendAmountInput.value);

    if (selectedCoin && amount > 0) {
        const rate = FIXED_RATES[selectedCoin];
        const usdValue = (amount * rate).toFixed(2);
        
        usdValueInput.value = `${usdValue} USD`;
        rateInfo.textContent = `1 ${selectedCoin} = ${rate.toLocaleString()} USD`;
        coinHint.textContent = `You are sending ${selectedCoin}`;
    } else {
        usdValueInput.value = '';
        rateInfo.textContent = '';
        coinHint.textContent = '';
    }
}

// Event listeners for real-time calculation
sendCoinSelect.addEventListener('change', updateUSDValue);
sendAmountInput.addEventListener('input', updateUSDValue);

// Handle form submission
exchangeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const coin = sendCoinSelect.value;
    const amount = sendAmountInput.value;
    const receiveMethod = document.getElementById('receiveMethod').value;
    const receiveWallet = document.getElementById('receiveWallet').value;
    const usdValue = usdValueInput.value.replace(' USD', '');

    // Validate inputs
    if (!coin || !amount || !receiveMethod || !receiveWallet) {
        alert('Please fill in all fields');
        return;
    }

    // Validate wallet address format
    if (!validateWalletAddress(receiveWallet, receiveMethod)) {
        alert('Invalid wallet address for selected network');
        return;
    }

    // Show loading state
    const submitButton = exchangeForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Creating Payment...';
    submitButton.disabled = true;

    try {
        // Send request to backend
        const response = await fetch('/api/create-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                coin,
                amount,
                receiveMethod,
                receiveWallet,
                usdValue
            })
        });

        const data = await response.json();

        if (data.success) {
            // Redirect to payment page with all required parameters
            window.location.href = `/payment.html?order_id=${data.order_id}&amount=${encodeURIComponent(amount)}&coin=${encodeURIComponent(coin)}&method=${encodeURIComponent(receiveMethod)}&usd=${encodeURIComponent(usdValue)}&selected_coin=${encodeURIComponent(coin)}`;
        } else {
            alert('Error: ' + (data.message || 'Failed to create payment'));
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please try again.');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Validate wallet address format
function validateWalletAddress(address, method) {
    if (!address || address.length < 20) {
        return false;
    }

    if (method === 'USDT-TRC20') {
        // TRC20 addresses start with 'T'
        return address.startsWith('T') && address.length === 34;
    } else if (method === 'USDT-ERC20') {
        // ERC20 addresses start with '0x'
        return address.startsWith('0x') && address.length === 42;
    }

    return true;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
