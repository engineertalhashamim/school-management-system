const login = (req, res) => {
  console.log("hello");
  const { email, password } = req.body;
  console.log("hello");

  if (email === "talha@gmail.com" && password === "admin123") {
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: 1,
        email: "talha@gmail.com",
        role: "admin",
      },
      token: "dummy-token-123",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
};

const logout = (req, res) => {
  res.json({
    success: true,
    message: "Logout successful",
  });
};

export { login, logout };
