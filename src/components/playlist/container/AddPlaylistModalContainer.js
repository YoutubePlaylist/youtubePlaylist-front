import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylist } from "../../../lib/api/playlist";
import { getPlaylist } from "../../../modules/playlist";
import AddPlaylistModal from "../view/AddPlaylistModal";

function AddPlaylistModalContainer({ visible, cancel }) {
   const [name, setName] = useState("");
   const [errMsg, setErrMsg] = useState("");
   const uniqueId = useSelector(({ uniqueId }) => uniqueId);
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
      if (name.length > 20) {
         setErrMsg("최대 20자까지 가능합니다.");
         return;
      }
      callAddPlaylist(name);
   };

   const callAddPlaylist = async (name) => {
      await addPlaylist({
         loginId: uniqueId.id,
         title: name,
         isPublic: false,
         category: "OTHER",
      });
      dispatch(getPlaylist(uniqueId.id));
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

export default React.memo(AddPlaylistModalContainer);
