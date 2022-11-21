import { useEffect } from "react";
import { useAppContext } from "../../AppProvider";

import { db, storage } from "../../firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  UploadTask,
  uploadBytes,
} from "firebase/storage";
import { DataValueType, FileItemList, FileItemType } from "../types";

export function useFireBase() {
  const {
    state: { doEffect, currTask },
    dispatch,
  } = useAppContext();

  useEffect(() => {
    switch (doEffect?.type) {
      /* Автоматически подтягивает данные из бд */
      case "!loadFireBase": {
        const q = query(collection(db, "todo"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const todoList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            value: doc.data() as DataValueType,
          }));

          dispatch({ type: "loadedTaskList", payload: todoList });
        });
      }

      case "!loadFile": {
        const prevFileList = currTask?.value?.fileList as FileItemList;
        let fileList: FileItemList = currTask ? [...prevFileList] : [];

        const data = doEffect.type === "!loadFile" ? doEffect.data : null;
        if (data) {
          const newFileList = Object.values(data);

          try {
            const result = Promise.all<Promise<FileItemType>[]>(
              newFileList.map((fileItem) => {
                return new Promise((resolve, reject) => {
                  const storageRef = ref(storage, `files/${fileItem.name}`);
                  const uploadTask = uploadBytesResumable(storageRef, fileItem);

                  uploadBytes(storageRef, fileItem).then((snapshot) => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                      (downloadURL) => {
                        resolve({
                          link: downloadURL,
                          name: fileItem.name,
                          type: fileItem.type,
                        });
                      }
                    );
                  });
                });
              })
            );

            result.then(
              (res: FileItemList) => {
                fileList.push(...res);

                dispatch({
                  type: "endedAddFile",
                  payload: fileList,
                });
              },
              (err) => {
                console.log(err);
              }
            );
          } catch (err) {
            console.log(err);
          }
        }
        break;
      }

      case "!saveTask": {
        try {
          addDoc(collection(db, "todo"), doEffect.data);
        } catch (err) {
          console.log(err);
        }

        dispatch({ type: "endedSaveTask" });
        break;
      }

      case "!updateTask": {
        const data = doEffect.data;
        const currId = currTask?.id as string;
        const taskDocRef = doc(db, "todo", currId);
        try {
          updateDoc(taskDocRef, data);
        } catch (err) {
          alert(err);
        }
        dispatch({ type: "endedUpdateTask" });
        break;
      }

      default: {
        break;
      }
    }
  }, [doEffect]);
}
