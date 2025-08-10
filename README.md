Blogging Platform
A full-stack web application for creating, managing, and viewing blogs. Users can register, log in, create blogs, edit or delete their own blogs, and view all blogs from all users.

Tech Stack
1. Frontend: React.js
2. Backend: Node.js, Express.js
3. Database: MongoDB Atlas
4. Image Storage: Cloudinary
5. Other: Multer (for handling file uploads before sending to Cloudinary)

Features
1. User authentication (Login/Register)
2. Create, edit, and delete blogs
3. View all blogs and personal blogs separately
4. Pastel-themed user interface
5. Image upload support
6. (Planned) Pagination for large blog lists

Installation
1. Clone the repository
git clone [your-repo-link]
cd blogging-platform

2. Install dependencies
(For backend as server)
cd server
npm install

(For Frontend as client)
cd ../client
npm install

3. Environment variables
Create a .env file inside the backend folder:

PORT=5000
FRONT_END_URL=https://your-frontend-url.com
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Create a .env file inside the frontend folder:
VITE_BACKEND_URL=http://localhost:5000

4. Run the project
(Backend)
cd backend
npm start

(Frontend)
cd ../frontend
npm run dev
