// import React, { Component } from 'react'

// export default class Typerpage extends Component{
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return <p> А тут ви маєте тицяти кнопочьки</p>
//     }
// }

import React,{Component} from 'react';
import ReactDOM from "react-dom";

class App extends React.Component {
	state = {
		text: '',
		inputValue: '',
		lastLetter: '',
		words: [],
		completedWords: [],
		completed: false,
		startTime: undefined,
		timeElapsed: 0,
		wpm: 0,
		started: false,
		progress: 0
	};

	setText = () => {
		const texts = [
			// `Народе мій, замучений, розбитий, мов паралітик той на роздорожжу, людським презирством, ніби струпом, вкритий! Твоїм будущим душу я тривожу, від сорому, який нащадків пізних Палитиме, заснути я не можу.`,
			// `Українська мова вважається наймилозвучнішою у світі. Вона дивує й захоплює багатством словника, безмежністю форм, плинністю. Цією мовою були написані неперевершені твори Шевченка, Франка, Лесі Українки, Коцюбинського.`,
			// `Просто рандомний текст, який я набрав для того, щоб прямо зараз тестувати функцію набору, правильності введення, та й взагалі - поставте 5.`,
            'даже для этом так уже был все этом сказала когда ней ни ней него но если он вот я еще а были чем то.'
		];
		const text = texts[Math.floor(Math.random() * texts.length)];
		const words = text.split(' ');

		this.setState({
			text,
			words,
			completedWords: []
		});
	};

	startGame = () => {
		this.setText();

		this.setState({
			started: true,
			startTime: Date.now(),
			completed: false,
			progress: 0
		});
	};

	handleChange = e => {
		const { words, completedWords } = this.state;
		const inputValue = e.target.value;
		const lastLetter = inputValue[inputValue.length - 1];

		const currentWord = words[0];

		// перевіряє на пробіл і крапочЬку
		if (lastLetter === ' ' || lastLetter === '.') {

			// дивиться, чи є збіги між словами
			if (inputValue.trim() === currentWord) {
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
					inputValue: '',
					completed: newWords.length === 0,
					progress
				});
			}
		} else {
			this.setState({
				inputValue,
				lastLetter
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
		const wpm = Math.ceil(1.4*wordsTyped / diff);

		this.setState({
			wpm,
			timeElapsed: diff
		});
	};

	render() {
		const {
			text,
			inputValue,
			completedWords,
			wpm,
			timeElapsed,
			started,
			completed,
			progress
		} = this.state;

		if (!started)
			return (
				<div className='container'>
					<h2>Вітаємо вас в набиранні!</h2>
					<p>
						<strong>Правила:</strong> <br />
						Переписуйте слова, які зазначені вище. <br />
						Правильно введені слова стануть <span className='green'>зеленими</span>.
						<br />
						Неправильно введені слова стануть <span className='red'>червоними</span>.
						<br />
						<br />
						Вдалої гри, котики! *мур*
					</p>
					<button className='start-btn' onClick={this.startGame}>
						Почати!
					</button>
				</div>
			);

		if (!text) return <p>Завантаження...</p>;

		if (completed) {
			return (
				<div className='container'>
					<h2>
						Ваша кількість зн/хв: <strong>{wpm}</strong>
					</h2>
					<button className='start-btn' onClick={this.startGame}>
						Зіграти знову!
					</button>
				</div>
			);
		}

		return (
			<div>
				<div className='wpm'>
					<strong>Зн/хв: </strong>
					{wpm}
					<br />
					<strong>Час: </strong>
					{Math.floor(timeElapsed * 60)} секунд
				</div>
				<div className='container'>
					<h4>Наберіть текст нижче</h4>
					<progress value={progress} max='100'></progress>
					<p className='text'>
						{text.split(' ').map((word, w_idx) => {
							let highlight = false;
							let currentWord = false;

							// це каже, що слова набрати вірно -- стають зеленими
							if (completedWords.length > w_idx) {
								highlight = true;
							}

							if (completedWords.length === w_idx) {
								currentWord = true;
							}

							return (
								<span
									className={`word 
                                ${highlight && 'green'} 
                                ${currentWord && 'underline'}`}
									key={w_idx}>
									{word.split('').map((letter, l_idx) => {
										const isCurrentWord = w_idx === completedWords.length;
										const isWronglyTyped = letter !== inputValue[l_idx];
										const shouldBeHighlighted = l_idx < inputValue.length;

										return (
											<span
												className={`letter ${
													isCurrentWord && shouldBeHighlighted
														? isWronglyTyped
															? 'red'
															: 'green'
														: ''
												}`}
												key={l_idx}>
												{letter}
											</span>
										);
									})}
								</span>
							);
						})}
					</p>
					<input
						type='text'
						onChange={this.handleChange}
						value={inputValue}
						autofocus={started ? 'true' : 'false'}
					/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));


// SOCIAL PANEL JS
export default App;