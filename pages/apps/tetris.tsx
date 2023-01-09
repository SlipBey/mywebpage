import { TetrisGame } from "@components/Apps/Tetris";
import { Layout } from "@components/Layout";
import type { NextPage } from "next";

const TetrisPage: NextPage = () => {
	return (
		<Layout title="Tetris">
			<TetrisGame />
		</Layout>
	);
};

export default TetrisPage;
