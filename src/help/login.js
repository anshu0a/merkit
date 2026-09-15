const loginMsg = [
  {
    title: "Good To See You",
    subtitle: "Your world is ready, and your next adventure starts right here."
  },
  {
    title: "Welcome Back My Friend",
    subtitle: "Everything you love is waiting for you inside your account."
  },
  {
    title: "You Are Finally In",
    subtitle: "Your journey continues now, with plenty of exciting things ahead."
  },
  {
    title: "The Legend Returns Again",
    subtitle: "We saved your place because every legend deserves another entrance."
  },
  {
    title: "Welcome To Your World",
    subtitle: "Everything here belongs to you, so make yourself completely comfortable."
  },
  {
    title: "Your Space Awaits You",
    subtitle: "Everything is prepared perfectly for your return to the community."
  },
  {
    title: "Look Who Returned Again",
    subtitle: "We knew you would come back eventually, and here you are."
  },
  {
    title: "Another Great Day Begins",
    subtitle: "You are logged in, so now make something amazing happen."
  },
  {
    title: "Your Account Missed You",
    subtitle: "Luckily, you are finally back where everything feels familiar again."
  },
  {
    title: "Back Where You Belong",
    subtitle: "Your favorite space is ready and waiting for your return."
  },
  {
    title: "You Are Back Again",
    subtitle: "Everything is exactly where you left it, waiting patiently."
  },
  {
    title: "Hello There Welcome Back",
    subtitle: "Your digital home is ready for another wonderful visit."
  },
  {
    title: "Your Adventure Continues",
    subtitle: "New moments are waiting, and your story continues from here."
  },
  {
    title: "Unlock the Door",
    subtitle: "Step inside and discover everything your account has prepared."
  },
  {
    title: "You Just Got In",
    subtitle: "Your personalized experience is ready whenever you are."
  },
  {
    title: "Welcome To Your Journey",
    subtitle: "Every great journey needs a beginning, and yours starts now."
  },
  {
    title: "Back With More Energy",
    subtitle: "Your return means the fun can continue without missing anything."
  },
  {
    title: "Hello Again Dear Explorer",
    subtitle: "There are plenty of new things waiting for you today."
  },
  {
    title: "Finally You Have Arrived",
    subtitle: "Your destination is ready, and your next experience begins here."
  }
];

const registerMsg = [
  {
    title: "Welcome To Something New",
    subtitle: "Your journey starts here, and there is so much waiting for you to discover."
  },
  {
    title: "Your Story Starts Here",
    subtitle: "Create your account and take the first step toward something amazing."
  },
  {
    title: "Welcome To Your New Space",
    subtitle: "Everything you need to begin your journey is right here waiting for you."
  },
  {
    title: "A New Adventure Awaits",
    subtitle: "Join the community and discover new experiences made just for you."
  },
  {
    title: "Let's Get You Started",
    subtitle: "Create your account today and unlock everything waiting on the other side."
  },
  {
    title: "Your Journey Begins Now",
    subtitle: "Every great experience starts with a single step, and this is yours."
  },
  {
    title: "Welcome Future Legend",
    subtitle: "Your place is ready, so go ahead and make your mark."
  },
  {
    title: "Something Great Starts Today",
    subtitle: "Create your account and turn this moment into the beginning of something special."
  },
  {
    title: "Come Be Part Of It",
    subtitle: "There is a whole world waiting for you, and you are invited inside."
  },
  {
    title: "Your New Chapter Begins",
    subtitle: "Leave the ordinary behind and start building your next great chapter."
  },
  {
    title: "Nice To Meet You",
    subtitle: "We are excited to have you here, so let's make your first step count."
  },
  {
    title: "Welcome To The Community",
    subtitle: "Connect, explore, and become part of something bigger than yourself."
  },
  {
    title: "Ready To Begin",
    subtitle: "Your account is just a few steps away from opening a world of possibilities."
  },
  {
    title: "Step Into Something Amazing",
    subtitle: "A fresh experience is waiting for you, and it starts with creating your account."
  },
  {
    title: "Your Place Is Waiting",
    subtitle: "Join us today and discover a space where your next adventure can begin."
  },
  {
    title: "Make Your First Move",
    subtitle: "Create your account and start exploring everything we have prepared for you."
  },
  {
    title: "Welcome New Explorer",
    subtitle: "There is plenty to discover, and your adventure is about to begin."
  },
  {
    title: "This Could Be The Beginning",
    subtitle: "One account, countless possibilities, and a brand-new journey ahead."
  },
  {
    title: "Your Adventure Starts Here",
    subtitle: "Take the first step today and see where this new journey takes you."
  }
];

const forgotPasswordMsg = [
  {
    title: "Let's Get You Back In",
    subtitle: "No worries. We'll help you reset your password and get back to your account."
  },
  {
    title: "Forgot Your Password?",
    subtitle: "It happens. Enter your details and we'll help you get back into your account."
  },
  {
    title: "Your Account Is Waiting",
    subtitle: "Reset your password and continue right where you left off."
  },
  {
    title: "Let's Fix That",
    subtitle: "A few simple steps are all it takes to create a new password."
  },
  {
    title: "Back To Your Account",
    subtitle: "Reset your password securely and get back to what matters."
  },
  {
    title: "A Fresh Start",
    subtitle: "Create a new password and start using your account again."
  },
  {
    title: "Don't Worry, We've Got You",
    subtitle: "We'll help you securely recover access to your account."
  },
  {
    title: "Get Back On Track",
    subtitle: "Reset your password and continue your journey with us."
  },
  {
    title: "Your Access, Restored",
    subtitle: "Follow the steps to create a new password and regain access."
  },
  {
    title: "One Step From Getting Back",
    subtitle: "Enter your email and we'll send you everything you need to reset your password."
  },
  {
    title: "Let's Recover Your Account",
    subtitle: "We'll guide you through a quick and secure password reset."
  },
  {
    title: "Almost Back In",
    subtitle: "Reset your password and you'll be ready to continue."
  },
  {
    title: "Secure Your Account",
    subtitle: "Create a new password to keep your account safe and accessible."
  },
  {
    title: "Your Next Login Starts Here",
    subtitle: "Choose a new password and get ready to sign in again."
  },
  {
    title: "We Can Help",
    subtitle: "Forgot your password? Let's get your account access back."
  },
  {
    title: "Back To Where You Belong",
    subtitle: "A quick password reset will get you back into your account."
  },
  {
    title: "Let's Unlock Your Account",
    subtitle: "Follow the steps below to securely reset your password."
  },
  {
    title: "New Password, Same Account",
    subtitle: "Set a new password and continue exactly where you left off."
  },
  {
    title: "Your Account Isn't Going Anywhere",
    subtitle: "Reset your password securely and get back to your account."
  }
];
//----------------------------------------------------------------------------------
const randomRegisterMsg = registerMsg[Math.floor(Math.random() * registerMsg.length)];
const randomLoginMsg = loginMsg[Math.floor(Math.random() * loginMsg.length)];
const randomForgotMsg = forgotPasswordMsg[Math.floor(Math.random() * forgotPasswordMsg.length)];

export { randomLoginMsg,randomRegisterMsg,randomForgotMsg };