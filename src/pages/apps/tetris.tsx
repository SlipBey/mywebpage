import { TetrisGame } from "@/components/Apps/Tetris";
import { Layout } from "@/components/Layout";
import type { NextPage } from "next";

const TetrisPage: NextPage = () => {
  return (
    <Layout title="Tetris">
      <div className="py-10 px-5sm:px-10">
        <TetrisGame />
      </div>
    </Layout>
  );
};

export default TetrisPage;
