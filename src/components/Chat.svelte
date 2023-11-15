<script>
  import { onDestroy, onMount, tick } from "svelte";
  import { logoutStore } from "../stores";

  // socket yhteys luodaan myöhemmin
  let socket = null;
  // tässä on chatin osallistujat
  let participants = [];
  // tässä on chatin viestit
  let messages = [];
  // tämä on uusi viesti, jonka käyttäjä kirjoittaa tekstikenttään
  let newMessage = "";
  // tätä käytetään uudelleen kirjautumiseen, jos serveri on sammunut, ja socket-yhteys on katkennus
  // yritetään 2 sekunnin välein kirjautua uudelleen, kunnes se onnistuu
  let interval = null;

  function connect() {
      // luodaan socket-objekti eli yhteys palvelimen kanssa
     socket = new WebSocket("wss://juhaniguru-webapischat.onrender.com/ws");
      
     // tämä callback suoritetaan silloin, kun yhteys saadaan
      socket.onopen = () => {
          if (socket.readyState == 1) {
              // tässä client lähettää severille viestin, että on liitytty keskusteluun
              // serveri sitten lähettää tämän viestin kaikille osallistujille
              // esim. juhani liittyi keskusteluun
              socket.send(
                  JSON.stringify({
                      Tag: "join",
                      Username: "",
                      // tässä lähetetään token serverille, jotta voidaan varmistua, että käyttäjä on kirjautunut sisään
                      Message: localStorage.getItem("accessToken"),
                  })
              );
          }
      };

      // jos tapahtuu virhe, tullaan tänne
      socket.onerror = (e) => {
          console.log("socket error", e);
      };

      // kun yhteys sulkeutuu, tullaan tänne
      socket.onclose = (e) => {
          console.log("bye bye");
      };

      // serveriltä tulee viesti, niin tullaan tänne
      socket.onmessage = (m) => {
          let message = JSON.parse(m.data);
          console.log(message)
          // viesteissä on Tag: update_participants tarkoittaa,
          // että osallistujalista on muuttunut ja serveri pyytää jokaista clientiä päivittämään omansa
          // lista päivittyy, jos käyttäjät liittyvät tai poistuvat keskusteluista
          if (message.Tag == "update_participants") {
              
              let p = new Set(message.Participants);

              participants = Array.from(p).slice();
          } else {
              // jos Tag on chatmessage, se tarkoittaa, että käyttäjä on kirjoittanut viestikenttään viestin ja
              // painaa lähetä
              if (message.Tag == "chatmessage") {
                  message.Message = `${message.Username}: ${message.Message}`;
              }
              // lisätään uusi visti messages-listaan
              // jotta svelte ymmärtää päivittää sivun, pitää sijoittaa uusi lista
              // siis push, pop, yms. eivät svelten kanssa toimi, koska näissä referenssi pysyy samana
              // = sijoitus tekee uuden kopion ja svelte ymmärtää päivittää listan
              messages = [...messages, message];
          }
      };
  }
  // onmount on svelten lifecycle-metodi ja se ajetaan ensimmäisenä
  onMount(async () => {
      // tick() varmistaa sen, että conect()-funktiota ei kutsuta ennen kuin chat-komponentti on kokonaan näytöllä
      await tick();
      connect();
  });

  // onDestroy on myös Svelten lifecycle-metodi, joka ajetaan silloin, kun sivu vaihtuu,eli tämä komponentti tuhotaan
  onDestroy(() => {
          socket = null;
  });
  // _send on uuden viestin lähetys
  // e.preventDefault() varmistaa, että formia ei lähetetä oikeasti
  // tarkistetaan, että viesti ei ole tyhjä
  // lähetetään uusi websocket-viesti palvelimelle
  // jotta palvelin voi lähettää sen kaikille osallistujille
  function _send(e) {
      e.preventDefault();
      if (newMessage.trim() == "") {
          return;
      }

      socket.send(
          JSON.stringify({ Tag: "chatmessage", Message: newMessage })
      );
      // tyhjennetään tekstikenttä
      newMessage = "";
  }
  // tässä on subscribattu logoutStore, eli silloin, kun käyttäjä painaa Ulos-nappia
  // tässä komponentissa lähetetään websocket-viesti tagilla leave, joka käytännössä sulkee asiakkaan websocket-yhteyden ja poistaa käyttäjän
  // osallistujista
  logoutStore.subscribe((v) => {
      if (socket != null && v) {
          socket.send(JSON.stringify({ Tag: "leave" }));
          // sen jälkeen laitetaan logoutstore taas falseksi, jotta se vaihtuu taas trueksi, kun seuraavan kerran painetaan Ulos-nappia
          //logoutStore.set(false);
      }
  });
</script>

<!-- ennen kuin sivulta poistustaan, lähetetään sama leave (jos esim. selain suljetaan kirjautumatta ulso) -->
<svelte:window
  on:beforeunload|preventDefault={() => {
      socket.send(JSON.stringify({ Tag: "leave" }));
  }}
/>
<div class="main-container">
<div class="chat">
<div class="chat-box">
  <h2>Messages</h2>
  {#each messages as message}
      <div class="message">{message.Message}</div>
  {/each}
</div>
<div class="participants">
  <h2>Participants</h2>
  {#each participants as p}
      <div>{p}</div>
  {/each}    
</div>
</div>
<div>
  <form on:submit={_send}>
      <input
          bind:value={newMessage}
          type="text"
          placeholder="Message"
      />
      <button type="submit">Send</button>
  </form>
</div>
</div>


<style>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .chat {
    background-color: #f1f1f1;
    height: auto;
    width: 80%;
    padding: 10%;
  }

  .chat-box {
    max-height: 600px;
    max-width: 800px;
    width: 80%;
    padding: 20px;
    border: 2px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    overflow-y: auto;
    margin-bottom: 20px;
    font-size: 18px;
  }

  .message {
    margin-bottom: 10px;
  }

  .participants {
    max-width: 800px;
    width: 80%;
    padding: 20px;
    border: 2px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    overflow-y: auto;
    margin-bottom: 20px;
    font-size: 18px;
  }

  form {
    display: flex;
    margin-top: 20px;
  }

  input {
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
</style>