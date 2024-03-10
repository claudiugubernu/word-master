export type currentGameProps = {
  id: string;
  question: string;
  answer: string;
};

export type GameProps = {
  id: number;
  game: currentGameProps[];
};

export type GamePropsArray = {
  data: GameProps[];
};
