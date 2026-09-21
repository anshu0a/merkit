import { Routes, Route } from "react-router-dom";

import Login from "../jsx/login/MainLogin";
import Register from "../jsx/register/MainRegister";
import Forgot from "../jsx/forgot/MainForgot";
import Merkit from "../jsx/merkit/MainMerkit";
import Profile from "../jsx/merkit/profile/MainProfile";
import NotFound from "../help/notFound";
// ---------explore
import Explore from "../jsx/merkit/explore/MainExplore";
import Calendar from "../jsx/merkit/explore/calender/MainCalendar";
import Map from "../jsx/merkit/explore/map/MainMap"
import Finder from "../jsx/merkit/explore/finder/MainFinder"
// ---------create
import Create from "../jsx/merkit/create/MainCreate"
import Article from "../jsx/merkit/create/Article";
import Capsule from "../jsx/merkit/create/capsule/Capsule";
import Prediction from "../jsx/merkit/create/prediction/Prediction";
// ---------create
import Home from "../jsx/merkit/home/MainHome";
import ArticleHome from "../jsx/merkit/home/article/ArticleHome";
import Tranding from "../jsx/merkit/home/tranding/mainTreanding";
import MainCapsule from "../jsx/merkit/home/prediction/MainCapsule";
import MainWorks from "../jsx/merkit/works/MainWork";
import PostList from "../jsx/merkit/home/post/PostList"
// ---------create
import Bot from "../jsx/merkit/chat/Chat"
import Start from "./Start";

function Ok() {
  return (<>
    <div>hello to home page</div>
    <ol>
      <li><a href="/login">login</a></li>
      <li><a href="/register">register</a></li>
      <li><a href="/merkit/home">home</a></li>
      <li><a href="/forgot">Forgot</a></li>
    </ol>
  </>)
}

function Junction() {
  return (
    <Routes>
      <Route path="/" element={<Start/> } />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/merkit" element={<Merkit />}>
      <Route path="works" element={<MainWorks />} />
        <Route path="bot/:chatid" element={<Bot />} />

        <Route path="home" element={<Home />}>
          <Route index element={<ArticleHome />} />
          <Route path="tranding" element={<Tranding />} />
          <Route path="capsules" element={<MainCapsule />} />
          <Route path="posts" element={<PostList />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="create" element={<Create />}>
          <Route index element={<Article />} />
          <Route path="capsule" element={<Capsule />} />
          <Route path="prediction" element={<Prediction />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="explore" element={<Explore />}>
          <Route index element={<Finder />} />
          <Route path="timeline" element={<Calendar />} />
          <Route path="map" element={<Map />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Junction;