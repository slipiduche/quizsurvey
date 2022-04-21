import type { NextPage } from "next";
import { MainLayout } from "../components";

const Home: NextPage = () => {
  return (
    <>
      <MainLayout>
        <div style={{ paddingTop: "100px" }}>Home layout</div>
      </MainLayout>
    </>
  );
};

export default Home;
