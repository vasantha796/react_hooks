import {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  useReducer,
  useMemo,
  useCallback,
} from "react";

const ThemeContext = createContext("Light");

type User = {
  id: number;
  name: string;
};

type Action =
  | { type: "Add"; payload: User }
  | { type: "Delete"; payload: number };

function reducer(state: User[], action: Action): User[] {
  switch (action.type) {
    case "Add":
      return [...state, action.payload];

    case "Delete":
      return state.filter((user) => user.id !== action.payload);

    default:
      return state;
  }
}

function UserManagement() {
  const theme = useContext(ThemeContext);

  const [name, setName] = useState("");

  const [users, dispatch] = useReducer(reducer, [] as User[]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("Component Mounted");

    return () => {
      console.log("Component Unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("Users Updated", users);
  }, [users]);

  const totalUsers = useMemo(() => {
    console.log("Total Users...");
    return users.length;
  }, [users]);

  const addUser = useCallback(() => {
    if (name.trim() === "") return;

    dispatch({
      type: "Add",
      payload: {
        id: Date.now(),
        name,
      },
    });

    setName("");

    inputRef.current?.focus();
  }, [name, dispatch]);

  return (
    <div
      style={{
        backgroundColor: theme === "Dark" ? "#1e1e1e" : "#f5f5f5",
        color: theme === "Dark" ? "white" : "black",
        minHeight: "100vh",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "420px",
          background: theme === "Dark" ? "#2d2d2d" : "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 0 12px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>User Management</h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "16px",
            }}
          />

          <button
            onClick={addUser}
            style={{
              padding: "10px 15px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        <hr />

        <h3>Total Users : {totalUsers}</h3>

        {users.length === 0 ? (
          <p>No Users Added</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid gray",
                borderRadius: "8px",
              }}
            >
              <span>{user.name}</span>

              <button
                onClick={() =>
                  dispatch({
                    type: "Delete",
                    payload: user.id,
                  })
                }
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState("Light");

  return (
    <ThemeContext.Provider value={theme}>
      <button
        onClick={() =>
          setTheme(theme === "Light" ? "Dark" : "Light")
        }
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 18px",
          cursor: "pointer",
        }}
      >
        Change Theme
      </button>

      <UserManagement />
    </ThemeContext.Provider>
  );
}

export default App;