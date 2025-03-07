// Mock the DOM for Jest
document.body.innerHTML = `
  <form id="loginForm">
    <input id="username" value="" />
    <input id="password" value="" />
    <button type="submit">Login</button>
  </form>
  <div id="message"></div>
`;

// Mock localStorage
const localStorageMock = {
  store: {},
  getItem: (key) => localStorageMock.store[key] || null,
  setItem: (key, value) => (localStorageMock.store[key] = value),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Test cases
describe("Login Security Tests", () => {
  beforeEach(() => {
    localStorageMock.store = { loginAttempts: "0" };
    document.getElementById("message").textContent = "";
  });

  test("Valid login", () => {
    document.getElementById("username").value = "admin";
    document.getElementById("password").value = "password123";
    document.getElementById("loginForm").dispatchEvent(new Event("submit"));
    expect(document.getElementById("message").textContent).toContain(
      "Logged in as admin"
    );
  });

  test("XSS injection", () => {
    document.getElementById("username").value = "<script>alert('xss')</script>";
    document.getElementById("password").value = "password123";
    document.getElementById("loginForm").dispatchEvent(new Event("submit"));
    expect(document.getElementById("message").textContent).not.toContain(
      "<script>"
    );
  });

  test("SQL injection attempt", () => {
    document.getElementById("username").value = "admin' OR 1=1 --";
    document.getElementById("password").value = "wrongpass";
    document.getElementById("loginForm").dispatchEvent(new Event("submit"));
    expect(document.getElementById("message").textContent).toBe(
      "Invalid input detected!"
    );
  });

  test("Brute-force lockout", () => {
    localStorage.setItem("loginAttempts", "5");
    document.getElementById("username").value = "admin";
    document.getElementById("password").value = "wrongpass";
    document.getElementById("loginForm").dispatchEvent(new Event("submit"));
    expect(document.getElementById("message").textContent).toBe(
      "Too many attempts. Please wait."
    );
  });
});
