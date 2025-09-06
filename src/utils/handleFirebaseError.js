import showMessage from "./showMessage";

// 🔹 Centralized error handler
export const handleFirebaseError = (error) => {
  const errMsg = String(error);
  console.log("Firebase Error: ", errMsg);
  if (errMsg.includes("auth/email-already-in-use")) {
    showMessage("This email is already in use", true);
  } else if (errMsg.includes("auth/wrong-password")) {
    showMessage("Email and password do not match", true);
  } else if (errMsg.includes("auth/invalid-email")) {
    showMessage("Invalid email format", true);
  } else if (errMsg.includes("auth/invalid-credential")) {
    showMessage("Please enter valid credentials", true);
  } else if (errMsg.includes("auth/user-not-found")) {
    showMessage("User not found", true);
  } else {
    showMessage("Something went wrong. Please try again.", true);
  }
};
