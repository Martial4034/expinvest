import { GameSelection } from "./components/game-selection"

export default function Home() {
  return (
      <GameSelection activeIds={[1,2,3]} />
  );
}
