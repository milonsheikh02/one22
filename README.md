# ONE⚡CASH - Crypto Exchange Website

Fast, Secure & Anonymous Cryptocurrency Exchange Platform

## 🚀 Features

- ⚡ **Fast Exchange** - Instant cross-chain cryptocurrency swaps
- 🔒 **Secure & Anonymous** - No account required
- 💰 **Fixed Rates** - Transparent pricing with no hidden fees
- 📱 **Responsive Design** - Works on all devices
- 🔄 **Real-time Updates** - Live payment status tracking

## 💎 Supported Cryptocurrencies

| Coin | Rate (USD) |
|------|-----------|
| BTC  | $165,870  |
| ETH  | $5,909    |
| TRX  | $0.540    |
| BNB  | $1,499    |

## 📦 Installation

1. **Clone or download this project**

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Copy .env.example to .env
copy .env.example .env

# Edit .env and add your NowPayments API credentials
```

4. **Start the server**
```bash
npm start
```

5. **Open your browser**
```
http://localhost:3000
```

## 🔧 Configuration

### NowPayments API Setup

1. Sign up at [NowPayments.io](https://nowpayments.io/)
2. Get your API key from the dashboard
3. Update `.env` file:
```env
NOW_API_KEY=your_real_api_key_here
WEBHOOK_SECRET=your_webhook_secret_here
BASE_URL=https://yourdomain.com
```

### Webhook Configuration

Set your webhook URL in NowPayments dashboard:
```
https://yourdomain.com/webhook/payment?secret=your_webhook_secret_here
```

## 📖 How It Works

### Exchange Flow

1. **User selects coin** (BTC, ETH, TRX, or BNB)
2. **Enters amount** to exchange
3. **System calculates USD value** using fixed rates
4. **User selects receive method** (USDT TRC20 or ERC20)
5. **Enters wallet address**
6. **Clicks "Exchange Now"**
7. **Redirected to payment page** with QR code
8. **Sends payment** within 10 minutes
9. **Receives USDT** automatically after confirmation

### Backend Flow

```
Frontend → POST /api/create-payment → NowPayments API
                ↓
         Order Created & Saved
                ↓
         Payment Page (QR Code)
                ↓
         User Sends Payment
                ↓
    NowPayments → Webhook → Update Status
                ↓
         Status: PAID ✅
```

## 🗂️ File Structure

```
├── index.html          # Homepage with exchange form
├── payment.html        # Payment page with QR code & timer
├── style.css           # Complete styling
├── script.js           # Frontend logic
├── server.js           # Backend API & NowPayments integration
├── package.json        # Dependencies
├── orders.json         # Order logs (auto-created)
├── .env.example        # Environment variables template
└── README.md           # Documentation
```

## 🔌 API Endpoints

### Create Payment
```http
POST /api/create-payment
Content-Type: application/json

{
  "coin": "ETH",
  "amount": "0.5",
  "receiveMethod": "USDT-TRC20",
  "receiveWallet": "TAZxv...",
  "usdValue": "2954.5"
}
```

### Get Order Details
```http
GET /api/order/:orderId
```

### Webhook (NowPayments)
```http
POST /webhook/payment?secret=WEBHOOK_SECRET
```

### Demo: Simulate Payment (Testing Only)
```http
POST /api/demo/complete-payment/:orderId
```

## 🧪 Testing

To test the payment flow without real transactions:

1. Create an exchange order
2. Copy the order ID from the payment page
3. Use the demo endpoint:
```bash
curl -X POST http://localhost:3000/api/demo/complete-payment/NP123456
```
4. Refresh the payment page to see status change to "PAID"

## 🔐 Security Features

- ✅ API keys stored in environment variables
- ✅ Webhook secret validation
- ✅ Server-side rate validation
- ✅ Wallet address format validation
- ✅ Order data logged securely

## 📱 Responsive Design

- Desktop: Full-featured layout
- Tablet: Optimized grid layout
- Mobile: Single-column, touch-friendly

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is for demonstration purposes.

## 🆘 Support

For issues or questions:
- Check the FAQ section on the website
- Review NowPayments documentation
- Contact support

## 🎯 Production Checklist

Before going live:

- [ ] Replace demo API keys with real NowPayments credentials
- [ ] Set up proper webhook URL
- [ ] Configure SSL certificate (HTTPS)
- [ ] Set correct BASE_URL in .env
- [ ] Test with small amounts first
- [ ] Add error logging system
- [ ] Set up database instead of JSON file
- [ ] Implement rate limiting
- [ ] Add email notifications
- [ ] Configure backup system

## 🔄 Updates & Maintenance

To update exchange rates, modify the `FIXED_RATES` object in both:
- `script.js` (frontend)
- `server.js` (backend)

---

**Made with ⚡ by ONE⚡CASH Team**

*Fast, Secure & Anonymous Crypto Exchange*
