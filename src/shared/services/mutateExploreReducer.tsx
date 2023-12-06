import { store } from "../exporter";
import { setReport } from "../redux/reducers/reportReducer";

const addFavouriteInRedux = (favObj:any)=>{
    const {user,report:{report}} = store.getState().root;
  const userDetail =  user?.user?.user;
    
    let cloneReport = [...report]
    let reportIndx = cloneReport.findIndex(i=>i?._id == favObj?._id);
     let singleReport =  cloneReport[reportIndx];
    let favReportIndx = singleReport?.favorites?.findIndex((i:any)=>i == userDetail?.id);
    if(favReportIndx < 0){
        let favArr = [...singleReport?.favorites]
        favArr = [...favArr,userDetail?.id]
        let obj = {
            ...singleReport,
            favorites:favArr
        }
        singleReport = obj
        
    }else{
        let favArr = [...singleReport?.favorites]
        
        favArr.splice(favReportIndx,1)
        let obj = {
            ...singleReport,
            favorites:favArr
        }
        singleReport = obj
       
    }
    cloneReport[reportIndx] = singleReport
     store.dispatch(setReport(cloneReport))
}
export  {
    addFavouriteInRedux
}