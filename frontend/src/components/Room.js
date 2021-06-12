import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { GlobalHotKeys } from "react-hotkeys";
import { Link } from "react-router-dom";

const INTERVAL = 100;

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      inputValue: "",
      lastLetter: "",
      words: [],
      completedWords: [],
      completed: false,
      startTime: undefined,
      timeElapsed: 0,
      wpm: 0,
      started: false,
      progress: 0,
      mistakes: 0,
      nickname: "",
      text: "test",
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      nickname: "test",
      showSettings: false
    };
    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails();
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this)
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      this.props.leaveButtonPressed();
      this.props.history.push("/create");
      this.updateShowSetting = this.updateShowSetting.bind(this)
    });
  }

  getRoomDetails() {
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok){
          this.props.leaveRoomCallback();
          this.props.history.push("/create");
        }
        return response.json()})
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
          nickname: data.nick,
          text: data.text,
        });
      });
  }

  updateShowSetting(value) {
    this.setState({
      showSettings: value,
    })
  }
  setText = () => {
    const texts = this.state.text;
    // const texts = [
    //   `Народе мій, замучений, розбитий, мов паралітик той на роздорожжу, людським презирством, ніби струпом, вкритий! Твоїм будущим душу я тривожу, від сорому, який нащадків пізних Палитиме, заснути я не можу.`,
    //   `Українська мова вважається наймилозвучнішою у світі. Вона дивує й захоплює багатством словника, безмежністю форм, плинністю. Цією мовою були написані неперевершені твори Шевченка, Франка, Лесі Українки, Коцюбинського.`,
    //   `Просто рандомний текст, який я набрав для того, щоб прямо зараз тестувати функцію набору, правильності введення, та й взагалі - поставте 5.`,
    //   "даже для этом так уже был все этом сказала когда ней ни ней него но если он вот я еще а были чем то.",
    //   "Відлік десятилітньої історії Вишиванкового фестивалю розпочався саме тоді, коли сімдесят девять людей, убраних у вишиванки, утворили вздовж Потьомкінських сходів так званий «живий ланцюг».",
    //   "Поля починаються за Мокрою Долиною і тягнуться на північ аж до Берищанського лісу. Майже посередині їх перерізує широкий і розлогий яр, по дну якого колись текла річечка, котра з роками всохлася до струмка.",
    //   "Так, ми справді не знаємо достоту ані дум наших пращурів, ані їхнього способу існування; ми не знаємо того, як вони силою свого розуму та душі створювали поеми й епоси, витворювали релігію і політику: ми не чітко уявляємо собі розвиток нашого народу: як він змінювався, розростався вшир, пристосовувався до нових умов...",
    // ];
    //const text = texts[Math.floor(Math.random() * texts.length)];
    const text = texts;
    const words = text.split("");
    console.log(words);

    this.setState({
      text,
      words,
      completedWords: [],
    });
  };

  startGame = () => {
    this.setText();

    this.setState({
      wpm: 0,
      mistakes: 0,
      started: true,
      startTime: Date.now(),
      timeElapsed: 0,
      completed: false,
      progress: 0,
    });
  };
  snd = new Audio(
    "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
  );
  beep = () => {
    this.snd.play();
  };
  handleChange = (e) => {
    const { words, completedWords } = this.state;
    const inputValue = e.target.value;
    const lastLetter = inputValue[inputValue.length - 1];

    const currentWord = words[0];
    console.log(currentWord);
    // перевіряє на пробіл і крапочЬку
    if (inputValue === currentWord) {
      // дивиться, чи є збіги між словами
      if (lastLetter === " " || lastLetter === ".") {
        // видаляє слово з масиву
        // чистить текстбокс
        const newWords = [...words.slice(1)];
        const newCompletedWords = [...completedWords, currentWord];

        // Рахує загальний прогрес
        const progress =
          (newCompletedWords.length /
            (newWords.length + newCompletedWords.length)) *
          100;
        this.setState({
          words: newWords,
          completedWords: newCompletedWords,
          inputValue: "",
          completed: newWords.length === 0,
          progress,
        });
      } else {
        const newWords = [...words.slice(1)];
        const newCompletedWords = [...completedWords, currentWord];
        // Рахує загальний прогрес
        const progress =
          (newCompletedWords.length /
            (newWords.length + newCompletedWords.length)) *
          100;
        this.setState({
          words: newWords,
          completedWords: newCompletedWords,
          completed: newWords.length === 0,
          inputValue: "",
          progress,
        });
      }
    } else {
      this.beep();
      this.setState({
        mistakes: this.state.mistakes + 1,
        inputValue,
        lastLetter,
      });
    }

    this.calculateWPM();
  };

  calculateWPM = () => {
    const { startTime, completedWords } = this.state;
    const now = Date.now();
    const diff = (now - startTime) / 1000 / 60; // 1000 ms / 60 s

    // чєліки, в середньому рахують за кожне слово -- 5 символів
    // і тому ми беремо всі слова й ділимо на п'єть
    // слово "ти" та "синхрофазотрон" -- не однакові. (вродь)
    const wordsTyped = Math.ceil(
      completedWords.reduce((acc, word) => (acc += word.length), 0)
    );

    // рахує КСЛ
    const wpm = Math.ceil(wordsTyped / diff);

    this.setState({
      wpm,
      timeElapsed: diff,
    });
  };

  render() {
    const keyMap = {
      SNAP_LEFT: ["ctrl+enter"],
    };
    const starting = {
      SNAP_LEFT: this.startGame,
    };

    const recreating = {
      SNAP_LEFT: this.leaveButtonPressed,
    }
    const {
      text,
      inputValue,
      completedWords,
      wpm,
      timeElapsed = Clockers(),
      started,
      completed,
      progress,
      mistakes,
    } = this.state;

    if (!started)
      return (
        <div className="container">
          {console.log(Math.round(timeElapsed / INTERVAL))}
          <h2>Вітаємо вас в набиранні!</h2>
          <p>
            <strong>Правила:</strong> <br />
            Переписуйте слова, які зазначені вище. <br />
            <br />
            <br />
            Вдалої гри, котики! *мур*
          </p>
          <GlobalHotKeys keyMap={keyMap} handlers={starting} />
          <Button color="primary" variant="contained" onClick={this.startGame}>
            Почати!
          </Button>
        </div>
      );

    if (!text) return <p>Завантаження...</p>;

    if (completed) {
      return (
        <div>
          <div className="container">
            <strong>Щоб не лізти за мишкою: Ctrl + Enter</strong>
          </div>
          <div className="container">
            <GlobalHotKeys keyMap={keyMap} handlers={recreating} />
            <h2>
              Ваша кількість зн/хв: <h5>{wpm}</h5>
            </h2>
            <h2>
              Помилки: <h5>{mistakes}</h5>
            </h2>
            <Button color="secondary" 
            onClick={this.leaveButtonPressed}>
              Зіграти знову!
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="wpm">
          <strong> Час: </strong>
          {Math.floor(timeElapsed * 60)} секунд{"  "}
          <strong>Зн/хв: </strong>
          {wpm} {"  "}
          <strong>Помилки: </strong>
          {mistakes}
        </div>
        <div className="container">
          <h4>Наберіть текст нижче</h4>
          <progress value={progress} max="100"></progress>
          <p className="text">
            {text.split("").map((word, w_idx) => {
              let highlight = false;
              let currentWord = false;

              // це каже, що слова набрати вірно -- стають зеленими
              if (completedWords.length > w_idx) {
                highlight = true;
              } else {
                highlight = false;
              }

              if (completedWords.length === w_idx) {
                currentWord = true;
              }
              return (
                <span
                  className={`word ${highlight && "green"} ${
                    currentWord && "underline"
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </p>
          {/* <TextField
		  	id="outlined-basic"
			label="тиць сюди" 
			variant="outlined"
            type="text"
            onChange={this.handleChange}
            value={inputValue}
            autoFocus={started ? "true" : "false"}
          /> */}
          <input
            id="outlined-basic"
            label="тиць сюди"
            variant="outlined"
            type="text"
            onChange={this.handleChange}
            value={inputValue}
            autoFocus={started ? "true" : "false"}
          />
        </div>
      </div>
    );
  }
}
