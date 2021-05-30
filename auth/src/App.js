import React from "react";
import "./App.css";
import Authentication from "./Authentication";
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

function Home() {
  return (
    <div className="App" style={{ flexDirection: "column" }}>
      <h1>Welcome</h1>
      <Link
        className="Auth_button"
        style={{ textDecoration: "none", background: "red" }}
        to="/auth"
      >
        Get access to the app
      </Link>
    </div>
  );
}

function Profile({ user }) {
  return (
    <div className="App" style={{ flexDirection: "column" }}>
      <h1 className="Auth_header" style={{ color: "indigo" }}>
        Welcome Back {user.name}
      </h1>
      <h2 className="Auth_header" style={{ color: "lime" }}>
        Email:{user.email}
      </h2>
    </div>
  );
}
function App() {
  const [user, setUser] = React.useState({});
  return (
    <Router>
      {/* <Navigation /> */}
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/auth"
        render={(props) => (
          <Authentication {...props} setUser={setUser} />
        )}
      />
      <Route
        exact
        path="/profile"
        render={(props) => <Profile {...props} user={user} />}
      />
    </Router>
  );
}

export default App;
