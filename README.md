# Smart Route Planning - AI-Powered Travel Optimization

A comprehensive route planning web application that optimizes your travel routes for cost, gas consumption, and time with AI-powered insights. Inspired by modern map applications like Google Maps and iOS Maps, featuring beautiful UI/UX and 3D map visualization.

## ✨ Features

### 🚗 Multi-Modal Transportation
- **Driving Routes**: Compare toll vs non-toll options
- **Flight Booking**: Real-time flight data and pricing
- **Public Transit**: CTA, Metra, Metro, Train, and Bus options
- **Budget-Friendly Options**: Smart recommendations for cost-effective travel

### 🗺️ Advanced Map Features
- **3D Map Visualization**: Immersive route planning experience
- **Real-time Traffic**: Current traffic conditions and route optimization
- **Interactive Route Comparison**: Side-by-side route analysis
- **Smart Break Planning**: Optimal stops along your route

### 🎨 Modern UI/UX
- **Responsive Design**: Seamless experience across all devices
- **Dark Mode Support**: Eye-friendly interface for all lighting conditions
- **Framer Motion Animations**: Smooth, interactive animations
- **Glass Morphism**: Modern backdrop blur effects

### 🔐 Authentication & User Management
- **Secure Login/Signup**: Email and Google OAuth integration
- **User Profiles**: Personalized preferences and history
- **Route Saving**: Save and share your favorite routes

### 💡 Smart Features
- **AI-Powered Insights**: Intelligent route suggestions
- **Cost Optimization**: Find the most budget-friendly options
- **Environmental Impact**: Carbon footprint calculations
- **Weather Integration**: Weather-aware route planning

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **ShadCN/UI** for component library
- **Framer Motion** for animations
- **React Icons** for beautiful icons

### Map & Visualization
- **Mapbox GL JS** for 3D map rendering
- **React Map GL** for React integration
- **Custom SVG** map overlays

### State Management
- **React Context** with useReducer
- **TypeScript** for type safety

## 📱 Screenshots

The application features a beautiful, modern interface inspired by the best route planning applications:

- **Authentication Page**: Clean login/signup forms with animated backgrounds
- **Route Search**: Intuitive form with transport mode selection
- **3D Map View**: Interactive map with route visualization
- **Route Comparison**: Side-by-side analysis of different route options
- **Mobile Responsive**: Optimized for all screen sizes

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-route-planning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Header, etc.)
│   ├── map/            # Map-related components
│   ├── route/          # Route planning components
│   └── ui/             # Basic UI components (Button, Card, etc.)
├── context/            # React Context for state management
├── pages/              # Main page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── hooks/              # Custom React hooks
```

## 🎯 Key Components

### Route Search Form
- Multi-modal transport selection
- Location input with autocomplete
- Break planning and preferences
- Budget and accessibility options

### Map Visualization
- 3D map rendering with route overlays
- Interactive route comparison
- Real-time traffic conditions
- Suggested stops and points of interest

### Route Results
- Detailed comparison of route options
- Cost, time, and environmental impact analysis
- One-click route selection
- Sharing and saving capabilities

## 🔧 Configuration

### Environment Variables
Create a `.env` file for API keys:

```env
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Transport Mode Options
The application supports these transport modes:
- `drive_no_tolls` - Driving without tolls
- `drive_with_tolls` - Driving with tolls
- `flight` - Commercial flights
- `train` - Train services
- `metro` - Metro/Subway
- `bus` - Bus services
- `cta` - Chicago Transit Authority
- `metra` - Metra commuter rail

## 🎨 Design System

### Color Palette
- Primary: Blue-to-Green gradient
- Secondary: Subtle grays
- Accent: Context-appropriate colors (green for eco-friendly, red for tolls)

### Typography
- Font Family: System fonts for optimal performance
- Headings: Gradient text effects
- Body: High contrast for accessibility

### Animations
- Page transitions with Framer Motion
- Hover effects and micro-interactions
- Loading states and progress indicators

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Google Maps and iOS Maps
- ShadCN/UI for the component system
- Mapbox for map visualization
- Framer Motion for animations
- React and Vite ecosystem

## 📞 Support

For support, email support@smartrouteplanning.com or create an issue in the GitHub repository.

---

**Smart Route Planning** - Making travel planning intelligent, beautiful, and efficient. 🚀