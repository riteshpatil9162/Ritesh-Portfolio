// @desc    Chatbot controller
// @route   POST /api/chatbot
// @access  Public
export const handleChatbot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a message',
      });
    }

    // Simple rule-based chatbot responses
    const responses = {
      skills: {
        keywords: ['skill', 'technology', 'know', 'programming', 'language'],
        response: "I have expertise in Python, JavaScript, Machine Learning, React, Node.js, and Android Development. I'm proficient in Data Science technologies like TensorFlow, PyTorch, Scikit-learn, and modern web frameworks like React and Express.",
      },
      projects: {
        keywords: ['project', 'work', 'built', 'created', 'portfolio'],
        response: "I've worked on exciting projects like UrbanEye - a MERN-based municipal issue reporting platform with AI-powered validation, and DarshanEase - a temple ticket booking system with secure payments and real-time slot availability. You can view all my projects in the Projects section above!",
      },
      experience: {
        keywords: ['experience', 'job', 'internship', 'work'],
        response: "I have experience as a Data Science Intern at Tech Innovation Labs, Full Stack Developer at StartupHub Inc., and Android Developer Intern at Mobile Solutions Ltd. Check out my Experience section for more details!",
      },
      education: {
        keywords: ['education', 'study', 'degree', 'university', 'college'],
        response: "I'm currently pursuing B.Tech in Data Science Engineering at University of Technology with a CGPA of 8.5/10. My focus areas include Machine Learning, AI, and Big Data.",
      },
      contact: {
        keywords: ['contact', 'email', 'reach', 'hire', 'connect'],
        response: "You can reach me through the contact form on this page! Fill out your details and I'll get back to you as soon as possible. Looking forward to connecting!",
      },
      resume: {
        keywords: ['resume', 'cv', 'download'],
        response: "You can download my resume by clicking the 'Hire Me' button or reach out via the contact form. I'd be happy to share my detailed CV!",
      },
      greeting: {
        keywords: ['hi', 'hello', 'hey', 'greetings'],
        response: "Hello! 👋 I'm Ritesh's AI assistant. I can help you learn more about his skills, projects, experience, and education. What would you like to know?",
      },
      default: {
        response: "I can help you with information about Ritesh's skills, projects, experience, education, or how to get in touch. What would you like to know more about?",
      },
    };

    // Find matching response
    const lowerMessage = message.toLowerCase();
    let botResponse = responses.default.response;

    for (const [key, value] of Object.entries(responses)) {
      if (key !== 'default' && value.keywords.some(keyword => lowerMessage.includes(keyword))) {
        botResponse = value.response;
        break;
      }
    }

    res.status(200).json({
      success: true,
      data: {
        message: botResponse,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Chatbot error',
      error: error.message,
    });
  }
};
