# MongoDB Setup Instructions

## 1. Install MongoDB Package

First, install the MongoDB driver:

```bash
npm install mongodb
```

## 2. Update Environment Variables

Add your MongoDB connection string to `.env.local`:

```
# Email Configuration
EMAIL_USER=javhaa1410@gmail.com
EMAIL_PASS=wnyjdtdpgdkdcdgiq

# MongoDB Configuration
MONGODB_URI=mongodb+srv://javhaa1410:Jiyu_1014@mycomputer.7f0bhhe.mongodb.net
```

## 3. Database Structure

The app will automatically create:
- **Database**: `valentine-app`
- **Collection**: `dates`

## 4. Data Schema

Each date entry will have:
```json
{
  "_id": "MongoDB ObjectId",
  "id": 1234567890,
  "timestamp": "2024-06-27T10:30:00.000Z",
  "activities": ["Кино үзэх", "Кофе уух"],
  "time": "14:00",
  "dateConfirmed": true,
  "date": "2025.06.27",
  "day": "Бямба гариг"
}
```

## 5. Features

### ✅ What's Working:
- **MongoDB Integration**: All data stored in cloud database
- **Real-time Updates**: Admin dashboard shows live data
- **Scalable**: Can handle multiple users
- **Backup**: Data automatically backed up by MongoDB Atlas

### 🔧 API Endpoints:
- **POST /api/send-date**: Save new date to MongoDB
- **GET /api/dates**: Retrieve all dates from MongoDB

### 📊 Admin Dashboard:
- **URL**: `/admin`
- **Features**: View all MongoDB entries with timestamps

## 6. Benefits Over Local Storage

- ✅ **Cloud Storage**: Data accessible from anywhere
- ✅ **No Data Loss**: Automatic backups
- ✅ **Scalable**: Can handle thousands of entries
- ✅ **Real-time**: Multiple users can access simultaneously
- ✅ **Secure**: MongoDB Atlas security features

## 7. Testing

After setup:
1. Submit a form on the main page
2. Check `/admin` to see the entry in MongoDB
3. Verify data is stored in MongoDB Atlas dashboard

## 8. Troubleshooting

If you get connection errors:
- Check your MongoDB connection string
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify username/password are correct
- Check if the cluster is running 