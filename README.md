# Teamily

A modern team collaboration platform built with React and Node.js that enables teams to manage workspaces, projects, and tasks efficiently.

![Teamily](client/public/images/workspace.jpg)

## 🚀 Features

### 🔐 Authentication
- **Local Authentication**: Email and password-based registration and login
- **Google OAuth**: Seamless integration with Google accounts
- **Role-based Access Control**: Admin, Manager, and Member roles with different permissions

### 🏢 Workspace Management
- **Create Workspaces**: Set up dedicated spaces for your teams
- **Invite Members**: Send invitations to team members via email
- **Member Management**: Assign roles and manage team members
- **Analytics Dashboard**: Track workspace activity and performance

### 📋 Project Management
- **Create Projects**: Organize work into manageable projects
- **Project Analytics**: Monitor project progress and statistics
- **Custom Emojis**: Add personality to your projects with emoji customization
- **Project Overview**: Get insights into project status and team activity

### ✅ Task Management
- **Advanced Task Table**: Sortable, filterable task management interface
- **Task Status Tracking**: Todo, In Progress, In Review, Done
- **Task Priorities**: High, Medium, Low priority levels
- **Assignment System**: Assign tasks to team members
- **Due Date Management**: Set and track task deadlines

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Adaptive theming for user preference
- **Component Library**: Built with shadcn/ui components
- **Accessibility**: WCAG-compliant interface design
- **Loading States**: Skeleton loaders for better user experience

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **React Router** - Client-side routing
- **React Query** - Server state management
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **Zustand** - State management
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **bcrypt** - Password hashing
- **UUID** - Unique identifier generation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Teamily/
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── utils/          # Utility functions
│   │   └── validation/     # Input validation schemas
│   └── package.json
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React context providers
│   │   ├── lib/            # Utility libraries
│   │   ├── types/          # TypeScript type definitions
│   │   └── routes/         # Route configurations
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IOS2004/Teamily.git
   cd Teamily
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Client Setup**
   ```bash
   cd ../client
   npm install
   ```

### Environment Configuration

1. **Backend Environment**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/teamily
   SESSION_SECRET=your-session-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   CLIENT_URL=http://localhost:5173
   ```

2. **Client Environment**
   ```bash
   cd ../client
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

### Running the Application

1. **Start the Backend**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on http://localhost:5000

2. **Start the Frontend**
   ```bash
   cd client
   npm run dev
   ```
   The frontend will run on http://localhost:5173

3. **Seed Initial Data** (Optional)
   ```bash
   cd backend
   npm run seed
   ```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user

### Workspace Endpoints
- `GET /api/workspaces` - Get user workspaces
- `POST /api/workspaces` - Create new workspace
- `GET /api/workspaces/:id` - Get workspace details
- `PUT /api/workspaces/:id` - Update workspace
- `DELETE /api/workspaces/:id` - Delete workspace

### Project Endpoints
- `GET /api/projects` - Get workspace projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Task Endpoints
- `GET /api/tasks` - Get project tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow conventional commit messages
- Use ESLint and Prettier for code formatting
- Write unit tests for critical functionality

### Database Schema
- User management with role-based permissions
- Workspace-based organization
- Project and task hierarchical structure
- Audit trails for important actions

## 🐛 Known Issues

- Google OAuth callback may require HTTPS in production
- MongoDB connection requires proper network configuration
- Large file uploads not yet implemented

## 🔮 Roadmap

- [ ] Real-time notifications
- [ ] File upload and attachment system
- [ ] Advanced reporting and analytics
- [ ] Mobile app development
- [ ] Integration with third-party tools (Slack, Trello, etc.)
- [ ] Time tracking functionality
- [ ] Advanced search and filtering

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [IOS2004](https://github.com/IOS2004)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Node.js](https://nodejs.org/) - Backend runtime
- [MongoDB](https://mongodb.com/) - Database
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

**Built with ❤️ for modern teams**
