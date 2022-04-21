import { MainLayout } from "../components";
import { HomeContent } from "../components";
import { NextPage } from "next";
import { store } from "../store";

const Home: NextPage = () => {
  return (
    <>
      <MainLayout>
        <HomeContent store={store}></HomeContent>
      </MainLayout>
    </>
  );
};

export default Home;
