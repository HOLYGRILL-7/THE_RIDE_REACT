import React, { useState, useEffect } from "react";
import car from "../assets/4X4.png"; 
import refresh from "../assets/refresh.png"; 

const SlidingCarSignup = () => {
  // Animation state management
  const [animationStage, setAnimationStage] = useState(0); // 0: initial, 1: car in, 2: palms in, 3: car lifts + buttons, 4: form open
  const [showForm, setShowForm] = useState(false); // Controls form visibility
  const [formType, setFormType] = useState('signup'); // Toggle between 'signup' and 'signin'
  const [isReplaying, setIsReplaying] = useState(false); // Prevents multiple replay clicks

  // Animation timing constants
  const SLIDE_IN_DELAY = 500;   // Car slide-in delay
  const CAR_IN_DELAY = 1500;   // Car in delay
  const LIFT_UP_DELAY = 2500;   // Car lifts + buttons appear delay

  // Initial animation sequence on component mount
  useEffect(() => {
    // Stage 1: Car slides in from left
    const timer1 = setTimeout(() => setAnimationStage(1), SLIDE_IN_DELAY);
    // Stage 2: Car slides in from sides
    const timer2 = setTimeout(() => setAnimationStage(2), CAR_IN_DELAY);
    // Stage 3: Car lifts up + buttons appear
    const timer3 = setTimeout(() => setAnimationStage(3), LIFT_UP_DELAY);

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Handle opening form and moving car to top
  const handleFormOpen = (type) => {
    setFormType(type); // Set form type (signup/signin)
    setShowForm(true); // Show the form
    setAnimationStage(4); // Move car to top for form
  };

  // Handle closing form and moving car back to lifted position
  const handleFormClose = () => {
    setShowForm(false); // Hide the form
    setAnimationStage(3); // Move car back to lifted position
  };

  // Reset entire animation sequence
  const resetAnimation = () => {
    setIsReplaying(true); // Disable replay button
    setShowForm(false); // Hide form if open
    setAnimationStage(0); // Reset to initial state
    
    // Restart animation sequence
    setTimeout(() => setAnimationStage(1), SLIDE_IN_DELAY);
    setTimeout(() => setAnimationStage(2), CAR_IN_DELAY);
    setTimeout(() => {
      setAnimationStage(3);
      setIsReplaying(false); // Re-enable replay button
    }, LIFT_UP_DELAY);
  };

  return (
    <div className="min-h-screen bg-blue-100 overflow-hidden relative">
      
      {/* Blue background container */}
      <div
        className={`absolute top-4/5 transition-all duration-700 ease-out z-30 bg-blue-400 -skew-y-10 w-full h-full ${
          animationStage >= 1
            ? "translate-y-0 opacity-100"
            : "translate-y-96 opacity-0"
        }`}
      ></div>

      {/* Main car - separate from blue background, higher z-index */}
      <div
        className={`absolute top-118 left-1/3 transform -translate-x-1/2 z-[60] transition-all duration-1000 ease-out ${
          animationStage >= 4 ? "-translate-y-90" : // Stage 4: Move to top for form
          animationStage >= 3 ? "-translate-y-16" : // Stage 3: Lift up a bit
          animationStage >= 2 ? "-translate-x-1 opacity-100" : // Stage 2: Center on screen
          "-translate-x-full opacity-0" // Stage 0-1: Slide in from left
        }`}
      >
        <img
          src={car}
          alt="Car"
          className="w-48 h-24 object-contain drop-shadow-xl"
        />
        {/* Animated indicator dot */}
        <div className="absolute -top-2 -right-2">
          <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Decorative floating particles for ambiance */}
      <div
        className={`absolute top-18 left-18 transition-all duration-1000 ease-out delay-200 z-40 ${
          animationStage >= 2
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="w-5 h-5 bg-yellow-300 bg-opacity-60 rounded-full animate-pulse"></div>

      </div>

       <div
        className={`absolute top-12 right-52 transition-all duration-1000 ease-out delay-300 z-40 ${
          animationStage >= 2
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="w-3 h-3 bg-white/50 rounded-full animate-bounce"></div>
      </div>
      
      <div
        className={`absolute top-26 right-22 transition-all duration-1000 ease-out delay-300 z-40 ${
          animationStage >= 2
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="w-5 h-5 bg-yellow-300 bg-opacity-70 rounded-full animate-bounce"></div>
      </div>

      {/* Call-to-action buttons - fade in AFTER car lifts up (stage 3) */}
      {!showForm && (
        <div 
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 space-y-4 transition-opacity duration-700 ease-in-out z-50 ${
            animationStage >= 3 ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Primary signup button */}
          <button
            onClick={() => handleFormOpen('signup')}
            className={`block w-64 bg-blue-900 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg hover:bg-blue-800 transition-all ease-in-out ${
              animationStage >= 3 ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            }`}
          >
            Get Started
          </button>
          {/* Secondary signin button */}
          <button
            onClick={() => handleFormOpen('signin')}
            className={`block w-64 bg-white bg-opacity-20 backdrop-blur-sm py-3 px-8 rounded-2xl font-medium text-black border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-700 ease-in-out ${
              animationStage >= 3 ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            }`}
          >
            Sign In
          </button>
        </div>
      )}

      {/* Modal-style form that slides up from bottom */}
      <div
        className={`relative z-50 top-46 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-all duration-700 ease-out ${
          showForm
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <div className="p-8 max-w-md mx-auto">
          {/* Mobile-style form handle indicator */}
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

          {/* Close button with X icon */}
          <button
            onClick={handleFormClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Dynamic form header based on form type */}
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            {formType === 'signup' ? 'Welcome!' : 'Welcome Back!'}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            {formType === 'signup' ? 'Join our amazing journey' : 'Sign in to continue'}
          </p>

          {/* Form fields - different based on signup/signin */}
          <div className="space-y-4">
            {/* Full name field - only for signup */}
            {formType === 'signup' && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            )}
            {/* Email field - common for both forms */}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
            {/* Password field - common for both forms */}
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />

            {/* Forgot password link - only for signin */}
            {formType === 'signin' && (
              <div className="text-right">
                <button className="text-purple-500 text-sm font-medium hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit button with dynamic text */}
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              {formType === 'signup' ? 'Create Account' : 'Sign In'}
            </button>

            {/* Toggle between signup/signin */}
            <p className="text-center text-gray-500 text-sm">
              {formType === 'signup' ? 'Already have an account?' : "Don't have an account?"}{" "}
              <button 
                onClick={() => setFormType(formType === 'signup' ? 'signin' : 'signup')}
                className="text-purple-500 font-semibold hover:underline"
              >
                {formType === 'signup' ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="header-sec absolute top-16 left-1/5  z-50">
        <h1 className="text-5xl font-black text-gray-800 pt-1 ">THE RIDE</h1>
      </div>

      {/* Debug/Demo replay button */}
      <button
        onClick={resetAnimation}
        disabled={isReplaying}
        className="absolute top-6 right-6 bg-white bg-opacity-20 backdrop-blur-sm text-black px-4 py-2 rounded-full hover:bg-opacity-30 transition-all duration-200 disabled:opacity-50 z-60"
      >
        {isReplaying ? "..." : <img src={refresh} alt="Location" className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default SlidingCarSignup;