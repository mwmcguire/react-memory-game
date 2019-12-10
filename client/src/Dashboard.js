import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Board from './components/Board';
import initializeDeck from './deck';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px',
    padding: theme.spacing(3, 2)
  }
}));

export default function Dashboard() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [dimension, setDimension] = useState(400);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    resizeBoard();
    setCards(initializeDeck());
  }, []);

  useEffect(() => {
    preloadImages();
  }, cards);

  useEffect(() => {
    const resizeListener = window.addEventListener('resize', resizeBoard);

    return () => window.removeEventListener('resize', resizeListener);
  });

  const handleClick = id => {
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      if (sameCardClicked(id)) return;
      setFlipped([flipped[0], id]);
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        resetCards();
      } else {
        setTimeout(resetCards, 2000);
      }
    }
    setFlipped([...flipped, id]);
  };

  const preloadImages = () => {
    cards.map(card => {
      const src = `/img/${card.type}.png`;
      console.log(src);
      new Image().src = src;
    });
  };

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  };

  const sameCardClicked = id => flipped.includes(id);

  const isMatch = id => {
    const clickedCard = cards.find(card => card.id === id);
    const flippedCard = cards.find(card => flipped[0] === card.id);
    return flippedCard.type === clickedCard.type;
  };

  const resizeBoard = () => {
    setDimension(
      Math.min(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      )
    );
  };

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant='h4' component='h4'>
          React Memory Game
        </Typography>
        <Typography variant='h5' component='h5'>
          Take turns picking two matching cards
        </Typography>
        <Board
          dimension={dimension}
          cards={cards}
          flipped={flipped}
          handleClick={handleClick}
          disabled={disabled}
          solved={solved}
        />
      </Paper>
    </div>
  );
}
