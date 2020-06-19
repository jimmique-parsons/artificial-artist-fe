import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams, withRouter } from "react-router-dom";
import { getUserVideos } from "../store/actions";
import Video from "./Video";
import style from "styled-components";

const VideoListContainer = style.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Container = style.div`
  margin: 0 auto;
  width: 60%;
  margin-bottom: 40px;
`;

const VideoContainer = style.div`
  width: 45%;
`;

const VideoTitle = style.h3`
  color: #FCFC0B;
  font-size: 24px;
`;

const SmallerVideo = style.div`
  background-color: #44E0F6;
  border: 10px solid #44E0F6;
  box-shadow: 10px 10px 0px 0px rgba(125,250,154,1), 10px 10px 23px 2px rgba(0,0,0,0.46);
`;

const Greeting = style.h1`
  color: #44E0F6;
  font-size: 40px;
`;

const UserPage = (props) => {
  const { username } = useParams();

  useEffect(() => {
    props.getUserVideos(localStorage.getItem("token"), username);
  }, [username]);

  let greeting;

  if (localStorage.getItem("username") === username) {
    greeting = `Welcome ${username}`;
    console.log("Welcome");
  } else {
    greeting = `${username} Videos`;
    console.log(username);
  }
  //this if statement will greet a user with a list of their videos, otherwise it will send a prompt to create a video

  return (
    <>
      <Container>
        <Greeting>{greeting}</Greeting>
        <VideoListContainer>
          {props.userVideos && props.userVideos ? (
            props.userVideos.map((video) => {
              return (
                <>
                  <VideoContainer>
                    <SmallerVideo key={video.id}>
                      <Link to={`/videos/${video.id}`}>
                        <Video video={video} />
                      </Link>
                    </SmallerVideo>
                    <VideoTitle>{video.video_title}</VideoTitle>
                  </VideoContainer>
                </>
              );
            })
          ) : (
            <p>
              Looks like you haven't created any videos yet, lets {""}
              <Link to="/create">create some videos!</Link>
            </p>
          )}
        </VideoListContainer>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  userVideos: state.userVideos,
  getUserVideosStart: state.getUserVideosStart,
  getUserVideosSuccess: state.getUserVideosSuccess,
  getUserVideosError: state.getUserVideosError,
});

export default connect(mapStateToProps, { getUserVideos })(
  withRouter(UserPage)
);
