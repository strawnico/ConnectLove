import Head from "next/head";
import styles from "../styles/Home.module.css";
import { onSnapshot, query } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, app, messaging } from "../utils/firebase";
import Post from "../components/Post";

function subscribeMessages(setMessages, registration) {
  console.log("Subscribing..."); 
  const messagesCollection = collection(db, "messages");
  const q = query(messagesCollection);
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    console.log("Fetching update...");
    const mensagens = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      mensagens.push({ ...data, id: doc.id });
    });
    mensagens.sort(function (x, y) {
      return y.createdAt - x.createdAt;
    });
    setMessages(mensagens);
    if (!registration) return;
    if (Notification.permission == "granted") {
      registration.showNotification("Nova mensagem", {
        body: "Entre e veja sua nova mensagem de amor!",
      });
    }
  });
  return () => {
    console.log("Unsubscring...");
    unsubscribe();
  };
}

function requestPermission() {
  console.log("Request permission...");
  Notification.requestPermission().then((permission) => {
    if (permission == "granted") {
      console.log("Notification permission granted!");
    }
  });
}

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(
        function (registration) {
          console.log(
            "Service Worker registration successful with scope: ",
            registration.scope
          );
          setRegistration(registration);
          requestPermission();
        },
        function (err) {
          console.log("Service Worker registration failed: ", err);
        }
      );
    }
    return subscribeMessages(setMessages, registration);
  }, []);

  const addMessage = async () => {
    if (!input) return;
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        name: user.name,
        arroba: user.arroba,
        message: input,
        createdAt: Date.now(),
      });
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Head>
        <title>MyLove</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-full p-6 border-b">
        <h1 className="font-plus text-gray-900 font-semibold text-2xl">
          Connect <span className="text-red-500 font-bold font-plus">Love</span>
        </h1>
      </header>
      {user.name ? (
        <main className="flex justify-center w-full p-4">
          <div className="w-128 flex flex-col">
            <textarea
              className="w-full px-4 py-3 border-2 transition rounded-md bg-gray-100 border-gray-100 outline-none focus:border-red-500 focus:bg-white"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Envie uma mensagem de amor"
            />
            <button
              onClick={() => addMessage()}
              className="px-4 mt-2 bg-red-500 p-2 font-bold text-white font-plus rounded-md ml-auto transition hover:bg-red-600 active:scale-95"
            >
              Enviar
            </button>
            <h2 className="font-semibold text-gray-900 font-plus text-xl">
              Posts
            </h2>
            <div className="flex flex-col border-b mt-4">
              {messages.map((msg) => {
                return <Post key={msg.id} post={msg}></Post>;
              })}
            </div>
          </div>
        </main>
      ) : (
        <main className="flex justify-center w-full p-4">
          <div className="flex flex-col gap-4 w-128">
            <button
              onClick={() => setUser({ name: "João", arroba: "@joao_o_sol" })}
              className="border-2 border-gray-300 text-gray-700 w-full font-plus rounded-md font-medium flex justify-between items-center p-4 transition active:bg-red-50 hover:border-red-500"
            >
              João
              <span className="font-plus text-sm text-gray-400">Continuar</span>
            </button>
            <button
              onClick={() =>
                setUser({ name: "Nicole", arroba: "@nicole_a_lua" })
              }
              className="border-2 border-gray-300 text-gray-700 w-full font-plus rounded-md font-medium flex justify-between items-center p-4 transition active:bg-red-50 hover:border-red-500"
            >
              Nicole
              <span className="font-plus text-sm text-gray-400">Continuar</span>
            </button>
          </div>
        </main>
      )}

      <footer></footer>
    </div>
  );
}
