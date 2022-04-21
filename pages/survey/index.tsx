import { Space } from "antd";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { MainLayout } from "../../components";
import { SurveyContent } from "../../components/SurveyContent/index";
import { store } from "../../store";

export default function SurveyPage() {
  return (
    <>
      <MainLayout>
        <div style={{paddingTop:'110px', width:'100%'}}>
          <SurveyContent store={store}></SurveyContent>
        </div>
      </MainLayout>
    </>
  );
}
