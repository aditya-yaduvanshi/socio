import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {signup} from "../redux/actions/auth";
import Loader from "../components/Loader";
import {connect} from "react-redux";

class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };
  setName(text) {
    this.setState({
      name: text,
    });
  }
  setEmail(text) {
    this.setState({
      email: text,
    });
  }
  setPassword(text) {
    this.setState({
      password: text,
    });
  }
  setPassword2(text) {
    this.setState({
      password2: text,
    });
  }
  submitSignup() {
    this.props.signup({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    });
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }
    if (this.props.signedup) {
      return this.props.navigation.navigate("verification");
    } else if (this.props.loggedin)
      return this.props.navigation.navigate("home");
    else
      return (
        <>
          <View style={styles.container}>
            <Text style={styles.app}>SOCIO</Text>
            <View style={styles.view}>
              <Text style={styles.title}>Create Account</Text>
              <TextInput
                style={styles.textInput}
                textContentType="name"
                placeholder="Full Name."
                onChangeText={this.setName.bind(this)}
                value={this.state.name}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Email or Username."
                textContentType="emailAddress"
                onChangeText={this.setEmail.bind(this)}
                value={this.state.email}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password."
                textContentType="newPassword"
                onChangeText={this.setPassword.bind(this)}
                value={this.state.password}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Confirm Password."
                textContentType="password"
                onChangeText={this.setPassword2.bind(this)}
                value={this.state.password2}
              />
              <Text>
                {this.state.password !== this.state.password2 &&
                  "Passwords do not matches."}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={this.submitSignup.bind(this)}
              >
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => this.props.navigation.navigate("login")}
                >
                  <Text>Login to Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(245,245,245)",
    minWidth: "100%",
  },
  view: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
    backgroundColor: "white",
  },
  app: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgb(0,150,255)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "black",
    margin: 5,
    width: "100%",
    maxWidth: "85%",
    minWidth: "85%",
    padding: 5,
    borderRadius: 3,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    maxWidth: "85%",
    minWidth: "85%",
    width: "100%",
  },
  button: {
    margin: 10,
    backgroundColor: "rgb(0,150,255)",
    color: "white",
    minWidth: "85%",
    maxWidth: "85%",
    width: "100%",
    borderRadius: 3,
  },
  button2: {
    backgroundColor: "rgb(225,225,225)",
    padding: 10,
    borderRadius: 3,
    borderColor: "transparent",
    borderWidth: 1,
  },
  buttonText: {
    minWidth: "85%",
    padding: 10,
    color: "white",
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  loggedin: state.auth.loggedin,
  loading: state.auth.loading,
  signedup: state.auth.signedup,
});

export default connect(mapStateToProps, {signup})(Signup);
