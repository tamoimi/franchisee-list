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

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        가맹점 추가
      </Button>
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
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="span"
          >
            <form onSubmit={handleSubmit(submitHandler)}>
              <label>가맹점명</label>
              <input
                {...register("name", { required: "필수 입력값 입니다." })}
                placeholder="상호명을 입력해주세요."
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.name?.message}
              </Typography>
              {/* {errors.name && <p>{errors.name.message}</p>} */}
           
              <label>업종</label>
              <input
                {...register("category", { required: "필수 입력값 입니다." })}
                placeholder="업종을 입력해주세요."
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.category?.message}
              </Typography>
              {/* {errors.category && <p>{errors.category.message}</p>} */}
        
              <label>등록일자</label>
              <BasicDatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
         
              <label>사업규모</label>
              <select {...register("scale")}>
                <option value="small">영세</option>
                <option value="medium1">중소1</option>
                <option value="medium2">중소2</option>
                <option value="medium3">중소3</option>
                <option value="self">일반</option>
              </select> <br />
             
              <label>수수료율</label>
              <input className="fee"
                {...register("fee", {
                  required: "필수 입력값 입니다.",
                })}
                placeholder= "%"
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.fee?.message}
              </Typography>
              {/* {errors.fee && <p>{errors.fee.message}</p>} */}
            
              <button type="submit" className="submit">등록하기</button>
              <button onClick={handleClose} className="close">닫기</button>
            </form>
          </Typography>
        </Box>
      </Modal>
      <style>{`
        .css-1wnsr1i {
          width: 500px;
          height: 550px;
          border: none;
          border-radius: 20px;
        } 
        form {
          width: 350px;
          margin: 0 auto;
        }
        label {
          display: inline-block;
          width: 100px;
          font-family: "Pretendard-Regular";
        }
        input {
          width: 250px;
          height: 30px;
          margin: 20px 0 0 0;
          background: #EEF2E6;
          border: none;
          padding: 0 0 0 10px;
          font-family: "Pretendard-Regular";
        }
        p {
          color: #3D8361;
          margin: 0;
          font-size: 14px;
          text-align: right;
          margin-right: 35px; 
          font-family: "Pretendard-Regular";
        }
        .submit,
        .close {
          width: 100px;
          height: 40px;
          background: #EEF2E6;
          margin: 40px 0 0 0;
        }
        .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
          width: 185px;
        }
        .fee {
          text-align: right;
          padding-right: 10px;
        }
        select {
          width: 80px;
          height: 30px;
          margin: 20px 0;
        }
        `}</style>
    </>
  );
};

export default AddModal;
