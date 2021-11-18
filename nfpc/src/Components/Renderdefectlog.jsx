import React from "react";
import './Defectlog.modules.css';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
const PF = "http://localhost:1919/images/";


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  height:400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};

const Renderdefectlog = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <tr>
      <td className="tdf"> {props.dlitm.Sl_No}</td>
      <td className="tdf">{props.dlitm.Time_Stamp}</td>
      <td className="tdf">{props.dlitm.Bottle_Type}</td>
      <td className="tdf">{props.dlitm.Defect}</td>
      <td className="tdf">{props.dlitm.Defect_Type}</td>
      <td className="tdf"><div><button type="button" onClick={handleOpen}><img src={PF+props.dlitm.Image}  alt="" style={{}}/></button><StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
        <img src={PF+props.dlitm.Image}  alt="" style={{height:'100%' ,width:'100%'}} />
        </Box>
      </StyledModal>
    </div></td>
      <td className="tdf">{props.dlitm.Score1}</td>
      <td className="tdf"><input type="checkbox" id="topping" name="topping" value={props.dlitm.Mark_False_Positive} onChange={()=>{props.selectHandler(props.dlitm.Mark_False_Positive,props.dlitm.Sl_No)}} checked={props.checkValue==0?false:true} /></td>
    </tr>
  );
};

export default Renderdefectlog;
