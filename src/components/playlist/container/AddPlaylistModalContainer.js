import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylist } from "../../../modules/playlist";
import AddPlaylistModal from "../view/AddPlaylistModal";

function AddPlaylistModalContainer({ visible, cancel }) {
   const [name, setName] = useState("");
   const [errMsg, setErrMsg] = useState("");
   const playlist = useSelector(({ playlist }) => playlist);
   const dispatch = useDispatch();
   const onChange = (v) => {
      if (errMsg) {
         setErrMsg("");
      }
      setName(v);
   };
   const addPlaylistCallback = () => {
      if (!name) {
         setErrMsg("이름을 입력해주세요");
         return;
      }
      if (name[0] === " " || name[name.length - 1] === " ") {
         setErrMsg("처음과 마지막은 띄어쓰기가 될 수 없습니다.");
         return;
      }
      for (let i of playlist) {
         if (i.name === name) {
            setErrMsg("이미 있는 이름입니다.");
            return;
         }
      }
      dispatch(addPlaylist(name));
      setName("");
      setErrMsg("");
      cancel();
   };
   return (
      <AddPlaylistModal
         visible={visible}
         cancel={cancel}
         addPlaylist={addPlaylistCallback}
         errMsg={errMsg}
         name={name}
         onChange={onChange}
      />
   );
}

export default AddPlaylistModalContainer;