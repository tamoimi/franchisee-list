import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import BasicDatePicker from "./DatePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddModal = () => {
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
          data,
        }),
      })
    ).json();
    console.log("response", response);
  };

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [open, setOpen] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitHandler = (data) => {
    alert("정상적으로 등록되었습니다");
    postFranchisee(data);
    console.log(postFranchisee);
  };
  return (
    <>
      <Button onClick={handleOpen}>가맹점 추가</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            가맹점 등록
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component="span">
            <form onSubmit={handleSubmit(submitHandler)}>
              <label>가맹점명</label>
              <input
                {...register("name", { required: "필수 입력값 입니다." })}
                placeholder="상호명을 입력해주세요."
              />
              {errors.name && <span>{errors.name.message}</span>}
              <br />
              <label>업종</label>
              <input
                {...register("category", { required: "필수 입력값 입니다." })}
                placeholder="업종을 입력해주세요."
              />
              {errors.category && <span>{errors.category.message}</span>}
              <br />
              <label>등록일자</label>
              <BasicDatePicker />
              <br />
              <label>사업규모</label>
              <select {...register("scale")}>
                <option value="small">영세</option>
                <option value="medium1">중소1</option>
                <option value="medium2">중소2</option>
                <option value="medium3">중소3</option>
                <option value="self">일반</option>
              </select>
              <br />
              <label>수수료율</label>
              <input
                {...register("fee", {
                  required: "필수 입력값 입니다.",
                  
                })}
              />
              {errors.fee && <span>{errors.fee.message}</span>}
              % <br />
              <button type="submit">등록하기</button>
            </form>
          </Typography>
        </Box>
      </Modal>
      <style jsx>{`
        .css-1wnsr1i {
          width: 500px;
          height: 550px;
          border: none;
          border-radius: 20px;
        }
        label {
          display: inline-block;
          width: 100px;
          height: 60px;
        }
        input {
          width: 300px;
          height: 30px;
          background: #BAD7DF;
          border: none;
        }
        `}</style>
    </>
  );
};

export default AddModal;
