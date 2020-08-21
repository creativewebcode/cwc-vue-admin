import Vue from "vue";

var MockAdapter = require("axios-mock-adapter");

// mock testing user accounts
const users = [
  {
    email: "admin@creativewebcode.com",
    password: "admin",
    token: "cwc-tsjcfdait"
  },
  {
    email: "admin2@creativewebcode.com",
    password: "admin",
    token: "cwc-tsjcfdait"
  }
];

const MockService = {
  init() {
    // this sets the mock adapter on the default instance
    var mock = new MockAdapter(Vue.axios);

    // mock login request
    mock.onPost("/login").reply(data => {
      const credential = JSON.parse(data.data);
      const found = users.find(user => {
        return (
          credential.email === user.email &&
          credential.password === user.password
        );
      });
      if (found) {
        return [200, found];
      }
      return [404, { errors: ["The login detail is incorrect"] }];
    });

    // mock forgot password request
    mock.onPost("/forgotPassword").reply(data => {
      const credential = JSON.parse(data.data);
      const found = users.find(user => {
        return credential.email === user.email;
      });
      if (found) {
        return [200, found];
      }
      return [404, { errors: ["The login email is incorrect"] }];
    });

    // mock to verify authentication
    mock.onGet(/\/verify\/?/).reply(data => {
      const token = data.headers.Authorization.replace("Token ", "");
      if (token !== "undefined") {
        const found = users.find(user => {
          return token === user.token;
        });
        return [200, found];
      }
      return [401, { errors: ["Invalid authentication"] }];
    });

    // mock to verify authentication
    mock.onGet("/activities").reply(data => {
      if (data !== "undefined") {
        const found = null;
        return [200, found];
      }
      return [401, { errors: ["No activitie[s] found"] }];
    });
  }
};

export default MockService;
