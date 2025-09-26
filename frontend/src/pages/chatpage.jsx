function ChatPage({ user }) {
  return (
    <div>
      <h1>Welcome, {user.fullName}</h1>
      <img src={user.profilePic || "/default.png"} alt="Profile" />
      <p>This is the chat page.</p>
    </div>
  );
}

export default ChatPage;
