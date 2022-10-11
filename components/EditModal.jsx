import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import BasicDatePicker from "./DatePicker";
import styles from "../styles/EditModal.module.css";

const EditModal = ({ selectedData, closeModalFn }) => {
  // DatePicker props를 통해 전달하고 받는다
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { register, setValue, getValues, handleSubmit } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    // 전달받은 값들을 리액트훅에 세팅하기
    setValue("name", selectedData.selectedFranchisee.name);
    setValue("category", selectedData.selectedFranchisee.category);
    setValue("scale", selectedData.selectedFranchisee.scale);
    setValue("fee", selectedData.selectedFranchisee.fee);

    // 전달받은 값을 선택된date 스테이트에 세팅하기
    setSelectedDate(() => selectedData.selectedFranchisee.registDate);
  }, [selectedData, setValue]);

  const update = async () => {
    console.log("update 함수 호출!");

    const id = selectedData.selectedFranchisee.id;
    const name = getValues("name");
    const category = getValues("category");
    const registDate = selectedDate;
    const scale = getValues("scale");
    const fee = getValues("fee");

    const response = await (
      await fetch(`/api/franchisees`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { id, name, category, registDate, scale, fee },
        }),
      })
    ).json();
    console.log(response);
    alert("정상적으로 수정되었습니다.");
  };



  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 600,
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={selectedData.isModalOpen}
        onClose={closeModalFn}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className={styles.h2}
          >
            가맹점 수정
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="span"
          >
            <form className={styles.form} onSubmit={handleSubmit(update)}>
              <label className={styles.label}>가맹점명</label>
              <input className={styles.input} {...register("name")} />
              <label className={styles.label}>업종</label>
              <input className={styles.input} {...register("category")} />
              <label className={`${styles.label} ${styles.label3}`}>
                등록일자
              </label>
              <BasicDatePicker
                className={styles.date}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <label className={styles.label}>사업규모</label>
              <select {...register("scale")} className={styles.select}>
                <option value="small">영세</option>
                <option value="medium1">중소1</option>
                <option value="medium2">중소2</option>
                <option value="medium3">중소3</option>
                <option value="self">일반</option>
              </select>{" "}
              <br />
              <label className={styles.label}>수수료율</label>
              <input className={styles.input} {...register("fee")} />
              <div className={styles.btnBox}>
                <button className={styles.button}>수정하기</button>
                <button onClick={closeModalFn} className={styles.button}>
                  닫기
                </button>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export default EditModal;
