import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import BasicDatePicker from "./DatePicker";
import styles from "../styles/AddModal.module.css";

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

const AddModal = () => {
  // DatePicker props를 통해 전달하고 받는다
  const [selectedDate, setSelectedDate] = useState(new Date());

  //data-post
  const postFranchisee = async (data) => {
    console.log("data", data);
    const response = await (
      await fetch("/api/franchisees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          registDate: selectedDate,
          //...data -> spead함수로 내가 가지고 있는 데이터를 다 풀고 가져온 selectedDate와 더해준다
        }),
      })
    ).json();
    console.log("response", response);
  };

  //react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // 'open'의 값이 없었기 때문에 오류가 났었다 useState(false) <- 꼭 입력!
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitHandler = (data) => {
    alert("정상적으로 등록되었습니다");
    postFranchisee(data);
    console.log(postFranchisee);
  };

  // 사업규모 변경 이벤트
  const scaleChangeHandler = (e) => {
    // console.log("사업규모 변경 이벤트", e);
    const currentScale = e.target.value;
    // console.log("currentScale", currentScale);
    switch (currentScale) {
      case "small": {
        setValue("fee", 0.5);
        break;
      }
      case "medium1": {
        setValue("fee", 1.1);
        break;
      }
      case "medium2": {
        setValue("fee", 1.25);
        break;
      }
      case "medium3": {
        setValue("fee", 1.5);
        break;
      }
      case "self": {
        setValue("fee", 2.0);
        break;
      }
      default:
        "";
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        className={styles.openBtn}
      >
        가맹점 추가
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
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
            가맹점 등록
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="span"
          >
            <form
              onSubmit={handleSubmit(submitHandler)}
              className={styles.form}
            >
              <label className={styles.label}>가맹점명</label>
              <input
                className={styles.input}
                {...register("name", { required: "필수 입력값 입니다." })}
                placeholder="상호명을 입력해주세요."
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.name?.message}
              </Typography>
              {/* {errors.name && <p>{errors.name.message}</p>} */}
              <label className={styles.label}>업종</label>
              <input
                className={styles.input}
                {...register("category", { required: "필수 입력값 입니다." })}
                placeholder="업종을 입력해주세요."
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.category?.message}
              </Typography>
              {/* {errors.category && <p>{errors.category.message}</p>} */}
              <label className={`${styles.label} ${styles.label3}`}>
                등록일자
              </label>
              <BasicDatePicker
                className={styles.date}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <label className={styles.label}>사업규모</label>
              <select
                {...register("scale")}
                className={styles.select}
                onChange={scaleChangeHandler}
              >
                <option value="small">영세</option>
                <option value="medium1">중소1</option>
                <option value="medium2">중소2</option>
                <option value="medium3">중소3</option>
                <option value="self">일반</option>
              </select>{" "}
              <br />
              <label className={styles.label}>수수료율</label>
              <input
                className={styles.input}
                {...register("fee", {
                  required: "필수 입력값 입니다.",
                })}
                placeholder="%"
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.fee?.message}
              </Typography>
              {/* {errors.fee && <p>{errors.fee.message}</p>} */}
              <div className={styles.btnBox}>
                <button type="submit" className={styles.button}>
                  등록하기
                </button>
                <button onClick={handleClose} className={styles.button}>
                  닫기
                </button>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
      <style>
        {`
        .css-adfmws-MuiTypography-root {
          text-align: right;
          color: tomato;
          font-size: 14px;
        }
        .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root {
          margin: 30px 0 0 0;
        }
        .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root {
          margin: 30px 0 0 0;
        }
      `}
      </style>
    </>
  );
};

export default AddModal;
