import { Menu, Layout } from "antd";
import { BookOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const { Header } = Layout;

const Navbar = ({ auth, logoutUser }) => {
  const { isAuthenticated, user } = auth;

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Header style={{ backgroundColor: "#fff", padding: "0 24px", boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.05)" }}>
      <img src="https://assets.ccbp.in/frontend/react-js/website-logo-dark-theme-img.png" className="website-logo" alt="website logo" />
      <div className="navbar-links">
        <Menu mode="horizontal">
          <Menu.Item key="contact">
            <Link to="/contact">
              Contact
            </Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">
              About
            </Link>
          </Menu.Item>
          {isAuthenticated ? (
            <>
              <Menu.Item key="profile">
                <Link to="/profile">
                  <UserOutlined />
                  {user.name}
                </Link>
              </Menu.Item>
              <Menu.Item key="logout" onClick={handleLogout}>
                <LoginOutlined />
                Logout
              </Menu.Item>
            </>
          ) : (
            <Menu.Item key="login">
              <Link to="/login">
                <LoginOutlined />
                Login
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </Header>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
